const http = require('http');
const mysql = require('mysql');
const express = require('express');
var fs = require('fs');
var path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, '/')));

app.set('view engine', 'ejs')

const connenction = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'thermochemistry2021',
    database: 'mydb',
    charset: 'utf8'
});

app.get('/', function(req, res){

 connenction.connect(function(err){
    if(err){
        console.log("Error connecting to the database")
    }

$query = 'SELECT * FROM mydb.book';
connenction.query($query, function(err, rows){

    if(err){
        console.log("Error in executing the query");
    }

    var table_dataNames = []
    for(var i =0; i < 3; i ++){
        table_dataNames.push(rows[i].author)
    }

    var table_dataJobs = []
    for(var i =0; i < 3; i ++){
        table_dataJobs.push(rows[i].title)
    } 
    var data = {name: table_dataNames, 
        title: table_dataJobs}
    
 
    res.render('home_page', {data,data})
    // fs.readFile('home_page.html', (err, data) =>{
    //     res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    //     res.write(data, 'utf8')
    //     res.write('In our team we have: <br>');
    //     for(var i =0; i < 3; i ++){
    //         res.write(rows[i].author + ', ')
    //         res.write('<body>who is: ' + rows[i].title + '<br> </body>')
        
    //     }
    //     res.end();
    // })
})
})
});




app.get('/page_2', function(req, res){

    fs.readFile('page_2.html', (err, data_2) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data_2, 'utf8')
        res.end();
    
});
})

app.listen(5050, ()=>{
    console.log('Server running on port 5050')
})