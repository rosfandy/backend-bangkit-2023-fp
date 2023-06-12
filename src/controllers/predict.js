const axios = require('axios');
const { Storage } = require('@google-cloud/storage');
const firebase = require('../firebase/firebase.module')

const storage = new Storage({
  projectId: 'agrohealth',
  keyFilename: './agrohealth-8f1f41a8ea30.json',
});
const bucketName = 'agrohealt-buckets';

exports.getPredict = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('Tidak ada gambar yang diunggah.');
  }
  console.log(req.file)
  const fileName = `${Date.now()}_${req.file.originalname.replace(/\s/g, '_')}`;

  const file = storage.bucket(bucketName).file(fileName);
  const blobStream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    console.error('Error saat mengunggah gambar:', err);
    res.status(500).send('Terjadi kesalahan saat mengunggah gambar.');
  });

  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;
    const solutionArray = await firebase.getCollectionData("plantDisease");
    console.log(solutionArray)
    axios
      .post('http://127.0.0.1:5000/model/process', { url: publicUrl })
      .then((response) => {
        if (response.data.predicted_class) {
          solutionArray.forEach(el => {
            if (el.class === response.data.predicted_class) {
              solution = el.solusi;
              deskripsi = el.deskripsi;
            }
          });
        }
        const responseData = {
          ...response.data,
          diseaseSolution: solution,
          diseaseDescription: deskripsi 
        };

        res.status(200).json({ status: 200, data: responseData});
      })
      .catch((error) => {
        console.error(error); 
        
        file.delete().then(() => {
          console.log('File deleted successfully.');
        }).catch((deleteError) => {
          console.error('Error saat menghapus file:', deleteError);
        });
        
        res.status(500).json({ status: 500, message: "Image received and processed successfully, but cannot be predicted" });
      });
  });

  blobStream.end(req.file.buffer);
};
