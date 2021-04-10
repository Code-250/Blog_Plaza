import joi from 'joi';

export const signupSchema = joi.object().keys({
  username: joi.string().required().min(3),
  email: joi
    .string()
    .required()
    .min(5)
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'email'
    ),
  password: joi
    .string()
    .required()
    .min(6)
    .pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, 'password'),
});

export const updateUserValidate = joi.object().keys({
  username: joi.string().min(3),
  password: joi
    .string()
    .min(6)
    .pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, 'password'),
});

export const loginSchema = joi.object().keys({
  email: joi
    .string()
    .min(6)
    .required()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'email'
    ),
  password: joi
    .string()
    .min(6)
    .required()
    .pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, 'password'),
});