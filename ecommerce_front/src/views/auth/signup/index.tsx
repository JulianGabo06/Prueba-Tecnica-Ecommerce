"use client";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import Input from "@/components/forms/Input";
import colors from "@/resources/colors";
import Link from "next/link";
import Face5Icon from "@mui/icons-material/Face5";
import { LoadingButton } from "@mui/lab";
import useRegister from "./useRegister";

const passwordFormat = [
  "Minimo 8 caracteres",
  "Minimo 1 mayuscula",
  "Minimo 1 numero",
];

const SingUp = (): JSX.Element => {
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
          Registrate: ¡Unete a nosotros!
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
          Icon
          required
          onChange={handleChange}
          value={password}
        />
        <Stack
          bgcolor={colors.borderColor}
          p={2}
          borderRadius={2}
          gap={2}
          mt={-1}
        >
          <Typography color={colors.textLight}>
            Ten en cuenta estas recomendaciones para crear tu contraseña:
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
          Icon
          required
          onChange={handleChange}
          value={confirm_password}
        />
        <LoadingButton
          variant="contained"
          startIcon={<Face5Icon />}
          sx={{ mt: 3 }}
          loadingPosition="start"
          type="submit"
          loading={loadingApi.includes("POST__users/signup")}
        >
          Iniciar sesión
        </LoadingButton>
        <Stack gap={1} direction="row" mt={2} justifyContent="flex-end">
          <Typography variant="body1">¿Ya tienes cuenta?</Typography>
          <Typography
            component={Link}
            href="/"
            variant="body1"
            color={colors.primary}
            sx={{ textDecoration: "none" }}
          >
            Ingresa aquí
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SingUp;
