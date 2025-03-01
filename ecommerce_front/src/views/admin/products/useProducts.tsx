import { useApi } from "@/hooks/useApi";
import {
  IGetProductsResponse,
  IProduct,
} from "@/interfaces/product_response.interface";
import { BasicIResponse } from "@/interfaces/user_response.interface";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";

const useProducts = () => {
  const { loadApi, loadingApi } = useApi();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsWithoutFilter, setProductsWithoutFilter] = useState<
    IProduct[]
  >([]);
  let timeoutId: any;

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

  useEffect(() => {
    handleGetProducts();
  }, []);

  return {
    loadingApi,
    products,
    handleDeleteProduct,
    handleFilterByName,
  };
};

export default useProducts;
