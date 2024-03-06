const Router_Test = require("./Router_Test");

const routes = (app) => {
  app.use("/api/test", Router_Test);
};

module.exports = routes;
