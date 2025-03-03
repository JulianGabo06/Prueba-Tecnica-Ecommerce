"use client";
import { Container, Stack, Typography, Card, CardContent } from "@mui/material";
import React from "react";
import Input from "@/components/forms/Input";
import colors from "@/resources/colors";
import Link from "next/link";
import Face5Icon from "@mui/icons-material/Face5";
import { LoadingButton } from "@mui/lab";
import useRegister from "./useRegister";

const passwordFormat = [
  "Mínimo 8 caracteres",
  "Mínimo 1 mayúscula",
  "Mínimo 1 número",
];

const SignUp = (): JSX.Element => {
  const {
    handleChange,
    handleSubmit,
    email,
    password,
    name,
    confirm_password,
    loadingApi,
  } = useRegister();

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
          <Stack component="form" role="form" gap={2} onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              fontWeight={600}
              textAlign="center"
              gutterBottom
            >
              Regístrate
            </Typography>
            <Input
              label="Nombre"
              name="name"
              type="text"
              required
              onChange={handleChange}
              value={name}
            />
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
            <Stack bgcolor={colors.borderColor} p={2} borderRadius={2} gap={1}>
              <Typography color={colors.textLight} variant="body2">
                Importante: La contraseña debe cumplir con los siguientes
                requisitos:
              </Typography>
              <Stack component="ul" gap={1} px={2}>
                {passwordFormat.map((format, index) => (
                  <Typography component="li" key={index} variant="caption">
                    {format}
                  </Typography>
                ))}
              </Stack>
            </Stack>
            <Input
              label="Confirmar contraseña"
              name="confirm_password"
              type="password"
              required
              onChange={handleChange}
              value={confirm_password}
            />
            <LoadingButton
              variant="contained"
              sx={{ mt: 2 }}
              loadingPosition="start"
              type="submit"
              loading={loadingApi.includes("POST__users/signup")}
              fullWidth
            >
              Registrarse
            </LoadingButton>
            <Stack gap={1} direction="row" mt={2} justifyContent="center">
              <Typography variant="body2">¿Ya tienes cuenta?</Typography>
              <Typography
                component={Link}
                href="/"
                variant="body2"
                color={colors.primary}
                sx={{ textDecoration: "none" }}
              >
                Inicia sesión aquí
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUp;
