// const mongoose = require("mongoose");
const mongoose = require("mongoose");
require('dotenv').config();

// const username = process.env.DBUSERNAME;
// const password = process.env.DBPASSWORD;
// const database = process.env.DBNAME;


// const Url = 'mongodb+srv://meenakshi:<password>@cluster0.lylm4fn.mongodb.net'
const Url = 'mongodb+srv://abhisheknarvariya786:pH8oTmiUbFwFaeDV@cluster0.astsszy.mongodb.net/?retryWrites=true&w=majority'

const db = mongoose.connect(`${Url}`)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

module.exports = { db };
