import joi from "joi";

export const createSchema = joi.object().keys({
  title: joi.string().required().min(3),
  body: joi.string().required().min(6),
  imageUrl: joi.string(),
});

export const updateSchema = joi.object().keys({
  title: joi.string().min(3),
  body: joi.string().min(6),
  imageUrl: joi.string(),
});
