const firebase = require('../firebase/firebase.module')

exports.getHistory = async (req, res) => {
    try {
        const { email } = req.user;
        const history = await firebase.getCollectionData("history", { 
            field: "email", 
            operator: "==", 
            value: email 
        });

        if(history) {
            return res.status(200).json({ status: 200, message: "Success", data: history});
        }
        else {
            return res.status(404).json({ status: 404, message: "History not found." });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Terjadi kesalahan pada server" });
    }
};
