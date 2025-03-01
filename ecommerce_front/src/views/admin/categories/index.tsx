"use client";
import { InputAdornment, Stack } from "@mui/material";
import CategoryTable from "@/components/forms/CategoryTable";
import useCategories from "./useCategories";
import Input from "@/components/forms/Input";
import SearchIcon from "@mui/icons-material/Search";

const Categories = (): JSX.Element => {
  const { categories, handleDeleteCategory, handleFilterByName } =
    useCategories();
  return (
    <Stack component="section" gap={2} mt={2}>
      <Stack alignItems="flex-end">
        <Input
          placeholder="Buscar categoría..."
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
      <CategoryTable
        categories={categories}
        handleDeleteProduct={handleDeleteCategory}
      />
    </Stack>
  );
};

export default Categories;
