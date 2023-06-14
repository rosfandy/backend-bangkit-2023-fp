const axios = require('axios');
const { Storage } = require('@google-cloud/storage');
const firebase = require('../firebase/firebase.module');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');

const storage = new Storage({
  projectId: 'agrohealth',
  keyFilename: './agrohealth-8f1f41a8ea30.json',
});
const bucketName = 'agrohealt-buckets';

exports.getPredict = async (req, res, next) => {
  const { email } = req.user;

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
    // console.log(solutionArray)
    axios
      .post('http://127.0.0.1:5000/model/process', { url: publicUrl })
      .then(async(response) => {
        if (response.data.predicted_class) {
          console.log('prediced_class: ', response.data.predicted_class)
          const pClass = response.data.predicted_class;
          
          if (pClass == 3 || pClass == 4 || pClass == 6 || pClass == 10 || pClass == 14 || pClass == 17 || pClass == 19 || pClass == 22 || pClass == 23 || pClass == 24 || pClass == 27 || pClass == 37) {
            return res.status(200).json({ status: 200, data: 'Tanaman Sehat'});
          }

          solutionArray.forEach(el => {
            if (el.class === response.data.predicted_class) {
              diseaseSolution = el.solusi;
              diseaseDescription = el.deskripsi;
              diseaseName = el.namaLatin
            }
          });
        }
        
        
        const responseData = {
          ...response.data,
          diseaseName,
          diseaseSolution,
          diseaseDescription,
          imageUrl: publicUrl,  
        };

        // add history
        const historyId = uuidv4();
        const date = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const historyData = { 
          historyId,
          email: email,
          diseaseName: diseaseName,
          diseaseSolution: diseaseSolution,
          diseaseDescription: diseaseDescription,
          imageUrl: publicUrl, 
          createdAt: date
        };

        await firebase.createCollectionData("history", historyData);

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
