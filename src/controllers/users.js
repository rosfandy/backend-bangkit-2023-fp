const firestoreConnection = require("../firebase/firebase.config");
const firebase = require('../firebase/firebase.module')

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

