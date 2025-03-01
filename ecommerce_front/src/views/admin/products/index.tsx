"use client";
import ProductTable from "@/components/forms/ProductTable";
import {
  Alert,
  Box,
  Grow,
  InputAdornment,
  Stack,
  styled,
} from "@mui/material";
import React from "react";
import useProducts from "./useProducts";
import colors from "@/resources/colors";
import Input from "@/components/forms/Input";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
  bgcolor: colors.backgorund,
};


const Products = (): JSX.Element => {
  const { products, handleDeleteProduct, handleFilterByName } = useProducts();

  return (
    <>
      <Stack component="section" gap={2}>
        <Grow in>
          <Alert severity="info">
            Para crear un producto debe de haber como minimo 1 categoria, si no
            hay categorías creada, agrega{" "}
            <Link href="/admin/categories/create-category">aquí</Link>
          </Alert>
        </Grow>
        <Stack direction="row" gap={2} justifyContent="flex-end">
          <Input
            placeholder="Buscar..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            onChange={handleFilterByName}
          />
        </Stack>
        <Box sx={{ overflowX: "auto" }}>
          <ProductTable
            products={products}
            handleDeleteProduct={handleDeleteProduct}
          />
        </Box>
      </Stack>
    </>
  );
};

export default Products;
