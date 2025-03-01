import { Request, Response } from "express";
import OrderModel from "../Models/order.model";
import { UserModel } from "../Models";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products, totalAmount } = req.body;
    const order = await OrderModel.create({
      userId,
      products,
      totalAmount,
      status: "pendiente",
    });

    res
      .status(201)
      .json({ status: true, msg: "Pedido creado exitosamente", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, msg: "Error al crear el pedido" });
  }
};

const getOrders = async (_: Request, res: Response) => {
  try {
    const orders = await OrderModel.findAll({ include: UserModel });
    res.status(200).json({ status: true, orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, msg: "Error al obtener los pedidos" });
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.findAll({
      where: { userId },
      include: UserModel,
    });

    if (!orders.length) {
      return res.status(404).json({
        status: false,
        msg: "No se encontraron órdenes para este usuario",
      });
    }

    res.status(200).json({ status: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error al obtener las órdenes del usuario",
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["pendiente", "enviado", "entregado"];

    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ status: false, msg: "Estado de pedido inválido" });
    }

    const order = await OrderModel.findByPk(id);
    if (!order) {
      return res
        .status(404)
        .json({ status: false, msg: "Pedido no encontrado" });
    }

    await order.update({ status });
    res
      .status(200)
      .json({ status: true, msg: "Estado del pedido actualizado" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, msg: "Error al actualizar el estado del pedido" });
  }
};

export default { createOrder, getOrders, updateOrderStatus, getUserOrders };
