const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");

const Router = express.Router();
const {
  CTL_Delete_Ticket,
  CTL_Get_Ticket,
  CTL_Create_Ticket,
  CTL_Get_Seats,
} = require("../Controllers/Controllers_Ticket");
Router.post("/create", JWT_Verify_Token, CTL_Create_Ticket);
Router.post("/get_seats", CTL_Get_Seats);
Router.post("/get", JWT_Verify_Token);
Router.get("/delete", JWT_Verify_Token);
module.exports = Router;
