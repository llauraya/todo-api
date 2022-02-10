const { check } = require("express-validator");

exports.registrationValidator = [
  check("username").not().isEmpty().withMessage("Username is required."),
  check("firstName").not().isEmpty().withMessage("First name is required."),
  check("lastName").not().isEmpty().withMessage("Last name is required."),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters in length"),
];

exports.loginValidator = [
  check("username").not().isEmpty().withMessage("Username is required."),
  check("password").not().isEmpty().withMessage("Password is required."),
];
