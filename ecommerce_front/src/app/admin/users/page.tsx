"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import useRoles from "@/views/admin/users/useRoles";
const UserManagement = () => {
  const { users, handleChangeRols, isLoading } = useRoles();

  return (
    <Stack gap={1}>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Nombre</strong>
                </TableCell>
                <TableCell>
                  <strong>Correo</strong>
                </TableCell>
                <TableCell>
                  <strong>Rol</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onChange={(e) =>
                        handleChangeRols(user.id, e.target.value)
                      }
                    >
                      <MenuItem value="admin">Administrador</MenuItem>
                      <MenuItem value="seller">Vendedor</MenuItem>
                      <MenuItem value="user">Cliente</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default UserManagement;
