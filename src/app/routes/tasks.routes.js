module.exports = (app) => {
  const { guard } = require("../guard");
  const { taskValidator, reorderValidator } = require("../validators/task");
  const { runValidation } = require("../validators");
  const taskController = require("../controllers/task");
  let router = require("express").Router();

  // list
  router.get("/tasks", guard, taskController.list);

  // create
  router.post(
    "/tasks",
    guard,
    taskValidator,
    runValidation,
    taskController.create
  );

  // delete
  router.delete("/tasks/:id([0-9]+)", guard, taskController.delete);

  // update
  router.put(
    "/tasks/:id([0-9]+)",
    guard,
    taskValidator,
    runValidation,
    taskController.update
  );

  // reorder
  router.post(
    "/tasks/reorder",
    guard,
    reorderValidator,
    runValidation,
    taskController.reorder
  );

  app.use("/api", router);
};
