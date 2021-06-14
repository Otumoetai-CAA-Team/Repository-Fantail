const express = require('express');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const mongoose = require('mongoose')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOveride = require('method-overide')

const upload = express();

upload.set('view engine', 'ejs');

upload.get('/', (req, res) => {
    res.render('index');
});

const port = 5000;

upload.listen(port, () => console.log('Server started on port ${port}'));




