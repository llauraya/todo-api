module.exports = (app) => {
  let router = require("express").Router();

  // tasks list
  router.get("/tasks");

  app.use("/api", router);
};
