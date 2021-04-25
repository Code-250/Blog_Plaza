"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: [true, "please provide another title"],
        required: [true, "please provide a post sender's title"],
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING,
        required: [true, "please provide a post body"],
      },
      imageUrl: {
        type: Sequelize.STRING,
        required: [true, "Please provide a blog image!"],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts");
  },
};
