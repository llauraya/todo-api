const TaskHelper = require("../helpers/task");
const Strings = require("../constants/strings");

const Sequelize = require("sequelize");

exports.list = async (req, res) => {
  try {
    const user = res.locals.user;

    // Call taskhelper for operations
    const taskObj = new TaskHelper(user);

    // get list according to search query
    const data = await taskObj.findAll(req.query);

    // count total data with filter (for pagination)
    const total = await taskObj.count();

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

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const user = res.locals.user;

    // Call taskhelper for operations
    const taskObj = new TaskHelper(user);

    // Check first if resource exists
    const task = await taskObj.findOneById(id);
    if (null === task) {
      return res.status(404).send({
        message: Strings.NOT_FOUND,
      });
    }

    // Proceed with deletion
    await taskObj.update(task, {
      updated_by: user.id,
      deleted_at: Sequelize.fn("NOW"),
    });

    return res.status(200).send({
      message: "Success",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: Strings.SERVER_ERROR,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const user = res.locals.user;

    // Call taskhelper for operations
    const taskObj = new TaskHelper(user);

    // Check first if resource exists
    const task = await taskObj.findOneById(id);
    if (null === task) {
      return res.status(404).send({
        message: Strings.NOT_FOUND,
      });
    }

    // Proceed with updating the object
    await taskObj.update(task, {
      name: req.body.name,
      description: req.body.description,
      updated_by: user.id,
      updated_at: Sequelize.fn("NOW"),
    });

    return res.status(200).send({
      message: "Success",
      data: task,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: Strings.SERVER_ERROR,
    });
  }
};
