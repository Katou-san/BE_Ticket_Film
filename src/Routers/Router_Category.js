const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");
const {
  CTL_Get_Category,
  CTL_Add_Category,
  CTL_Edit_Category,
  CTL_Delete_Category,
} = require("../Controllers/Controllers_Category");
const Router = express.Router();

Router.get("/category", CTL_Get_Category);
Router.put("/edit_category", CTL_Edit_Category);
Router.post("/create_category", CTL_Add_Category);
Router.get("/delete_catetory", CTL_Delete_Category);
module.exports = Router;
