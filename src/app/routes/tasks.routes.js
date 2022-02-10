module.exports = (app) => {
  const { guard } = require("../guard");
  const { taskValidator } = require("../validators/task");
  const { runValidation } = require("../validators");
  const taskController = require("../controllers/task");
  let router = require("express").Router();

  // create
  router.post(
    "/tasks",
    guard,
    taskValidator,
    runValidation,
    taskController.create
  );

  app.use("/api", router);
};
