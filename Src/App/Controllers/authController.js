import User from "../../Database/models/UserModels.js";
<<<<<<< HEAD
import { secretKey } from "../../Database/Services/system/authConfig.js";
=======
>>>>>>> c54a3f426cdc7091a4c846272236f792a9d12d75
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Post from "../../Database/models/PostsModel.js";

const Op = User.Sequelize.Op;
export const signUp = async (request, response) => {
  // save User to database

<<<<<<< HEAD
  User.create({
=======
  await User.create({
>>>>>>> c54a3f426cdc7091a4c846272236f792a9d12d75
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
