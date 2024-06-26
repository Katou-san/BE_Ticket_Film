const Router_Test = require("./Router_Test");
const Router_User = require("./Router_User");
const Router_Employee = require("./Router_Employee");
const Router_Ticket = require("./Router_Ticket");
const Router_Film = require("./Router_Film");
const Router_Show_Time = require("./Router_Show_Time");
const Router_Admin = require("./Router_Admin");
const Router_Send = require("./Router_SendFile");
const routes = (app) => {
  app.use("/api/test", Router_Test);
  app.use("/api/user", Router_User);
  app.use("/api/employee", Router_Employee);
  app.use("/api/ticket", Router_Ticket);
  app.use("/api/film", Router_Film);
  app.use("/api/show-time", Router_Show_Time);
  app.use("/api/v1/admin", Router_Admin);
  app.use("/api/send", Router_Send);
};

module.exports = routes;
