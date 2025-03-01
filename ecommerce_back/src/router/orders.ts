import { Router } from "express";
import { check } from "express-validator";
import middlewares from "../Middlewares";
import { OrderController } from "../controllers";

const router = Router();
const { createOrder, getOrders, updateOrderStatus, getUserOrders } =
  OrderController;
const { validateJWT, validateAdminSeller } = middlewares;

// Crear un pedido (solo clientes pueden hacerlo)
router.post(
  "/orders",
  [
    validateJWT,
    check("userId", "El ID del usuario es obligatorio").notEmpty(),
    check("products", "Los productos son obligatorios").isArray({ min: 1 }),
    check("totalAmount", "El total debe ser un número").isFloat({ min: 0 }),
  ],
  createOrder
);

// Obtener todos los pedidos
router.get("/orders", [validateJWT, validateAdminSeller], getOrders);

//Obtener ordenes de un usuario
router.get("/orders/user/:userId", getUserOrders);

// Obtener pedidos activos
router.get("/orders/active", [validateJWT, validateAdminSeller], getOrders);

// Actualizar estado del pedido (solo administradores o vendedores)
router.put(
  "/orders/:id/status",
  [
    validateJWT,
    validateAdminSeller,
    check("status", "El estado es obligatorio y debe ser válido").isIn([
      "pendiente",
      "enviado",
      "entregado",
    ]),
  ],
  updateOrderStatus
);

module.exports = router;
