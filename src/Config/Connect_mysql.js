const mysql = require("mysql2");
require("dotenv").config();

const Connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    dateStrings: ["TIMESTAMP", "DATE"],
  })
  .promise();

module.exports = { Connection };
