"use client";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import Input from "@/components/forms/Input";
import colors from "@/resources/colors";
import { LoadingButton } from "@mui/lab";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import useRecoverPassword from "../recoverPassword/useRecoverPassword";
import useChangePassword from "./useChangePassword";

const ChangePassword = ({ token }: { token: string }): JSX.Element => {
  const { confirm_password, password, handleChange, handleSubmit, loadingApi } =
    useChangePassword(token);
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
          Cambiar contraseña
        </Typography>
        <Typography color={colors.textLight} lineHeight="normal" mb={1}>
          Ingresa una nueva contraseña para tu cuenta, no la pierdas de nuevo 👋
        </Typography>
        <Input
          label="Nueva contraseña"
          name="password"
          type="password"
          Icon
          required
          onChange={handleChange}
          value={password}
        />
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
          sx={{ mt: 3 }}
          loadingPosition="start"
          type="submit"
          loading={loadingApi.includes("PUT__users/change-password")}
        >
          Cambiar
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default ChangePassword;
