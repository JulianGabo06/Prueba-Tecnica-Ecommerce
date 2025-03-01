import { Router } from "express";
import middlewares from "../Middlewares";
import { check } from "express-validator";
import { ProductController } from "../controllers";

const router = Router();
const { validateFields, validateJWT, validateAdminSeller } = middlewares;
const { createProduct, getAllProducts, getProductById, deleteProduct } =
  ProductController;

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
