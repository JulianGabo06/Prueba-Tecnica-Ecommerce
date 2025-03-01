import { DataTypes } from "sequelize";
import db from "../db/connection";
import { UserModel } from ".";

const OrderModel = db.define("orders", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pendiente", "enviado", "entregado"),
    allowNull: false,
    defaultValue: "pendiente",
  },
});

OrderModel.belongsTo(UserModel, { foreignKey: "userId" });

export default OrderModel;
