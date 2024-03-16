const Router_Test = require("./Router_Test");
const Router_User = require("./Router_User");

const routes = (app) => {
  app.use("/api/test", Router_Test);
  app.use("/api/user", Router_User);
};

module.exports = routes;
