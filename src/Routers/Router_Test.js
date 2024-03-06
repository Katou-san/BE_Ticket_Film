const express = require("express");
const Router = express.Router();

Router.get("/Test_Router", (req, res) => {
  console.log(req.body);
  return res.status(200).json({ data: "test" });
});

module.exports = Router;
