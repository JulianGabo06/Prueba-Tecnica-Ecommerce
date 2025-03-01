import { useApi } from "@/hooks/useApi";
import {
  ICategory,
  IGetCategoriesResponse,
} from "@/interfaces/category_response.interface";
import { BasicIResponse } from "@/interfaces/user_response.interface";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";

const useCategories = () => {
  const { loadApi, loadingApi } = useApi();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesWithoutFilter, setCategoriesWithoutFilter] = useState<ICategory[]>([]);
  let timeoutId: any

  const handleFilterByName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if (!value.trim()) {
        setCategories(categoriesWithoutFilter);
        return;
      }
      setCategories(
        categoriesWithoutFilter.filter((category) =>
          category.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }, 300);
  };

  const handleGetCategories = async () => {
    try {
      const { data } = await loadApi<IGetCategoriesResponse>({
        endpoint: "categories",
        type: "GET",
      });
      setCategories(data.reverse());
      setCategoriesWithoutFilter(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await loadApi<BasicIResponse>({
        endpoint: `categories/${categoryId}`,
        type: "DELETE",
      });
      enqueueSnackbar("Producto eliminado correctamente", {
        autoHideDuration: 3000,
        variant: "success",
      });
      handleGetCategories();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return {
    loadingApi,
    handleDeleteCategory,
    categories,
    handleFilterByName
  };
};

export default useCategories;
