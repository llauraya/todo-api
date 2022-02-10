module.exports = (app) => {
  const { guard } = require("../guard");
  const { taskValidator } = require("../validators/task");
  const { runValidation } = require("../validators");
  const taskController = require("../controllers/task");
  let router = require("express").Router();

  // list
  router.get(
    "/tasks",
    guard,
    taskValidator,
    runValidation,
    taskController.list
  );

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
