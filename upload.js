const express = require('express');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const mongoose = require('mongoose')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOveride = require('method-override')
const bodyParser = require('body-parser')
const config = require('./config');
const upload = express();

// Middleware
upload.use(bodyParser.json());
upload.use(methodOveride('_method'));
upload.set('view engine', 'ejs');

// Mongo URI
const mongoURI= 'mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/amy';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

// Create storage engine
const storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

//const upload = multer({ storage });

// @route GET /
// @desc Loads form
upload.get('/', (req, res) => {
    res.render('index');
});

// @route POST /
upload.post('upload', upload.single('file'), (req, res) => {
    res.json({file: req.file});

});

const port = 5000;

upload.listen(port, () => console.log('Server started on port ${port}'));




