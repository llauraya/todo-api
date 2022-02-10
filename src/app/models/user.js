module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.TEXT,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return User;
};
