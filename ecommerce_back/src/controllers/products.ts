import { Request, Response } from "express";
import db from "../db/connection";
import { CategoryModel, ProductCategoryModel, ProductModel } from "../Models";
import { FilesController } from "../utils";

//cerate product
const createProduct = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  try {
    const { name, price, stock, images, categories, description } = req.body;

    const newProduct: any = await ProductModel.create(
      {
        name: name.trim(),
        description: description.trim(),
        price,
        stock,
      },
      { transaction }
    );

    let dbImages = [];
    let images_failed = 0;
    if (images) {
      if (images.length === 0)
        return res.status(400).json({
          status: false,
          msg: "Es necesario agregar como minimo 1 imagen",
        });
      let i = 0;
      const photos = await Promise.all(
        images.map(async (photo: string) => {
          i++;
          const photoSaved = await FilesController.saveImageFromBase64(
            photo,
            `${newProduct.id}${i}`,
            `product_images`
          );
          if (!photoSaved.status) {
            images_failed++;
          }
          return photoSaved.fileName;
        })
      );
      dbImages = photos;
    }

    newProduct.images = dbImages;

    if (categories.length > 0) {
      await Promise.all(
        categories.map(async (categoryId: number) => {
          const categoryExist = await CategoryModel.findOne({
            where: { id: categoryId, status: true },
          });

          if (!categoryExist)
            return res.status(404).json({
              status: false,
              msg: `Categoria con el id ${categoryId} no se encontró.`,
            });
        })
      );

      const productCategories = categories.map((categoryId: number) => ({
        category_id: categoryId,
        product_id: newProduct.id,
      }));

      await ProductCategoryModel.bulkCreate(productCategories, { transaction });
    }

    await newProduct.save({ transaction });
    await transaction.commit();

    const data = await ProductModel.findOne({
      where: { id: newProduct.id, status: true },
      include: [
        {
          model: CategoryModel,
          as: "categories",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(201).json({
      status: true,
      data,
      msg: "��Producto creado con éxito!",
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Categories - 001",
    });
  }
};

//get all products
const getAllProducts = async (__: Request, res: Response) => {
  try {
    const products: any[] = await ProductModel.findAll({
      where: { status: true },
      include: [
        {
          model: CategoryModel,
          as: "categories",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        if (product.images) {
          const image = await FilesController.getBase64FromImage(
            "product_images",
            product.images[0]
          );

          product.images = [image];
          return product;
        }
      })
    );

    res.status(200).json({ status: true, data: productsWithImages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Products - 002",
    });
  }
};

//delete product
const deleteProduct = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  try {
    const { id } = req.params;
    const product: any = await ProductModel.findOne({
      where: { status: true, id },
    });

    if (!product)
      return res
        .status(404)
        .json({ status: false, msg: "Producto no encontrado :(" });

    product.status = false;
    await product.save({ transaction });
    await transaction.commit();

    res
      .status(200)
      .json({ status: true, msg: "El producto se borró correctamente!" });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Products - 002",
    });
  }
};

//get product by id
const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product: any = await ProductModel.findOne({
      where: { status: true, id },
      include: [
        {
          model: CategoryModel,
          as: "categories",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!product)
      return res
        .status(404)
        .json({ status: false, msg: "Producto no encontrado :(" });

    if (product.images) {
      const image = await FilesController.getBase64FromImage(
        "product_images",
        product.images[0]
      );

      product.images = [image];
    }

    res.status(200).json({ status: true, product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Por favor, comuníquese con el administrador. Error: Products - 002",
    });
  }
};

export default { createProduct, getAllProducts, getProductById, deleteProduct };
