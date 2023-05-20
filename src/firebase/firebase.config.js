const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const filter = require("./firebase.query")

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

  async getCollectionData(collection, conditions) {
    let docsRef = await this.db.collection(collection);
    const mainDocs = [];

    if (conditions) {
      docsRef = filter(docsRef, conditions); 
    }

    const docs = await docsRef.get();
    docs.forEach(async (doc) => {
      mainDocs.push({ ...doc.data(), _id: doc.id });
    });

    return mainDocs;
  }

  async getUserByEmail(email, collection) {
    const conditions = { field: 'email', operator: '==', value: email };
    const users = await this.getCollectionData(collection, conditions);
    return users[0]; // Mengembalikan pengguna pertama yang sesuai dengan email
  }

}


module.exports = FirestoreConnection;