import { DataTypes } from "sequelize";
import db from "../db/connection";
import Users from "./users.model";

const RecoverPasswordCodes = db.define(
  "recover_password_codes",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    updatedAt: false,
  }
);

RecoverPasswordCodes.belongsTo(Users, {
  foreignKey: "user_id",
  as: "password_code_user",
});

export default RecoverPasswordCodes;