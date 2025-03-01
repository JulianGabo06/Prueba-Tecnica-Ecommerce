"use client";
import DragAnDropUploadFile from "@/components/forms/DragAnDropUploadFile";
import Input from "@/components/forms/Input";
import LayoutFormCards from "@/components/layouts/LayoutFormCards";
import colors from "@/resources/colors";
import { Button, FormControl, FormLabel, Stack } from "@mui/material";
import useManageProducts from "./useManageProducts";
import { LoadingButton } from "@mui/lab";
import NumericFormatCustom from "@/components/forms/NumericFormat";
import SelectCustom from "@/components/forms/SelectCustom";
import { useRouter } from "next/navigation";

interface Props {
  productSlug: string;
}

const CreateOrUpdateProduct = ({ productSlug }: Props): JSX.Element => {
  const isNewProduct = productSlug === "create-product";
  const router = useRouter();
  const handleGoBack = () => router.back();
  const {
    handleChange,
    handleDropChange,
    handleInputChange,
    selectedImage,
    description,
    name,
    price,
    stock,
    categories,
    categoryList,
    handleSubmit,
    loadingApi,
  } = useManageProducts();

  return (
    <Stack component="form" role="form" gap={2} my={4} onSubmit={handleSubmit}>
      <LayoutFormCards title="Información basica">
        <Stack flex={2} gap={2}>
          <Input
            label="Nombre del producto"
            name="name"
            variant="outlined"
            required
            onChange={handleChange}
            value={name}
          />
          <FormControl>
            <FormLabel
              htmlFor="description"
              sx={{ color: colors.textPlaceholder, mb: 1 }}
            >
              Descripción
            </FormLabel>
            <Input
              placeholder="Escribne una descripción para tu producto..."
              variant="outlined"
              multiline
              rows={6}
              required
              name="description"
              id="description"
              onChange={handleChange}
              value={description}
            />
          </FormControl>
        </Stack>
      </LayoutFormCards>
      <LayoutFormCards title="Imagen">
        <DragAnDropUploadFile
          handleDropChange={handleDropChange}
          selectedImage={selectedImage}
          onChange={handleInputChange}
        />
      </LayoutFormCards>
      <LayoutFormCards title="Precio y cantidad">
        <Stack flex={2} gap={2}>
          <Input
            label="Precio"
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
            name="price"
            onChange={handleChange}
            value={price}
            required
            variant="outlined"
          />
          <Input
            label="Stock"
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
            inputProps={{ isCurrency: false, prefix: "" }}
            name="stock"
            onChange={handleChange}
            value={stock}
            required
            variant="outlined"
          />
        </Stack>
      </LayoutFormCards>
      <LayoutFormCards title="Categorias">
        <Stack flex={2}>
          <SelectCustom
            options={categoryList}
            label="Categorias"
            name="categories"
            variant="outlined"
            multiple
            onChange={handleChange}
            value={categories}
            renderValue={(selected: unknown) => {
              return (selected as Array<number>)
                .map((cat) => {
                  const categoryData = categoryList.find(
                    (item) => item?.value === cat
                  );
                  return categoryData?.label ?? "";
                })
                .join(", ");
            }}
            required
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
          loading={loadingApi.includes("POST__products/create")}
        >
          Crear
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default CreateOrUpdateProduct;
