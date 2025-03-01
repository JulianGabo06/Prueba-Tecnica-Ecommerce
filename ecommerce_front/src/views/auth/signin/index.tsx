"use client";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import Input from "@/components/forms/Input";
import colors from "@/resources/colors";
import Link from "next/link";
import Face5Icon from "@mui/icons-material/Face5";
import { LoadingButton } from "@mui/lab";
import useLogin from "./useLogin";

const SignIn = (): JSX.Element => {
  const { handleChange, handleSubmit, email, password, loadingApi } = useLogin();
  return (
    <Container component="main">
      <Stack
        ml={{ xs: 0, md: 6 }}
        component="form"
        role="form"
        gap={2}
        maxWidth={400}
        justifyContent="center"
        height="calc(100dvh - 200px)"
        pb={4}
        onSubmit={handleSubmit}
      >
        <Typography variant="h3" fontWeight={600} mb={1}>
          Inicio de sesión: ¡Accede ahora!
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
          Icon
          required
          onChange={handleChange}
          value={password}
        />
        <Stack gap={1} justifyContent="space-between" direction="row">
          <Typography variant="body1">¿Olvidaste tu contraseña?</Typography>
          <Typography
            component={Link}
            href="/recover-password"
            variant="body1"
            color={colors.primary}
            sx={{ textDecoration: "none" }}
          >
            Recuperala aquí
          </Typography>
        </Stack>
        <LoadingButton
          variant="contained"
          startIcon={<Face5Icon />}
          sx={{ mt: 3 }}
          loadingPosition="start"
          type="submit"
          loading={loadingApi.includes("POST__users/signin")}
        >
          Iniciar sesión
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default SignIn;
