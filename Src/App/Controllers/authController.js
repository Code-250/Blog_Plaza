import User from "../../Database/models/UserModels.js";
import { secretKey } from "../../Database/Services/system/authConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Post from "../../Database/models/PostsModel.js";

const Op = User.Sequelize.Op;
export const signUp = async (request, response) => {
  // save User to database

  User.create({
    username: request.body.username,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 8),
  });
  await ((user) => {
    if (request.body.posts) {
      Post.findAll({
        where: {
          name: {
            [Op.or]: request.body.posts,
          },
        },
      });
      await((posts) => {
        user.setPosts(posts);
        await(() => {
          response.json({
            message: "User registered success",
          });
        });
      });
    }
  });
};
