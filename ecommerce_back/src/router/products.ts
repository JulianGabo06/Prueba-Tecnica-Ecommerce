import { Router } from "express";
import middlewares from "../Middlewares";
import { check } from "express-validator";
import { ProductController } from "../controllers";

const router = Router();
const { validateFields, validateJWT, validateAdminSeller } = middlewares;
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = ProductController;

//create product
router.post(
  "/create",
  [
    validateJWT,
    validateAdminSeller,
    check("name", "El nombre del producto es obligatorio").notEmpty(),
    check(
      "description",
      "La descripción del producto es obligatorio"
    ).notEmpty(),
    check("price", "El valor del producto es obligatorio").notEmpty(),
    check("stock", "El stock del producto es obligatorio").notEmpty(),
    check(
      "images",
      "la(s) imagen(es) del producto es/son obligatorio"
    ).notEmpty(),
    check(
      "categories",
      "la(s) categoria(s) del producto es/son obligatorio"
    ).notEmpty(),
    validateFields,
  ],
  createProduct
);

//get all products
router.get("/", [validateFields], getAllProducts);

//get product by id
router.get(
  "/:id",
  [check("id", "El id del producto es obligatorio").notEmpty(), validateFields],
  getProductById
);

// Actualizar producto
router.put(
  "/:id",
  [
    validateJWT,
    validateAdminSeller,
    check("id", "El ID del producto es obligatorio").isInt(),
    check("name", "El nombre del producto es obligatorio")
      .optional()
      .notEmpty(),
    check("description", "La descripción del producto es obligatoria")
      .optional()
      .notEmpty(),
    check("price", "El valor del producto debe ser numérico")
      .optional()
      .isFloat({ min: 0 }),
    check("stock", "El stock del producto debe ser un número entero")
      .optional()
      .isInt({ min: 0 }),
    check("images", "Las imágenes deben ser un array").optional().isArray(),
    check("categories", "Las categorías deben ser un array")
      .optional()
      .isArray(),
    validateFields,
  ],
  updateProduct
);

//delete product
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "El id del producto es obligatorio").notEmpty(),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
