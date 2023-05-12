const FirestoreConnection = require("./firebase.config");
const db = require("./firebase.db")

// Get List of Collections
exports.getListCollecton = async () => {
	const firestoreConnection = new FirestoreConnection();
	const collections = await firestoreConnection.listCollections(); 

	console.log("collections", collections);
};

// Get Data of "Collection" (Optional : condition)
exports.getCollectionData = async (collection,field,operator,value)=> {
	const firestoreConnection = new FirestoreConnection();
    const data = await firestoreConnection.getCollectionData(collection,field,operator,value);
    return data
}

// Create Collection Data
exports.createCollectionData = async (collection,data)=>{
	let url
	if(data.username){
		url = db.collection(collection).doc(data.username);
	} else {
		 url = db.collection(collection).doc();
	}
    await url.set(data);	
}