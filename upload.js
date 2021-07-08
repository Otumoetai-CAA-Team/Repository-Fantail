// all packages
// multer required to handle multipart encoded data
const multer = require('multer');
const express = require('express');
// bodyparser (deprecated) required to get content sent from HTML forms
const bodyParser = require('body-parser');
const path = require('path');
//crypto deprecated
const crypto = require('crypto');
const mongoose = require('mongoose');

// multer-gridfs-storage is the storage engine for multer to upload file directly to MongoDB,
const GridFsStorage = require('multer-gridfs-storage');
// gridfs-stream handles the chunking of the data
const Grid = require('gridfs-stream');
const methodOveride = require('method-override');
const upload = express();

//global useNewUrlParser, useUnifiedTopology
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true); 

// Middleware
upload.use(bodyParser.json());
upload.use(methodOveride('_method'));
upload.set('view engine', 'ejs');

// Mongo URI
const mongoURI = "mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/amy";
// create mongo conn
const conn = mongoose.createConnection(mongoURI);

// Init gfs var
let gfs;

conn.once('open', () => {    
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('pages')
    console.log('conn made')
});

// Create storage engine
var storage = new GridFsStorage({ 
    url: 'mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/amy',
    // okay that req is declared but not read?
    file: (req, file) => {
        // returns promise
        return new Promise((resolve, reject) => {
            console.log('making new promise')
            crypto.randomBytes(16, (err, buf) => {
                // if error throw error
                if (err) {
                    console.log('fals within create storage eng')
                    return reject(err);
                }
                // no error, create new file
                console.log('no error in making promise')
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                // resolve promise
                resolve(fileInfo);
            });
        });
    }
});

// var uploader to pass in storage engine, allows us to make post route
// want const multer.Instance not multer.Multer
// possibly this only works if bodyParser is used
const uploader = multer({ storage }).single('fieldname');

// @route GET /
// @desc Loads form
upload.use(express.json()); //Used to parse JSON bodies
upload.get('/', (req, res) => {
    // send the rendered view to the client
    res.render('index');
    console.log('gets to line 81')
});

// @route POST /uploader
// this uploads file to db
upload.post('/uploader', uploader('file'), (req, res) => {
    res.json({file: req.file});
    // this is not printing so fails before here
    console.log('is getting to this point in the upload bit')

});

// localhost:5000
const port = 5000;
upload.listen(port, () => {
    console.log('MongoDB URL in use: ' + process.env.mongoURI)
    mongoose.connect(process.env.mongoURI)
    mongoose.connection
     .once('open', () => console.log('connected to MongoDB!'))
     .on('error', err => console.error('connecting to MongoDB ' + err))
    console.log('Express server listening on port ' + port) 
   
   })




