"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/user/user.store";

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
  Button,
} from "@mui/material";
import useOrders from "@/views/admin/orders/useOrders";
import jsPDF from "jspdf";

const UserOrdersTable = () => {
  const { user } = useUserStore((state) => state);
  const { GetOrderById, userOrders } = useOrders();

  useEffect(() => {
    if (user?.id) {
      GetOrderById(user.id);
    }
  }, [user]);

  const generateInvoice = (order: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Volante de Pago", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Orden ID: ${order.id}`, 105, 30, { align: "center" });
    doc.text("Productos:", 105, 40, { align: "center" });

    let y = 50;
    order.products.forEach((p: any) => {
      doc.text(`${p.name} (${p.quantity}) - $${p.price * p.quantity}`, 105, y, {
        align: "center",
      });
      y += 10;
    });

    doc.text(`Total: $${order.totalAmount}`, 105, y + 10, { align: "center" });
    doc.save(`volante_pago_${order.id}.pdf`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Órdenes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Comprobante</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrders.length > 0 ? (
              userOrders.map((order) => (
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => generateInvoice(order)}
                    >
                      Generar Volante
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
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

export default UserOrdersTable;
