import { DataTypes } from "sequelize";
import db from "../db/connection";
import Products from "./product.model";
import Categories from "./categories.model";

const ProductCategory = db.define(
  "product_category",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { updatedAt: false }
);

Products.belongsToMany(Categories, {
  through: ProductCategory,
  as: "categories",
  foreignKey: "product_id",
  otherKey: "category_id",
});

Categories.belongsToMany(Products, {
  through: ProductCategory,
  as: "products",
  foreignKey: "category_id",
  otherKey: "product_id",
});


export default ProductCategory;
