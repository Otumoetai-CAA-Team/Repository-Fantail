// import modules
const express = require('express');
const path = require('path');
const multer = require('multer');
//crypto is deprecated now, so should switch to built in package
const crypto = require('crypto');
const mongoose = require('mongoose')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOveride = require('method-override')
//const bodyParser = require('body-parser')
// was this before: const config = require('./config');
//const config = require('./config');
const upload = express();

// Middleware
// Now Node has a built in version of bodyparser
//upload.use(bodyParser.json());
upload.use(express.json()); //Used to parse JSON bodies
upload.use(methodOveride('_method'));
upload.set('view engine', 'ejs');

// Mongo URI
const mongoURI= ('mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/test');

// 'mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net'



// Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });

// Init gfs
let gfs;

conn.once('open', () => {    
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('conn successful')
})

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        // returns promise
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                // if error throw error
                if (err) {
                    return reject(err);
                }
                // no error, create new file
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                // resolve promise
                resolve(fileInfo);
                console.log('promise resolved')
            });
        });
    }
});

// var uploader to pass in storage engine, allows us to make post route
// want const multer.Instance not multer.Multer
const uploader = multer({ storage });

// @route GET /
// @desc Loads form
// i feel like it's failing here....
upload.get('/', (req, res) => {
    // send the rendered view to the client
    res.render('index');
});

// @route POST /uploader
// this uploads file to db
upload.post('/uploader', uploader('file'), (req, res) => {
    res.json({file: req.file});
    console.log('is getting to this point in the upload bit')

});

const port = 5000;

upload.listen(port, () => console.log('Server started on port ${port}'));




