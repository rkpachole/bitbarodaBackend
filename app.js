//----------import dependencies-------------------------------
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//----------import files--------------------------------------

const version1Index = require("./src/api/v1/index");


//----------use dependencies----------------------------------
//use morgan
app.use(morgan('dev'));
// use cors
app.use(cors());
//image path
app.use('/static', express.static('static'))
//body parsingn
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Parse URL-encoded bodies (for forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (for API requests)
app.use(bodyParser.json());

//----------redirect routes-----------------------------------
app.use('/v1', version1Index);

//----------for invalid requests start -----------------------


app.all('*', async (req, res) => {
    console.log('invailid url')
});
module.exports = app;
