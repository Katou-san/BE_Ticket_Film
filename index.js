const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const routes = require("./src/Routers/index");
const { Query } = require("./src/Utils/Fun_SQL");
const errorHandling = require("./src/Middleware/error.middleware");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));
routes(app);

app.use("/", (req, res) => {
  console.log("BACKEND IS STARTING");
  res.status(200).json({ success: "Welcome to backend!" });
});
app.use(errorHandling);

app.listen(8080, async () => {
  try {
    console.log("Server is running in http://localhost:8080");
    const sql = "SELECT * FROM role";
    const server = await Query(sql);
    if (server != null) {
      console.log("Connect Database SUCCESSFUL");
    } else {
      console.log("Connect Database Fail");
    }
  } catch (err) {
    console.log(err.message);
  }
});
