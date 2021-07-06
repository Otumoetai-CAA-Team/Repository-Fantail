const express = require('express')
const fs = require('fs')

const app = express();

app.set('view engine', 'ejs')

app.get('/', function(req, res){
    
    fs.readFile('cookies.html', (err, data) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data, 'utf8')
        res.write('In our team we have: <br>');
        res.end();
    })
})


app.listen(5000, ()=>{
    console.log('Server is running')
})




