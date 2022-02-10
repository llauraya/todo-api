const TaskHelper = require("../helpers/task");
const Strings = require("../constants/strings");

exports.create = async (req, res) => {
  try {
    const user = res.locals.user;

    const taskObj = new TaskHelper(user);
    const task = await taskObj.create(req.body);

    return res.status(201).send({
      data: task,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: Strings.SERVER_ERROR,
    });
  }
};
