//Get required module for program to function
const express = require('express')
const fs = require('fs')

const app = express();

app.set('view engine', 'ejs')

//This section of code creates a root for the cookie.html file and write the file to the port 5000
app.get('/', function(req, res){
    
    fs.readFile('cookies.html', (err, data) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data, 'utf8')
        res.write('In our team we have: <br>');
        res.end();
    })
})

//Lets us know if the code is functioning
app.listen(5000, ()=>{
    console.log('Server is running')
})




