const express = require('express');
const { routes } = require('./routes/routes');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT
const cors = require('cors')
const mongoose  = require('mongoose')

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const URI = process.env.MONGODB_URI
mongoose.connect(URI, (err)=> {
    {!err ? console.log("Connected Successfully") : console.log(err);}
})
mongoose.Promise = global.Promise;

app.get('/', (req,res) =>{
    res.json("Kelvin is a good boy")
})
app.use('/api', routes)

app.listen(PORT)