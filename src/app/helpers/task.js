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
      order: await getLastOrder(this.user),
    });
  };

  findAll = async (query) => {
    // get query params
    const { perPage, page } = query || {};

    // number of records to be displayed
    const limit = perPage !== undefined ? parseInt(perPage) : 1000;

    // current page (to be used by frontend)
    const currentPage = page !== undefined ? parseInt(page) : 1;
    const offset = (currentPage - 1) * limit;

    return await Task.findAll({
      attributes: ["id", "name", "description", "order"],
      where: {
        deleted_at: null,
        created_by: this.user.id,
      },
      limit,
      offset,
      order: [["order", "ASC"]],
    });
  };

  count = async () => {
    return await Task.count({
      where: {
        deleted_at: null,
        created_by: this.user.id,
      },
    });
  };

  findOneById = async (id) => {
    return await Task.findOne({
      attributes: ["id", "name", "description", "order"],
      where: {
        id,
        deleted_at: null,
        created_by: this.user.id,
      },
    });
  };

  update = async (task, data) => {
    return await task.update(data);
  };
}

const getLastOrder = async (user) => {
  // query for user's last task and order number, then return incremented value
  // this is to make sure that the newest task will be put on the bottom of the list
  const data = await Task.findOne({
    attributes: ["order"],
    where: {
      deleted_at: null,
      created_by: user.id,
    },
    order: [["order", "DESC"]],
  });

  if (null === data) {
    return 1;
  }

  return data.order + 1;
};

module.exports = TaskHelper;
