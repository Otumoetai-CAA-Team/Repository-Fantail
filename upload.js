const express = require('express');
const upload = express();
upload.set('view engine', 'ejs');

upload.get('/', (req, res) => {
    res.render('index');
});

const port = 5000;

// ${} not working maybe?
upload.listen(port, () => console.log('Server started on port ${port}'));




