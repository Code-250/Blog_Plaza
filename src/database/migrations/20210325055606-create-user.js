'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        required: [true, 'please provide a user provider'],
        unique: false,
      },
      email: {
        type: Sequelize.STRING,
        required: [true, 'please provide an email'],
        unique: [true, 'email already in use'],
      },
      password: {
        type: Sequelize.STRING,
        required: [true, 'plaese provide password to authenticate'],
        unique: false,
      },
      role: {
        type: Sequelize.ENUM('Admin', 'user'),
        allowNull: true,
        defaultValue: 'user',
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
    await queryInterface.dropTable('Users');
  },
};