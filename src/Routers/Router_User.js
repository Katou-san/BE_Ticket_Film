const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");
const {
  CTL_Login,
  CTL_Signup,
  CTL_Auth,
} = require("../Controllers/Controllers_User");
const Router = express.Router();

Router.post("/login", CTL_Login);
Router.post("/signup", CTL_Signup);
Router.get("/auth", JWT_Verify_Token, CTL_Auth);
module.exports = Router;
