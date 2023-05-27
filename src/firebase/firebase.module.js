const FirestoreConnection = require("./firebase.config");
const db = require("./firebase.db")
const filter = require("./firebase.query")

// Get List of Collections
exports.getListCollecton = async () => {
	const firestoreConnection = new FirestoreConnection();
	const collections = await firestoreConnection.listCollections(); 
	console.log("collections", collections);
	return collections
};

// Get Data of "Collection" (Optional : condition)
exports.getCollectionData = async (collection,conditions)=> {
	let docsRef = await db.collection(collection);
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

// Create Collection Data
exports.createCollectionData = async (collection,data,id)=>{
	let url
	if(data.username){
		url = db.collection(collection).doc(data.username);
	} else if(id){
		 url = db.collection(collection).doc(id);
	} else {
		url = db.collection(collection).doc();
	}
    await url.set(data);	
}

exports.updateCollectionData = async (collection, docID, data)=>{
	 try {
      const docRef = db.collection(collection).doc(docID);
      await docRef.update(data);
      console.log(`Document with ID ${docID} in collection ${collection} successfully updated.`);
    } catch (error) {
      console.error(`Error updating document with ID ${docID} in collection ${collection}:`, error);
      throw error;
    }
}