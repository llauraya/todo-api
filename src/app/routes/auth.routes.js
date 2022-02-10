module.exports = (app) => {
  const auth = require("../controllers/auth.js");
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
    auth.register
  );

  // login
  router.post("/login", loginValidator, runValidation, auth.login);

  app.use("/api", router);
};
