"use client";
import DragAnDropUploadFile from "@/components/forms/DragAnDropUploadFile";
import Input from "@/components/forms/Input";
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import NumericFormatCustom from "@/components/forms/NumericFormat";
import SelectCustom from "@/components/forms/SelectCustom";
import { useRouter } from "next/navigation";
import useManageProducts from "./useManageProducts";

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
    <Stack
      component="form"
      role="form"
      spacing={3}
      my={4}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={3}>
        {/* Información Básica */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 400 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Información Básica
              </Typography>
              <Stack spacing={2}>
                <FormLabel>Nombre</FormLabel>

                <Input
                  label="Nombre del producto"
                  name="name"
                  variant="outlined"
                  required
                  onChange={handleChange}
                  value={name}
                  fullWidth
                />
                <FormControl>
                  <FormLabel>Descripción</FormLabel>
                  <Input
                    placeholder="Escribe una descripción..."
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    name="description"
                    onChange={handleChange}
                    value={description}
                  />
                </FormControl>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Imagen */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 400 }}>
            <CardContent
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Imagen
              </Typography>
              <DragAnDropUploadFile
                handleDropChange={handleDropChange}
                selectedImage={selectedImage}
                onChange={handleInputChange}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Precio y Cantidad */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 400 }}>
            <CardContent
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Precio y Cantidad
              </Typography>
              <Stack spacing={2}>
                <Input
                  label="Precio"
                  InputProps={{ inputComponent: NumericFormatCustom as any }}
                  name="price"
                  onChange={handleChange}
                  value={price}
                  required
                  variant="outlined"
                />
                <Input
                  label="Stock"
                  InputProps={{ inputComponent: NumericFormatCustom as any }}
                  inputProps={{ isCurrency: false, prefix: "" }}
                  name="stock"
                  onChange={handleChange}
                  value={stock}
                  required
                  variant="outlined"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Categorías */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 400 }}>
            <CardContent
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Categorías
              </Typography>
              <SelectCustom
                options={categoryList}
                label="Categorías"
                name="categories"
                variant="outlined"
                multiple
                onChange={handleChange}
                value={categories}
                renderValue={(selected: unknown) => {
                  return (selected as Array<number>)
                    .map(
                      (cat) =>
                        categoryList.find((item) => item?.value === cat)
                          ?.label ?? ""
                    )
                    .join(", ");
                }}
                required
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Botones */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={handleGoBack} color="secondary">
          Cancelar
        </Button>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={loadingApi.includes("POST__products/create")}
        >
          {isNewProduct ? "Crear" : "Actualizar"}
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default CreateOrUpdateProduct;
