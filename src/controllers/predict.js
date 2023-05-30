const axios = require('axios');

exports.getPredict = async (req, res) => {
  let { image } = req.body;

  try {
    const response = await axios.post('http://127.0.0.1:5000/model/process', {
      image: image
    });

    let predicted_class = response.data.predicted_class
    let virus = "undefined"

    if(predicted_class == 5) virus = "Tomato Mosaic Virus"
    if(predicted_class == 8) virus = "Tomato Yellow Leaf Curl Virus"


    res.send({ success: true, data: response.data, status:200 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Internal Server Error", status:500 });
  }
};
