import Joi from "joi";

const createPost = Joi.object().keys({
  title: Joi.string()
    .required()
    .trim()
    .min(10)
    .max(50)
    .error(new Error("Please Add a title to your blog of atleast 10 words!")),
  description: Joi.string()
    .required()
    .min(25)
    .max(500)
    .error(
      new Error(
        "Please describe your blog in atleast 25 words but no longer tan 500 words!"
      )
    ),
  photo: Joi.string(),
});
const updatePost = Joi.object().keys({
  title: Joi.string()
    .trim()
    .min(10)
    .max(50)
    .error(new Error("Title must be atleast 10 words!")),
  description: Joi.string()
    .min(25)
    .max(500)
    .error(
      new Error(
        "Description must be atleast 25 words but no longer tan 500 words!"
      )
    ),
  photo: Joi.string(),
});
const signup = Joi.object().keys({
  email: Joi.string().required().email(),
  username: Joi.string()
    .required()
    .regex(/^[a-zA-Z]([a-zA-Z0]){3,20}$/)
    .error(
      new Error("username must be 4-20 characters and start with a letter")
    ),
  password: Joi.string().required(),
});
const login = Joi.object().keys({
  username: Joi.string().required().error(new Error("username is required")),
  password: Joi.string().required().error(new Error("password is required")),
});

export { createPost, updatePost, signup, login };
