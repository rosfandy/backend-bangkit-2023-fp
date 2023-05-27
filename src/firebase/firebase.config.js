const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");


class FirestoreConnection {
  constructor(uuid = "bangkit-2023") {
    let admin;
    const firebaseAppName = `firestore-${uuid}`;

    firebase.apps.forEach((firebaseApp) => {
      if (firebaseApp.name === firebaseAppName) {
        admin = firebaseApp;
      }
    });

    if (!admin) {
      try {
        admin = firebase.initializeApp({
          credential: firebase.credential.cert(serviceAccount),
        }, firebaseAppName);
      } catch (error) {
        console.error("Gagal menginisialisasi Firebase: ", error);
      }
    }

    this.db = admin ? admin.firestore() : null;
  }

  async init() {
    try {
      await this.db.listCollections();
      console.log("Terhubung ke Firebase Firestore");
    } catch (error) {
      console.error("Gagal terhubung ke Firebase Firestore:", error);
    }
  }
}


module.exports = FirestoreConnection;