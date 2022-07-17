
const express = require('express');
const app = express();
const path = require('path');
const port = 4000;
var bodyParser = require('body-parser');
const dotenv = require('dotenv');

const route = require('./src/routes');
const db = require("./src/config/db")
const cors = require('cors');
var morgan = require('morgan')
 

//Connect Db

db.connect();

dotenv.config();

// app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended : true}));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.use(cors());
route(app);

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(process.env.PORT || port, () => {
    console.log('Server is listening on port 4000');
});