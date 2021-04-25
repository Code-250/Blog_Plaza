"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: [true, "please provide another title"],
        required: [true, "please provide a post sender's title"],
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, "please provide a post body"],
      },
      imageUrl: {
        type: DataTypes.STRING,
        required: [true, "Please provide a blog image!"],
      },
    },
    {
      sequelize,
    }
  );
  return Post;
};
