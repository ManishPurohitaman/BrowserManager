const express = require('express');
const app = express();
const browserRouter = require('./routes/index.js');

app.use(express.json()); 
app.use('/browser-manager', browserRouter); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
