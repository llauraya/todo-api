module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define(
    "tasks",
    {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Task;
};
