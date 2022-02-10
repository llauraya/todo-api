const { check } = require("express-validator");

exports.taskValidator = [
  check("name").not().isEmpty().withMessage("Name is required."),
  check("description").not().isEmpty().withMessage("Description is required."),
];

exports.reorderValidator = [
  check("taskId1").not().isEmpty().withMessage("First Task ID is required."),
  check("taskId2").not().isEmpty().withMessage("Second Task ID is required."),
];
