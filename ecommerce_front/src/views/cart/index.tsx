"use client";
import React from "react";
import useCart from "@/views/cart/useCart";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useShoppeKart } from "@/stores/ShoppeKart/shoppekart.store";
import { useUserStore } from "@/stores/user/user.store";
import { useRouter } from "next/navigation";

const CartView = () => {
  const router = useRouter();
  const { user } = useUserStore((state) => state);
  const { cart, clearCart } = useShoppeKart((state) => state);
  const { CreateOrder } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>
      <Grid container spacing={2}>
        {cart.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <CardMedia
                component="img"
                image={item.images}
                alt={item.name}
                sx={{ width: 100, height: 150, objectFit: "contain", mr: 2 }}
              />
              <CardContent
                sx={{
                  flex: 1,
                  justifyContent: "space-between",
                  gap: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">
                  ${item.price} x {item.quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total: ${item.price * item.quantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" sx={{ mt: 3 }}>
        Total: ${total}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        mt={2}
        justifyContent={"space-between"}
      >
        <Button variant="contained" color="error" onClick={clearCart}>
          Vaciar carrito
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            user?.id && CreateOrder(user.id, cart, total),
              router.push(`/orders`);
            clearCart();
          }}
        >
          Pagar productos
        </Button>
      </Stack>
    </Container>
  );
};

export default CartView;
