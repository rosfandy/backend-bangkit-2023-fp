const firestoreConnection = require("../firebase/firebase.config");
const firebase = require('../firebase/firebase.module')
const jwt = require('jsonwebtoken');


exports.register = async function(req, res) {
  try {
    const { username, email, password } = req.body;
    const connection = new firestoreConnection();
    const dataEmail = await connection.getCollectionData("users", { 
        field: "email", 
        operator: "==", 
        value: email 
    });
    const dataUname = await connection.getCollectionData("users", { 
        field: "username", 
        operator: "==", 
        value: username 
    });

    if (dataEmail.length || dataUname.length) {
        return res.status(400).json({ message: dataEmail.length ? "Email telah terdaftar !" : "Username telah terdaftar !", status: 400 });
    }

    const data = { email, username, password };
    await firebase.createCollectionData("users", data);

    return res.status(200).json({ message: `${username} ditambahkan !`, status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server", status: 500 });
  }
};

exports.login = async function(req, res) {
  try {
    const {email, password} = req.body;
    const connection = new firestoreConnection();
    const dataEmail = await connection.getCollectionData("users", { 
        field: "email", 
        operator: "==", 
        value: email 
    });
    const dataPassword = await connection.getCollectionData("users", { 
        field: "password", 
        operator: "==", 
        value: password 
    });
    const user = await connection.getUserByEmail(email, "users")
    console.log(user)
    if (dataEmail.length) {
      const token = createToken(email)
      console.log(token)
      return res.status(200).json({ message: `${user.username} berhasil login !`, token: token, status: 200 });
    }

    // const data = { email, password };
    // await firebase.createCollectionData("users", data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server", status: 500 });
  }
};

function createToken(userEmail) {
  const payload = { email: userEmail };
  const secretKey = 'your_secret_key';

  const token = jwt.sign(payload, secretKey);

  // const token = 'your_token';
  console.log(token);

  // const tokenJwt = jwt.verify(token, secretKey, (err, decoded) => {
  //   if (err) {
  //     // Token verification failed
  //     console.error('Invalid token');
  //   } else {
  //     // Token is valid
  //     console.log(decoded);
  //     // Access decoded properties like decoded.userId or decoded.username
  //   }
  // });

  // console.log(tokenJwt)  
  return token;

}