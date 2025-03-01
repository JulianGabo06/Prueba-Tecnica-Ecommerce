"use client";

import LayoutFormCards from "@/components/layouts/LayoutFormCards";
import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import useManageCategory from "./useManageCategory";
import Input from "@/components/forms/Input";
import { useRouter } from "next/navigation";

interface Props {
  categorySlug: string;
}

const CreateOrUpdateCategory = ({ categorySlug }: Props) => {
  const isNewCategory = categorySlug === "create-category";
  const router = useRouter();
  const { handleChange, handleSubmit, category, loadingApi } =
    useManageCategory();
  const handleGoBack = () => router.back();
  return (
    <Stack component="form" role="form" gap={2} my={4} onSubmit={handleSubmit}>
      <LayoutFormCards title="Información basica">
        <Stack flex={2} gap={2}>
          <Input
            label="Nombre de la categoría"
            name="name"
            variant="outlined"
            required
            onChange={({ target }) => handleChange(target.value)}
            value={category}
            helperText="Aquí agregas el nombre de la categoría que quires crear, le podrás asociar esta categoria a productos..."
          />
        </Stack>
      </LayoutFormCards>
      {/* Buttons */}
      <Stack direction="row" gap={2} justifyContent="flex-end">
        <Button variant="text" onClick={handleGoBack}>
          Cancelar
        </Button>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={loadingApi.includes("POST__categories/create")}
        >
          Crear
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default CreateOrUpdateCategory;
