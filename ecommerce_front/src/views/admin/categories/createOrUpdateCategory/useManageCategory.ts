import { useApi } from "@/hooks/useApi";
import { ICrateProductResponse } from "@/interfaces/product_response.interface";
import { enqueueSnackbar } from "notistack";
import { FormEvent, useState } from "react";

const useManageCategory = () => {
  const { loadApi, loadingApi } = useApi();
  const [category, setCategory] = useState<string>("");

  const handleChange = (value: string) => setCategory(value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category.trim()) return;
    try {
      const { msg } = await loadApi<ICrateProductResponse>({
        endpoint: "categories/create",
        type: "POST",
        body: { name: category },
      });
      enqueueSnackbar(msg, { autoHideDuration: 3000, variant: "success" });
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  };
  return {handleSubmit, handleChange, loadingApi, category};
};

export default useManageCategory;
