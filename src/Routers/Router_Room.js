const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");
const {
  CTL_Get_Room,
  CTL_Add_Room,
  CTL_Edit_Room,
  CTL_Delete_Room,
} = require("../Controllers/Controllers_Room");
const Router = express.Router();

Router.get("/category", CTL_Get_Room);
Router.put("/edit-Room", CTL_Edit_Room);
Router.post("/create-Room", CTL_Add_Room);
Router.get("/delete-catetory/:id", CTL_Delete_Room);
module.exports = Router;
