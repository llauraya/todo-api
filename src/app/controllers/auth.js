const Db = require("../models");
const User = Db.users;

const Strings = require("../constants/strings");

const CryptLib = require("@skavinvarnan/cryptlib");
const JWT = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const username = req.body.username;
    if (await checkUsername(username)) {
      return res.status(400).send({
        message: `${username} is not available.`,
      });
    }

    // Create user
    const user = await handleUserRegistration(req.body);

    const newData = { ...user.dataValues };
    delete newData.password;

    return res.status(201).send({
      message: "Success",
      user: newData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: Strings.SERVER_ERROR,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if username exists
    const user = await checkUsername(username);

    if (null === user) {
      return res.status(404).send({
        message: "User not found.",
      });
    }

    // validate password
    if (false === validatePassword(password, user.password)) {
      return res.status(401).send({
        message: "Invalid credentials.",
      });
    }

    const token = generateToken(user);

    return res.status(200).send({
      message: "Success",
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: Strings.SERVER_ERROR,
    });
  }
};

const checkUsername = async (username) => {
  // check if username exists
  return await User.findOne({
    where: {
      username,
      deleted_at: null,
    },
  });
};

const handleUserRegistration = async (body) => {
  const { username, firstName, lastName, email, password } = body;

  return User.create({
    username,
    email,
    first_name: firstName,
    last_name: lastName,
    password: CryptLib.encryptPlainTextWithRandomIV(
      password,
      process.env.AUTH_KEY
    ),
  });
};

const validatePassword = (postPassword, savedPassword) => {
  return (
    postPassword ===
    CryptLib.decryptCipherTextWithRandomIV(savedPassword, process.env.AUTH_KEY)
  );
};

const generateToken = (user) => {
  return JWT.sign(
    {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    },
    process.env.AUTH_KEY,
    { expiresIn: "1h" }
  );
};
