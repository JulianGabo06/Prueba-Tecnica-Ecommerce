"use client";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import Input from "@/components/forms/Input";
import colors from "@/resources/colors";
import { LoadingButton } from "@mui/lab";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import useRecoverPassword from "./useRecoverPassword";

const RecoverPassword = (): JSX.Element => {
  const { email, handleChange, handleSubmit, loadingApi } =
    useRecoverPassword();
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
        <Typography variant="h3" fontWeight={600} mb={-1}>
          Recuperar contraseña
        </Typography>
        <Typography color={colors.textLight} lineHeight="normal" mb={1}>
          Ingresa tu correo electrónico para recibir instrucciones sobre cómo
          restaurar tu contraseña.
        </Typography>
        <Input
          label="Email"
          name="email"
          type="email"
          onChange={({ target }) => handleChange(target.value)}
          value={email}
        />
        <LoadingButton
          variant="contained"
          startIcon={<MailRoundedIcon />}
          sx={{ mt: 3 }}
          loadingPosition="start"
          type="submit"
          loading={loadingApi.includes("POST__users/recover-password")}
        >
          Recuperar Contraseña
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default RecoverPassword;
