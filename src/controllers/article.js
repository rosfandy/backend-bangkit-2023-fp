const XLSX = require('xlsx');
const firestoreConnection = require("../firebase/firebase.config");
const firebase = require('../firebase/firebase.module')

exports.getArticles = async(req,res)=>{
    const connection = new firestoreConnection();
    const articles_intro = await connection.getCollectionData("articles_intro");
    const articles_history = await connection.getCollectionData("articles_history");
    const articles_business = await connection.getCollectionData("articles_business");
    const articles_farming = await connection.getCollectionData("articles_farming");
    let total = articles_intro.length + articles_history.length + articles_farming.length + articles_business.length
    res.send({total, data:[{
        articles_intro:[{length:articles_intro.length,data:articles_intro}],
        articles_business:[{length:articles_business.length,data:articles_business}],
        articles_farming:[{length:articles_farming.length,data:articles_farming}],
        articles_history:[{length:articles_history.length,data:articles_history}],
    }]})
}

exports.saveArticles = async (req,res)=>{
    const nomor = req.params.id;
    const XLSX = require('xlsx');
    const workbook = XLSX.readFile('C:/myfiles/MSIB/Bangkit/FP/List of hidroponic articles and solut.xlsx');
    const sheetName = workbook.SheetNames[nomor];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: ['id','title', 'url'] });
    jsonData.shift(); // Menghapus elemen pertama dari array jsonData
    
    const connection = new firestoreConnection();
        
    for (const item of jsonData) {
        const itemId = `${sheetName}-${item.id}`; // Menggunakan item.id sebagai ID dokumen
        await firebase.createCollectionData(`${sheetName}`, item, itemId);
    }
    
    res.send(jsonData)
}
