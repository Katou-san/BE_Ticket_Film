const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");
const {
  CTL_Get_Film,
  CTL_Get_Film_Details,
  CTL_Add_Film,
  CTL_Edit_Film,
  CTL_Delete_Film,
  CTL_GetRC_Film,
} = require("../Controllers/Controllers_Film");
const Router = express.Router();

Router.get("/get", CTL_Get_Film);
Router.get("/get-recommend", CTL_GetRC_Film);
Router.get("/get/:id", CTL_Get_Film_Details);
Router.post("/create", JWT_Verify_Token, CTL_Add_Film);
Router.put("/edit", JWT_Verify_Token, CTL_Edit_Film);
Router.post("/delete/:id", JWT_Verify_Token, CTL_Delete_Film);
module.exports = Router;
