const firebase = require('../firebase/firebase.module');
const db = require('../firebase/firebase.db');
const { Storage } = require('@google-cloud/storage');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const filter = require("../firebase/firebase.query");

// harusnya beda bucket ga sih
const storage = new Storage({
    projectId: 'agrohealth',
    keyFilename: './agrohealth-8f1f41a8ea30.json',
  });
const bucketName = 'agrohealth-forum';

exports.createPost = async (req, res) => {
    try {
        const { email,description,image } = req.body;
        if (!req.file) {
            return res.status(400).send('Tidak ada gambar yang diunggah.');
        }
        // console.log(req.file)
        const fileName = `${Date.now()}_${req.file.originalname.replace(/\s/g, '_')}`;
        
        const file = storage.bucket(bucketName).file(fileName);
        const blobStream = file.createWriteStream({
            metadata: {
              contentType: req.file.mimetype,
            },
        });
        
        blobStream.on('error', (err) => {
            console.error('Error saat mengunggah gambar:', err);
            res.status(500).send('Terjadi kesalahan saat mengunggah gambar.');
        });

        blobStream.on('finish', async () => {
            // const forumId = uuidv4();
            const date = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

            const forumData = {
                // forumId,
                email,
                description,
                imageUrl: publicUrl,
                createdAt: date
            };

            await firebase.createCollectionData("forum", forumData);

            return res.status(200).json({ 
                status: 200,  
                message: 'success to post',
                forumData
            });
        });

        blobStream.end(req.file.buffer);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server", status: 500 });
    }
};

exports.getAllPost = async (req,res) => {
    try {
        const allPost = await firebase.getCollectionData('forum');
        console.log(allPost);
        return res.status(200).json({ 
            status: 200,  
            message: 'success',
            allPost
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server", status: 500 });
    }
};

exports.getPostById = async (req,res) => {
    try {
        const { id } = req.params;
        const postById = await firebase.getPost('forum', id)
        return res.status(200).json({ 
            status: 200,
            message: 'success',
            postById
         });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server", status: 500 });
    }
};

exports.updatePost = async (req,res) => {
    try {
        const { id:docID } = req.params;
        const { descript }  = req.body;
        const postById = await firebase.getPost('forum', docID);
        let { id,createdAt,imageUrl,description,email } = postById;
        description = descript;
        const date = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
        const newData = {
            // id,
            createdAt,
            modified: date,
            imageUrl,
            description,
            email
        }
        console.log(newData);


        const updatePost = await firebase.updateCollectionData('forum', id, newData);
        // console.log(updatePost)

        return res.status(200).json({ 
            status: 200,
            message: 'success update',
         });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server", status: 500 });
    }
};

exports.deletePost = async (req,res) => {
    try {
        const { id } = req.params;
        const filterDeletePost = await firebase.deletePost('forum', id);

        return res.status(200).json({ 
            status: 200,
            message: 'success delete',
         });
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server", status: 500 });
    }
};