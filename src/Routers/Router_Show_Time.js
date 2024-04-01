const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");
const {
  CTL_Get_ShowTime,
  CTL_Add_ShowTime,
  CTL_Edit_ShowTime,
  CTL_Delete_ShowTime,
  CTL_ShowTime_Check,
  CTL_Get_Room,
  CTL_Get_Time,
  CTL_Get_Price,
} = require("../Controllers/Controllers_Show_Time");
const Router = express.Router();

Router.get("/get", CTL_ShowTime_Check);
Router.post("/get-Room", CTL_Get_Room);
Router.post("/get-Time", CTL_Get_Time);
Router.post("/get-price", CTL_Get_Price);
Router.get("/get/:idUser", CTL_Get_ShowTime);
Router.put("/edit", CTL_Edit_ShowTime);
Router.post("/create", CTL_Add_ShowTime);
Router.get("/delete/:id", CTL_Delete_ShowTime);
module.exports = Router;
