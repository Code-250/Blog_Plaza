import Sequelize from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../../Database/Services/system/authConfig.js";
import User from "../../Database/models/UserModels.js";

export const createUser = async (request, response) => {
  const hashedPassword = bcrypt.hashSync(request.body.password, 8);
  const users = {
    id: request.body.id,
    username: request.body.username,
    email: request.body.email,
    password: hashedPassword,
  };
  try {
    let createValues = await User.create(users);
    if (createValues) {
      let token = jwt.sign({ id: users.id }, secretKey.secret, {
        expiresIn: 86400,
      });
      response.status(200).json({
        status: 201,
        message: "user created successfully",
        data: createValues,
        auth: true,
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({
      status: 500,
      message: "something went wrong",
    });
  }
};
export const getAllUser = async (request, response) => {
  const id = request.query.id;

  let token = request.headers["rich-access-token"];
  const condition = token;
  try {
    let getUsers = await User.findAll({ where: condition });
    if (getUsers) {
      response.json({
        status: 200,
        message: "retrieved all users",
        data: getUsers,
      });
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({
      status: 500,
      message: "something went wrong",
    });
  }
};
// get user
export const getUser = async (request, response) => {
  const token = request.headers["rich-access-token"];
  try {
    if (!token)
      return response
        .status(401)
        .send({ auth: false, message: "token is not provided" });
    jwt.verify(token, secretKey.secret, (decoded) => {
      response.status(200).send(decoded);
      User.findByPk(decoded.id, (err, user) => {
        if (err)
          return response.status(200).send("there are problems finding user");
        if (!user) return response.status(404).send("user not found");
        response.status(200).send(user);
      });
    });
  } catch (err) {
    console.log(err);
    response.status(500).send({
      auth: false,
      message: "failed to authenticate token",
    });
  }
};
// delete user

export const deleteUser = async (request, response) => {
  const id = request.params.id;
  try {
    let deleteData = await User.destroy({ where: { id: id } });
    if (deleteData) {
      response.status(200).json({
        status: 200,
        message: "User with id 1 deeted",
        data: deleteData,
      });
    } else {
      response.json({
        status: 403,
        message: "user not found",
      });
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({
      status: 500,
      message: "something went wrong",
    });
  }
};
