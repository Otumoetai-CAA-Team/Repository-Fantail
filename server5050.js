const http = require('http');
const mysql = require('mysql');
const express = require('express');
var fs = require('fs');
var path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, '/')));

const connenction = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tnetennba123',
    database: 'mydb',
    charset: 'utf8'
});

app.get('/', function(req, res){

    res.write('HI')

 connenction.connect(function(err){
    if(err){
        console.log("Error connecting to the database")
    }

$query = 'SELECT * FROM mydb.book';
connenction.query($query, function(err, rows){

    if(err){
        console.log("Error in executing the query");
    }
    fs.readFile('home_page.html', (err, data) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data, 'utf8')
        res.write('In our team we have: <br>');
        for(var i =0; i < 3; i ++){
            res.write(rows[i].author + ', ')
            res.write('who is:' + rows[i].title + '<br>')
        
        }
        res.end();
    })
})
})
});




app.get('/page_2', function(req, res){

    fs.readFile('page_2.html', (err, data_2) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data_2, 'utf8')

        res.write('<p> welcome to our second page </p>');
        res.end();
    
});
})

app.listen(5050, ()=>{
    console.log('Server running on port 5050')
})