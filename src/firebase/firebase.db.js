const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
let admin = require("firebase-admin");
let serviceAccount = require("./serviceAccount.json");

// Initialize Firebase
initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
module.exports = db;