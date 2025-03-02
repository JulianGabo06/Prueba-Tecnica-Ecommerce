import { useApi } from "@/hooks/useApi";
import useForm from "@/hooks/useForm";
import {
  IGetProductsResponse,
  IProduct,
  IProductForm,
} from "@/interfaces/product_response.interface";
import { BasicIResponse } from "@/interfaces/user_response.interface";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";

const initForm: IProductForm = {
  categories: [],
  description: "",
  image: undefined,
  name: "",
  price: 0,
  stock: 0,
};
const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const useProducts = () => {
  const { loadApi, loadingApi } = useApi();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsWithoutFilter, setProductsWithoutFilter] = useState<
    IProduct[]
  >([]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  let timeoutId: any;
  const { form, onChange, setForm, getBase64 } = useForm(initForm);

  const handleFilterByName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if (!value.trim()) {
        setProducts(productsWithoutFilter);
        return;
      }
      setProducts(
        productsWithoutFilter.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }, 300);
  };

  const handleFile = async (file: File | null) => {
    if (!file) return;

    if (!allowedFormats.includes(file.type)) {
      enqueueSnackbar(
        "Formato de imagen invalido!. Solamente .png, .jpg, o .jpeg Son tolerados.",
        { variant: "error", autoHideDuration: 3000 }
      );
      return;
    }

    return {
      file: (await getBase64(file)) as string,
      url: URL.createObjectURL(file),
      name: file.name,
    };
  };

  const handleDropChange = async (file: File) => {
    const b64 = await handleFile(file);
    setForm({ ...form, image: b64 });
    setSelectedImage(b64?.url);
  };

  const handleGetProducts = async () => {
    try {
      const { data } = await loadApi<IGetProductsResponse>({
        endpoint: "products",
        type: "GET",
      });
      setProducts(data.reverse());
      setProductsWithoutFilter(data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await loadApi<BasicIResponse>({
        endpoint: `products/${productId}`,
        type: "DELETE",
      });
      enqueueSnackbar("Producto eliminado correctamente", {
        autoHideDuration: 3000,
        variant: "success",
      });
      handleGetProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = async (
    productId: number,
    updatedData: Partial<IProduct>
  ) => {
    try {
      await loadApi<BasicIResponse>({
        endpoint: `products/${productId}`,
        type: "PUT",
        body: updatedData,
      });
      enqueueSnackbar("Producto actualizado correctamente", {
        autoHideDuration: 3000,
        variant: "success",
      });
      handleGetProducts();
    } catch (error) {
      console.error("Error al actualizar el producto", error);
      enqueueSnackbar("Error al actualizar el producto", {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return {
    loadingApi,
    products,
    handleDeleteProduct,
    handleFilterByName,
    handleEditProduct,
    onChange,
    handleDropChange,
  };
};

export default useProducts;
