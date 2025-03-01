import { Router } from "express";
import middlewares from "../Middlewares";
import { categoryController } from "../controllers";
import { check } from "express-validator";

const { validateJWT, validateFields, validateAdminSeller } = middlewares;
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = categoryController;
const router = Router();
// get all categories
router.get("/", [validateFields], getAllCategories);
// get category by id
router.get(
  "/:id",
  [check("id", "El id es obligatorio").notEmpty(), validateFields],
  getCategoryById
);

//Create category
router.post(
  "/create",
  [
    validateJWT,
    validateAdminSeller,
    check("name", "El nombre es obligatorio").notEmpty(),
    validateFields,
  ],
  createCategory
);

//Create category
router.put(
  "/:id",
  [
    validateJWT,
    validateAdminSeller,
    check("name", "El nombre es obligatorio").notEmpty(),
    check("id", "El id es obligatorio").notEmpty(),
    validateFields,
  ],
  updateCategory
);

//delete category
router.delete(
  "/:id",
  [
    validateJWT,
    validateAdminSeller,
    check("id", "El id es obligatorio").notEmpty(),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
