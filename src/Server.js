const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { Connection } = require("./Config");

const routes = require("./Routers/index");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

routes(app);

app.listen(8080, async () => {
  try {
    console.log("Server is running in http://localhost:8080");
  } catch (err) {
    console.log(err.message);
  }
});
