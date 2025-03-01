import validateJWT from "./validate-jwt";
import validateFields from "./validate-fields";
import customValidators from "./custom-validators";

export default {
  ...validateJWT,
  ...validateFields,
  ...customValidators,
};