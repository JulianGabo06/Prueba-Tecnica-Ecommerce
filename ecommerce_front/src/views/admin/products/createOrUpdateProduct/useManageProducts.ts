import { useApi } from "@/hooks/useApi";
import useForm, { IInputs } from "@/hooks/useForm";
import {
  CategoryOptions,
  IGetCategoriesResponse,
} from "@/interfaces/category_response.interface";
import {
  ICrateProductResponse,
  IProductForm,
} from "@/interfaces/product_response.interface";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const initForm: IProductForm = {
  categories: [],
  description: "",
  image: undefined,
  name: "",
  price: 0,
  stock: 0,
};

const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const useManageProducts = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const { form, onChange, setForm, getBase64 } = useForm(initForm);
  const [categoryList, setCategoryList] = useState<CategoryOptions[]>([]);
  const { loadApi, loadingApi } = useApi();
  const router = useRouter();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | unknown>
      | IInputs
  ) => {
    const { type, name } = e.target as HTMLInputElement;
    const file = type === "file";
    onChange(e, name as keyof IProductForm, file);
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

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const file = files[0];
    const b64 = await handleFile(file);
    onChange(e, "image", true);
    setSelectedImage(b64?.url);
  };

  const handleDropChange = async (file: File) => {
    const b64 = await handleFile(file);
    setForm({ ...form, image: b64 });
    setSelectedImage(b64?.url);
  };

  //categories
  const handleGetCategories = async () => {
    try {
      const { data } = await loadApi<IGetCategoriesResponse>({
        endpoint: "categories",
        type: "GET",
      });
      setCategoryList(
        data.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  //Create product
  const createBodyRequest = () => {
    const { image, ...body } = form;
    if (!image) {
      enqueueSnackbar("No ha seleccionado una imagen", {
        autoHideDuration: 3000,
        variant: "warning",
      });
      return null;
    }

    return { ...body, images: [image.file] };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = createBodyRequest();
    if (!body) return;
    try {
      const { msg } = await loadApi<ICrateProductResponse>({
        endpoint: "products/create",
        type: "POST",
        body,
      });
      enqueueSnackbar(msg, { autoHideDuration: 3000, variant: "success" });
      router.push("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return {
    ...form,
    handleChange,
    handleDropChange,
    handleInputChange,
    selectedImage,
    categoryList,
    handleSubmit,
    loadingApi
  };
};

export default useManageProducts;
