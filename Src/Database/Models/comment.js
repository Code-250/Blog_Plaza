'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // Comment.belongsTo(models.Post, { as: 'comment', onDelete: 'cascade' });
    }
  }
  Comment.init(
    {
      author: DataTypes.STRING,
      body: DataTypes.STRING,
    },
    {
      sequelize,
    }
  );
  return Comment;
};