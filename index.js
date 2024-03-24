const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { Connection } = require("./src/Config");

const routes = require("./src/Routers/index");
const { Query } = require("./src/Utils/Fun_SQL");
const { post } = require("./src/Routers/Router_Test");
app.use(
  cors()
  //   {
  //   origin: ["https://be-ticket-film-cfzfld22z-katous-projects.vercel.app"],
  //   methods: ["POST", "GET", "PUT", "DELETE"],
  //   credentials: true,
  // }
);
app.use(express.json());
app.use(bodyParser.json());

routes(app);
app.use("/", (req, res) => {
  console.log("Welcome");
  res.render("<h1>hello worldgsdsdg</h1>");
});

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
