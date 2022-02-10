const Db = require("../models");
const Task = Db.tasks;

class TaskHelper {
  constructor(user) {
    this.user = user;
  }

  create = async (body) => {
    return await Task.create({
      name: body.name,
      description: body.description,
      created_by: this.user.id,
    });
  };
}

module.exports = TaskHelper;
