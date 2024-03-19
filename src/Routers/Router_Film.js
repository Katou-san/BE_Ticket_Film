const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");
const {
  CTL_Get_Film,
  CTL_Get_Film_Details,
  CTL_Add_Film,
  CTL_Edit_Film,
  CTL_Delete_Film,
} = require("../Controllers/Controllers_Film");
const Router = express.Router();

Router.get("/film", CTL_Get_Film);
Router.get("/film/:id", CTL_Get_Film_Details);
Router.post("/create_film", CTL_Add_Film);
Router.put("/edit_film", CTL_Edit_Film);
Router.get("/delete_film/:id", CTL_Delete_Film);
module.exports = Router;
