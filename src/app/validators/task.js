const { check } = require("express-validator");

exports.taskValidator = [
  check("name").not().isEmpty().withMessage("Name is required."),
  check("description").not().isEmpty().withMessage("Description is required."),
];
