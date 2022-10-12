const express = require('express');
const { routes } = require('./routes/userRoutes');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT
const cors = require('cors')

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/api', routes)

app.listen(PORT)