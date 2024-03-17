const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");
const {
  CTL_Login_E,
  CTL_Signup_E,
  CTL_Auth_E,
} = require("../Controllers/Controllers_Employee");
const Router = express.Router();

Router.get("/login", CTL_Login_E);
Router.post("/signup", CTL_Signup_E);
Router.get("/auth", JWT_Verify_Token, CTL_Auth_E);
module.exports = Router;
