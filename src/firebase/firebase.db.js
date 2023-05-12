const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
let admin = require("firebase-admin");
let serviceAccount = require("./bangkit-2023-fp-firebase-adminsdk-1ager-e8f746ec37.json");

// Initialize Firebase
initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
module.exports = db;