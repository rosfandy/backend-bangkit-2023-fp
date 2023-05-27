const firebase = require('../firebase/firebase.module')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone')

require('dotenv').config(); 

exports.register = async function(req, res) {
  try {
    const { username, email, password } = req.body;

    let isEmail = validateEmail(email)
    if(!isEmail) return res.status(400).json({message: "Email tidak valid !",status:400})

    const existingEmail = await firebase.getCollectionData("users", { 
        field: "email", 
        operator: "==", 
        value: email 
    });
    const existingUsername = await firebase.getCollectionData("users", { 
        field: "username", 
        operator: "==", 
        value: username     
    });

    if (existingEmail.length || existingUsername.length) return res.status(400).json({ message: existingEmail.length ? "Email telah terdaftar !" : "Username telah terdaftar !", status: 400 });
    if (password.length < 5) return res.status(400).json({message: "Password minimal 5 karakter !",status:400})

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userId = uuidv4();
    const date = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

    const userData = { 
        userId, 
        email, 
        username, 
        password: hashedPassword,
        createdAt: date,
        updatedAt: date
    };

    await firebase.createCollectionData("users", userData);

    return res.status(200).json({ message: `${username} ditambahkan !`, status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server", status: 500 });
  }
};

exports.login = async function(req, res) {
  try {
    const { email, password } = req.body;
    const user = await firebase.getCollectionData("users", { 
        field: "email", 
        operator: "==", 
        value: email 
    });

    if (user.length !== 0) {
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (passwordMatch) {
        const token = createToken(email);
        const date = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        // Update token in the user's Firebase document
        const userDocId = user[0].username; 
        console.log(userDocId)
        const updatedData = { token: token, updatedAt: date };
        await firebase.updateCollectionData("users", userDocId, updatedData);

        console.log(token);
        return res.status(200).json({ message: `${user[0].username} berhasil login !`, token: token, status: 200 });
      } else {
        return res.status(401).json({ message: "Password salah!", status: 401 });
      }
    } else {
      return res.status(404).json({ message: "Email tidak ditemukan!", status: 404 });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server", status: 500 });
  }
};

exports.getProfile = async function(req, res) {
  try {
    const { email } = req.user; // Assuming the email is stored in req.user from the JWT middleware
    const user = await firebase.getCollectionData("users", { 
            field: "email", 
            operator: "==", 
            value: email 
    });
    if (user) {
      const profile = {
        username: user.username,
        email: user.email,
        userId: user.userId
      };
      return res.status(200).json({status:200, message: "Data found",data:profile});
    } else {
      return res.status(404).json({ message: "User not found.", status: 404 });
    }

  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return res.status(500).json({ message: "Error retrieving user profile.", status: 500 });
  }
};


function createToken(userEmail) {
  const payload = { email: userEmail };
  const token = jwt.sign(payload, process.env.JWT_SECRET,{
    expiresIn: '120s'
  });
  return token;
}

function validateEmail(email) {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the pattern
  return emailPattern.test(email);
}
