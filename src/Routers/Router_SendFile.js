const express = require("express");
const Router = express.Router();
const { Send_Image_Film } = require("../Controllers/Send_File");

Router.get("/film-img/:id", Send_Image_Film);

module.exports = Router;
