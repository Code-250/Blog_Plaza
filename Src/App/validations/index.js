import * as postValidate from "./postValidations";
import * as userValidate from "./userValidation";

const validate = (schema, value) => {
  const { error } = schema.validate(value);
  if (error) return error;
  return false;
};

export { validate, postValidate, userValidate };