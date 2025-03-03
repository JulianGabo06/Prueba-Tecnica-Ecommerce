"use client";
import { Container, Stack, Typography, Card, CardContent } from "@mui/material";
import React from "react";
import Input from "@/components/forms/Input";
import colors from "@/resources/colors";
import Link from "next/link";
import Face5Icon from "@mui/icons-material/Face5";
import { LoadingButton } from "@mui/lab";
import useLogin from "./useLogin";
import { useUserStore } from "@/stores/user/user.store";

const SignIn = (): JSX.Element => {
  const { user } = useUserStore((state) => state);
  const { handleChange, handleSubmit, email, password, loadingApi } =
    useLogin();

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Card sx={{ width: 400, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack component="form" role="form" gap={3} onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              fontWeight={600}
              textAlign="center"
              gutterBottom
            >
              Inicio de sesión
            </Typography>
            <Input
              label="Email"
              name="email"
              type="email"
              required
              onChange={handleChange}
              value={email}
            />
            <Input
              label="Contraseña"
              name="password"
              type="password"
              required
              onChange={handleChange}
              value={password}
            />
            <Typography
              component={Link}
              href="/recover-password"
              variant="body2"
              color={colors.primary}
              sx={{ textDecoration: "none", textAlign: "right" }}
            >
              ¿Olvidaste tu contraseña?
            </Typography>
            <LoadingButton
              variant="contained"
              sx={{ mt: 2 }}
              loadingPosition="start"
              type="submit"
              loading={loadingApi.includes("POST__users/signin")}
              fullWidth
            >
              Iniciar sesión
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignIn;
