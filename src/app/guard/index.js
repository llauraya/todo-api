const JWT = require("jsonwebtoken");

exports.guard = (req, res, next) => {
  const user = validateToken(req.headers.authorization);
  if (false === user) {
    return res.status(401).json({
      error: "Unauthorized.",
    });
  }
  res.locals.user = user;
  next();
};

const validateToken = (token) => {
  try {
    const decoded = JWT.verify(token, process.env.AUTH_KEY);
    return decoded;
  } catch (e) {
    console.log(e);
    return false;
  }
};
