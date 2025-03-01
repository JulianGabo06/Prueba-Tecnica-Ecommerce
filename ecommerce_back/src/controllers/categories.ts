import { Request, Response } from "express";
import { CategoryModel } from "../Models";
import db from "../db/connection";

const getAllCategories = async (__: Request, res: Response) => {
  try {
    const categories: any[] = await CategoryModel.findAll({
      where: { status: true },
    });
    res.status(200).json({ status: true, data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Categories - 001",
    });
  }
};

//get byId
const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category: any = await CategoryModel.findOne({
      where: { id, status: true },
    });

    if (!category)
      return res
        .status(404)
        .json({ status: false, msg: "Categoría no encontrada" });

    res.status(200).json({ status: true, data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Categories - 002",
    });
  }
};

//Create category
const createCategory = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  try {
    const { name } = req.body;
    const findCategory = await CategoryModel.findOne({ where: { name } });
    if (findCategory)
      return res.status(409).json({
        status: false,
        msg: "Ya existe una categoría con este nombre",
      });

    const newCategory = await CategoryModel.create(
      {
        name: name.trim(),
      },
      { transaction }
    );
    await transaction.commit();

    return res.status(201).json({
      status: true,
      data: newCategory,
      msg: "¡Categoría creada con éxito!",
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Categories - 003",
    });
  }
};

//update category
const updateCategory = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category: any = await CategoryModel.findOne({
      where: { id, status: true },
    });

    if (!category)
      return res
        .status(404)
        .json({ status: false, msg: "Categoría no encontrada" });

    const categoryByName = await CategoryModel.findOne({
      where: { name, status: true },
    });

    if (categoryByName)
      return res.status(400).json({
        status: false,
        msg: "Ya existe una categoría con este nombre",
      });

    category.name = name;
    await category.save({ transaction });
    await transaction.commit();

    res.status(200).json({ status: true, data: category });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Categories - 004",
    });
  }
};

//delete category
const deleteCategory = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  try {
    const { id } = req.params;
    const category: any = await CategoryModel.findOne({
      where: { id, status: true },
    });

    if (!category)
      return res
        .status(404)
        .json({ status: false, msg: "Categoría no encontrada" });

    category.status = false;
    await category.save({ transaction });
    await transaction.commit();

    res.status(200).json({ status: true, msg: "¡La categoría fue eliminada!" });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Categories - 004",
    });
  }
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
