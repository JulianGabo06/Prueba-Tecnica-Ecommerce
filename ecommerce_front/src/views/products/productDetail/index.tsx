"use client";

import { IProduct } from "@/interfaces/product_response.interface";
import colors from "@/resources/colors";
import { formatCurrency } from "@/resources/numberManager";
import {
  Button,
  Chip,
  Container,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import useCart from "./useCart";
import { useShoppeKart } from "@/stores/ShoppeKart/shoppekart.store";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user/user.store";

interface Props {
  product: IProduct;
}

const ProductDetail = ({ product }: Props) => {
  const { user } = useUserStore((state) => state);
  const router = useRouter();
  const { addToCart, cart } = useShoppeKart();
  const { name, images, description, price, stock, categories } = product;

  return (
    <Container
      component="main"
      sx={{
        my: 6,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        alignItems: "center",
      }}
    >
      <Stack
        component="picture"
        minHeight={{ xs: 350, sm: 380 }}
        width="100%"
        position="relative"
        flex={1.5}
      >
        <Image
          src={images[0]}
          alt={`${name} image`}
          style={{ objectFit: "contain", width: "100%" }}
          sizes="100%"
          fill
        />
      </Stack>
      <Stack component="section" flex={2} gap={2}>
        <Typography variant="h2">{name}</Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <Rating name="read-only" value={5} readOnly size="small" />
          <Typography variant="caption" color={colors.textDisabled}>
            300 reviews
          </Typography>
        </Stack>
        <Typography variant="h4" color="primary">
          {formatCurrency(price)}
        </Typography>
        <Divider />
        <Typography
          variant="body2"
          color={colors.textPlaceholder}
          lineHeight="normal"
        >
          {description}
        </Typography>
        <Divider />
        <Stack direction="row" gap={1}>
          {categories.map(({ name }, index) => (
            <Chip
              key={index}
              label={name}
              variant="outlined"
              color="primary"
              sx={{ color: "#4A4A4A" }}
            />
          ))}
        </Stack>
        {user?.role === "user" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addToCart({
                ...product,
                id: product.id.toString(),
                images: product.images.join(","),
                quantity: 1,
              });
              router.push(`/products`);
            }}
          >
            Agregar al carrito
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default ProductDetail;
