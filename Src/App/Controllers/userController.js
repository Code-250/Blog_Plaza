import Sequelize from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../Database/models/UserModels.js";
import { response } from "express";
import { secret } from "../../Database/Services/secretKey.js";
import { signupValidator } from "../Helpers/signupValidator.js";

export const signUp = async (request, response, next) => {
  try {
    // const { username, email, password } = request.body;
    const result = await signupValidator.validateAsync(request.body);
    // console.log(result);

    let validateSignupEmail = await User.findOne({
      where: { email: result.email },
    });
    if (validateSignupEmail) {
      response.status(409).send({
        status: 409,
        message: `${result.email} already exist`,
      });
    } else {
      const hashedPassword = bcrypt.hashSync(request.body.password, 8);
      const users = {
        id: request.body.id,
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword,
      };

      let createValues = await User.create(users);
      if (createValues) {
        response.status(200).json({
          status: 201,
          message: "user created successfully",
          data: createValues,
        });
      }
    }
  } catch (err) {
    response.status(500).send({
      status: 500,
      message: "something went wrong",
    });
  }
};

export const Login = (request, response) => {
  User.findOne({ where: { username: request.body.username } })
    .then((user) => {
      if (user === null) {
        response.status(401).send({
          status: 401,
          message: "Email does not match!",
        });
      } else {
        bcrypt.compare(
          request.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  usename: user.username,
                  userId: user.id,
                },
                proccess.env.secret,
                (err, token) => {
                  response.status(200).send({
                    status: 200,
                    message: "user Authenticated",
                    token: token,
                  });
                }
              );
            } else {
              response.status(401).send({
                status: 401,
                message: "invalid credentials",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send({
        status: 500,
        message: "something went wrong",
      });
    });
};
// delete user

export const deleteUser = async (request, response) => {
  const id = request.params.id;
  try {
    let deleteData = await User.destroy({ where: { id: id } });
    if (deleteData) {
      response.status(200).json({
        status: 200,
        message: `User with id ${id} deleted successful`,
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
