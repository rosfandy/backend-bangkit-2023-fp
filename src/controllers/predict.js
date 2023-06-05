const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

exports.getPredict = async (req, res) => {
  let image = req.body.path;
  let data = new FormData();
  data.append('image', fs.createReadStream(image));

  // try {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:5000/model/process',
    headers: { 
      ...data.getHeaders()
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.json({ success: true, data: response.data, status:200 })
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send({ success: false, error: "Internal Server Error", status:500 });
  });
};
