const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const userrouter = require('./router/userrouter')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://jayasudhat2022cse:69Lb2LWOBjUepozS@cluster05.olvpemp.mongodb.net/critterconnect').then(()=>{
    console.log("Connection established !!");
});

app.set('view engine','ejs');
app.use('/api',userrouter);
app.listen(8001,()=>{
    console.log("Listening on port 8001")
})

