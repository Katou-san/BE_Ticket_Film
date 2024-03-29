const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const Connection = mysql
  .createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DBNAME,
  })
  .promise();

module.exports = { Connection };
