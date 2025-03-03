"use client";
import ProductTable from "@/components/forms/ProductTable";
import { Alert, Box, Grow, InputAdornment, Stack, styled } from "@mui/material";
import React from "react";
import useProducts from "./useProducts";
import colors from "@/resources/colors";
import Input from "@/components/forms/Input";
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
  const {
    products,
    handleDeleteProduct,
    handleFilterByName,
    handleEditProduct,
    handleDropChange,
  } = useProducts();

  return (
    <>
      <Stack component="section" gap={2}>
        <Grow in>
          <Alert severity="info">
            Recomendable crear una categoria antes de crear un producto. {""}
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
            handleEditProduct={handleEditProduct}
            handleDropChange={(file: File) => handleDropChange(file)}
          />
        </Box>
      </Stack>
    </>
  );
};

export default Products;
