module.exports = (app) => {
  const authController = require("../controllers/auth.js");
  // import validators
  const {
    registrationValidator,
    loginValidator,
  } = require("../validators/auth");
  const { runValidation } = require("../validators");

  let router = require("express").Router();

  // register
  router.post(
    "/registration",
    registrationValidator,
    runValidation,
    authController.register
  );

  // login
  router.post("/login", loginValidator, runValidation, authController.login);

  app.use("/api", router);
};
