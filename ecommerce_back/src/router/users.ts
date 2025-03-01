import { Router } from "express";
import { UserController } from "../controllers";
import { check } from "express-validator";
import { ValidatorsHelpers } from "../helpers";
import middlewars from "../Middlewares";

const router = Router();
const {
  signUp,
  signIn,
  recoverPassword,
  changePassword,
  assignRole,
  getUsers,
} = UserController;
// const { existUserByEmail } = ValidatorsHelpers;
const { validatePasswordFormat, validateFields, validateAdmin, validateJWT } =
  middlewars;
const { existUserByEmail } = ValidatorsHelpers;

// Get Users
router.get("/users", getUsers);

//SignUp
router.post(
  "/signup",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email", "El email debe ser un email valido").isEmail(),
    check("password", "La contraseña es obligatorio").notEmpty(),
    check("password").custom(validatePasswordFormat),
    validateFields,
  ],
  signUp
);

//SignIn
router.post(
  "/signin",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email debe ser un email valido").isEmail(),
    check("email").custom(existUserByEmail),
    check("password", "La contraseña es obligatorio").notEmpty(),
    validateFields,
  ],
  signIn
);

//Recover password
router.post(
  "/recover-password",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email debe ser un email valido").isEmail(),
    check("email").custom(existUserByEmail),
    validateFields,
  ],
  recoverPassword
);

//Update password
router.put(
  "/change-password",
  [
    check("password", "El email es obligatorio").notEmpty(),
    check("password").custom(validatePasswordFormat),
    check("token", "El token es necesario.").notEmpty(),
    validateFields,
  ],
  changePassword
);

router.put(
  "/assign-role",
  [
    validateJWT,
    validateAdmin,
    check("userId", "El ID de usuario es obligatorio").notEmpty(),
    check("role", "El rol es obligatorio").notEmpty(),
    validateFields,
  ],
  assignRole
);

module.exports = router;
