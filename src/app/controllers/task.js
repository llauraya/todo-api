const TaskHelper = require("../helpers/task");
const Strings = require("../constants/strings");

exports.list = async (req, res) => {
  try {
    const user = res.locals.user;

    // Call taskhelper for operations
    const taskObj = new TaskHelper(user);

    // get list according to search query
    const data = await taskObj.findAll(req.query);

    // count total data with filter (for pagination)
    const total = await taskObj.count(req.query);

    return res.status(200).send({
      data,
      total,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: Strings.SERVER_ERROR,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const user = res.locals.user;

    // Call taskhelper for operations
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
