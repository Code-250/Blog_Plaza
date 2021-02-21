'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.hasMany(models.Post, { foreignKey: 'userId', as: 'Post' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'please provide a user provider'],
        unique: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'please provide an email'],
        unique: [true, 'email already in use'],
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'plaese provide password to authenticate'],
        unique: false,
      },
      role: {
        type: DataTypes.ENUM('Admin', 'user'),
        allowNull: true,
        unique: false,
      },
    },
    {
      sequelize,
    }
  );
  return User;
};