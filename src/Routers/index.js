const Router_Test = require("./Router_Test");
const Router_User = require("./Router_User");
const Router_Employee = require("./Router_Employee");
const routes = (app) => {
  app.use("/api/test", Router_Test);
  app.use("/api/user", Router_User);
  app.use("/api/employee", Router_Employee);
};

module.exports = routes;
