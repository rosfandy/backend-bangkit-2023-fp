const axios = require('axios');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'agrohealth',
  keyFilename: './agrohealth-8f1f41a8ea30.json',
});
const bucketName = 'agrohealt-buckets';

exports.getPredict = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('Tidak ada gambar yang diunggah.');
  }

  // Membuat nama file unik untuk gambar yang diunggah
  const fileName = `${Date.now()}_${req.file.originalname.replace(/\s/g, '_')}`;

  // Mengunggah gambar ke cloud storage
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

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;
    console.log(publicUrl);
    
    // Post publicUrl to /api/predict
    axios
      .post('http://127.0.0.1:5000/model/process', { url: publicUrl })
      .then((response) => {
        console.log(response.data);
        res.status(200).json({ status: 200, data: response.data });
      })
      .catch((error) => {
        console.error(error);
        
        // Delete the file from Cloud Storage on prediction failure
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
