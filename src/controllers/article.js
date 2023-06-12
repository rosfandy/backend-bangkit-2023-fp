const XLSX = require('xlsx');
const firebase = require('../firebase/firebase.module')

exports.getArticles = async(req,res)=>{
    try {
        const articles_intro = await firebase.getCollectionData("article_intro");
        const articles_history = await firebase.getCollectionData("article_history");
        const articles_business = await firebase.getCollectionData("article_business");
        const articles_farming = await firebase.getCollectionData("article_farming");
        let total = articles_intro.length + articles_history.length + articles_farming.length + articles_business.length
        res.send({total, data:[{
            articles_intro:[{length:articles_intro.length,data:articles_intro}],
            articles_business:[{length:articles_business.length,data:articles_business}],
            articles_farming:[{length:articles_farming.length,data:articles_farming}],
            articles_history:[{length:articles_history.length,data:articles_history}],
        }]})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",status:500})
    }
}

exports.saveArticles = async (req,res)=>{
    const nomor = req.params.id;
    const XLSX = require('xlsx');
    const workbook = XLSX.readFile('C:/myfiles/MSIB/Bangkit/FP/List of hidroponic articles and solut.xlsx');
    const sheetName = workbook.SheetNames[nomor];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: ['namaLatin', 'deskripsi', 'solusi', 'class'] });
    jsonData.shift(); // Menghapus elemen pertama dari array jsonData
    console.log(jsonData)
    for (const item of jsonData) {
        const itemId = `${sheetName}-${item.class}`; // Menggunakan item.id sebagai ID dokumen
        await firebase.createCollectionData(`${sheetName}`, item, itemId);
    }
    
    res.send(jsonData)
}
