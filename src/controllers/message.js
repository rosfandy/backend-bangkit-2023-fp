exports.helloworld = (req,res)=>{
    console.log('Client IP address:', req.connection.remoteAddress);
    res.send('hello world !')
}

/*
Example Module Function for Message Testing
exports.testing = (req,res)=>{
    res.send("testing")
}
*/