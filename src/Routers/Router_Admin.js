const express = require("express");
const { JWT_Verify_Token } = require("../Middleware/JWT_Actions");
const Admin_CTL_Film = require("../Controllers/Admin_CTL_Film");
const Admin_CTL_Room = require("../Controllers/Admin_CTL_Room");
const Admin_CTL_Category = require("../Controllers/Admin_CTL_Category");
const Admin_CTL_ShowTime = require("../Controllers/Admin_CTL_Showtime");
const Router = express.Router();
const upload = require("../Config/upload");

//film
// /api/v1/admin/films
Router.get("/films", Admin_CTL_Film.index);
Router.post("/films", upload.single("poster"), Admin_CTL_Film.create);
Router.put("/films/:id", upload.single("poster"), Admin_CTL_Film.update);
Router.delete("/films/:id", Admin_CTL_Film.delete);
Router.get("/films/:id", Admin_CTL_Film.find);

//Room
// /api/v1/admin/rooms
Router.get("/rooms", Admin_CTL_Room.index);
Router.post("/rooms", Admin_CTL_Room.create);
Router.put("/rooms/:id", Admin_CTL_Room.update);
Router.delete("/rooms/:id", Admin_CTL_Room.delete);
Router.get("/rooms/:id", Admin_CTL_Room.find);

//Category
Router.get("/categories", Admin_CTL_Category.index);

// /api/v1/admin/show-time/
Router.get("/show-time/films/:filmId", Admin_CTL_ShowTime.index);
Router.get("/show-time/rooms/:roomId", Admin_CTL_ShowTime.getForRoom);

module.exports = Router;
