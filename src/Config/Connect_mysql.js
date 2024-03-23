const mysql = require("mysql2");

const Connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  })
  .promise();

module.exports = { Connection };
