const axios = require('axios');

exports.getPredict = async (req, res) => {
  let { image } = req.body;

  try {
    const response = await axios.post('http://127.0.0.1:5000/model/process', {
      image: image
    });

    console.log(JSON.stringify(response.data));
    res.send({ success: true, data: response.data, status:200 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: error.message });
  }
};
