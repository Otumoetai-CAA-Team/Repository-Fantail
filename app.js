const http = require('http');
const mysql = require('mysql');
const express = require('express');
var fs = require('fs');
var path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, '/')));

app.set('view engine', 'ejs')


app.get('/', function(req, res){
    res.render('home_page')

});


app.get('/education', function(req, res){

    fs.readFile('./HTML/education.html', (err, data_education) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data_education, 'utf8')
        res.end();
    
});
})

app.get('/writing', function(req, res){

    fs.readFile('./HTML/writing.html', (err, data_writing) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data_writing, 'utf8')
        res.end();
    
});
})



app.get('/meditation', function(req, res){
    fs.readFile('./HTML/meditation.html', (err, data_med) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data_med, 'utf8')
        res.end()
    })
})

app.get('/about', function(req, res){
    fs.readFile('./HTML/about.html', (err, data_about) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data_about, 'utf8')
        res.end()
    })
})

app.get('/contact', function(req, res){
    fs.readFile('./HTML/contact.html', (err, data_contact) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data_contact, 'utf8')
        res.end()
    })
})

app.listen(process.env.PORT || 5050, ()=>{
    console.log('Server running on port 5050')
})