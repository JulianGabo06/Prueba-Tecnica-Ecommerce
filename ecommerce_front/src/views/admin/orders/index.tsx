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
  Stack,
} from "@mui/material";
import useOrders from "@/views/admin/orders/useOrders";

const AdminOrdersTable = () => {
  const { GetOrderAll, updateStatus, AllOrders } = useOrders();

  useEffect(() => {
    GetOrderAll();
  }, []);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    updateStatus(orderId, newStatus);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom mb={2}>
        Todas las Órdenes
      </Typography>
      <TableContainer component={Paper}>
        {AllOrders.length === 0 ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }}>
            <Typography variant="body1" color="textSecondary">
              {AllOrders === undefined ? (
                <CircularProgress size={25} />
              ) : (
                "Aún no se han creado órdenes"
              )}
            </Typography>
          </Stack>
        ) : (
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
              {AllOrders.map((order) => (
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
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default AdminOrdersTable;
