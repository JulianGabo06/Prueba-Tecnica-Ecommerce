"use client";
import { IProduct } from "@/interfaces/product_response.interface";
import { Box, Container, Stack } from "@mui/material";
import ProductCard from "@/components/cards/ProductCard";

interface Props {
  products: IProduct[];
}

const Products = ({ products }: Props) => {
  return (
    <Container component="main" sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fill, minmax(250px, 1fr))" },
          gap: 2
        }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Box>
    </Container>
  );
};

export default Products;
