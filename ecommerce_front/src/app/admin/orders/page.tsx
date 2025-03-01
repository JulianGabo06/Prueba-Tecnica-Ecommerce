"use client";

import { useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import useOrders from "@/views/admin/orders/useOrders";

const AdminOrdersTable = () => {
  const { GetOrderAll, GetOrderById, userOrders, updateStatus, AllOrders } =
    useOrders();

  useEffect(() => {
    GetOrderAll();
  }, []);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    updateStatus(orderId, newStatus);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Todas las Órdenes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllOrders.length > 0 ? (
              AllOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.products
                      .map((p: any) => `${p.name} (${p.quantity})`)
                      .join(", ")}
                  </TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={
                        order.status === "pendiente"
                          ? "warning"
                          : order.status === "enviado"
                          ? "info"
                          : "success"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <MenuItem value="pendiente">Pendiente</MenuItem>
                      <MenuItem value="enviado">Enviado</MenuItem>
                      <MenuItem value="entregado">Entregado</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={25} />
                  <Typography variant="body2" mt={1}>
                    Cargando órdenes...
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminOrdersTable;
