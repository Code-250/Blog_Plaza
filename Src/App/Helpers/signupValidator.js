import joi from "@hapi/joi";

export const signupValidator = joi.object({
  username: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(4).required(),
});
