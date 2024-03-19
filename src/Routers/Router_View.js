const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");
const {
  CTL_Get_View,
  CTL_Add_View,
  CTL_Edit_View,
  CTL_Delete_View,
} = require("../Controllers/Controllers_View");
const Router = express.Router();

Router.get("/view/:id", CTL_Get_View);
Router.put("/edit_View", CTL_Edit_View);
Router.post("/create_View", CTL_Add_View);
Router.get("/delete_view/:id", CTL_Delete_View);
module.exports = Router;
