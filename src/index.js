const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { Connection } = require("./Config");

const routes = require("./Routers/index");
const { Query } = require("./Utils/Fun_SQL");
app.use(cors({}));
app.use(express.json());
app.use(bodyParser.json());

routes(app);

app.listen(8080, async () => {
  try {
    console.log("Server is running in http://localhost:8080");
    const sql = "SELECT * FROM role";
    const server = await Query(sql);
    if (server) {
      console.log("Connect Database SUCCESSFUL");
    }
  } catch (err) {
    console.log(err.message);
  }
});
