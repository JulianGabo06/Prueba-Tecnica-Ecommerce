import { IProduct } from "@/interfaces/product_response.interface";
import colors from "@/resources/colors";
import {
  styled,
  Table,
  TableBody,
  TableCell as TB,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Stack,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import Image from "next/image";
import { formatCurrency } from "@/resources/numberManager";
import { useState } from "react";
import DragAnDropUploadFile from "./DragAnDropUploadFile";
import SelectCustom from "./SelectCustom";

const header = [
  "Id",
  "Nombre",
  "Stock",
  "Precio",
  "Fecha de creación",
  "Accciones",
];

const TableCell = styled(TB)(() => ({
  textAlign: "start",
  borderColor: "#F2F4F7",
}));

const ProductTable = ({
  products,
  handleDeleteProduct,
  handleEditProduct,
  handleDropChange,
}: {
  products: IProduct[];
  handleDeleteProduct: (productId: number) => void;
  handleEditProduct: (productId: number, product: IProduct) => void;
  handleDropChange: (file: File) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const handleDelete = (productId: number) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el producto?",
      text: "Una vez eliminado, no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct(productId);
      }
    });
  };

  const handleOpenEditModal = (product: IProduct) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdate = () => {
    if (selectedProduct) {
      handleEditProduct(selectedProduct.id, selectedProduct);
      handleClose();
    }
  };

  return (
    <>
      <Table>
        <TableHead sx={{ bgcolor: colors.borderColor }}>
          <TableRow sx={{ backgroundColor: "#F8F9FA" }}>
            {header.map((th, index) => (
              <TableCell
                key={index}
                sx={{
                  textAlign: header.length - 1 === index ? "end" : "start",
                  p: 1.4,
                  border: "none",
                  maxWidth: th === "Nombre" ? 350 : "100%",
                }}
              >
                <Typography sx={{ textTransform: "uppercase" }} variant="body1">
                  {th}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell sx={{ maxWidth: 350 }}>
                <Stack direction="row" gap={1} alignItems="center">
                  <Image
                    src={product.images[0]}
                    alt={`${product.name} image`}
                    width={46}
                    height={46}
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                  <Stack gap={1}>
                    <Typography sx={{ textOverflow: "ellipsis" }}>
                      {product.name}
                    </Typography>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack gap={1}>
                  <LinearProgress
                    variant="determinate"
                    sx={{ height: 10, borderRadius: 50 }}
                    value={100}
                    color="success"
                  />
                  <Typography variant="caption">
                    {product.stock}/{product.stock} unidades
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>
                {new Date(product.createdAt!).toLocaleDateString("es-Es", {
                  weekday: "long",
                  day: "2-digit",
                  month: "short",
                })}
              </TableCell>
              <TableCell sx={{ textAlign: "end" }}>
                <IconButton onClick={() => handleOpenEditModal(product)}>
                  <EditIcon fontSize="small" color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.id)}>
                  <DeleteOutlineIcon fontSize="small" color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Stack spacing={2} mt={2}>
              <TextField
                label="Nombre"
                fullWidth
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
              />
              <DragAnDropUploadFile
                handleDropChange={handleDropChange}
                selectedImage={selectedProduct.images[0]}
              />
              <TextField
                label="Precio"
                type="number"
                fullWidth
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Stock"
                type="number"
                fullWidth
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stock: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Decription"
                type="string"
                fullWidth
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
              />
              <SelectCustom
                options={selectedProduct.categories.map((cat) => ({
                  label: cat.name,
                  value: cat.id,
                }))}
                label="Categorías"
                name="categories"
                variant="outlined"
                multiple
                value={selectedProduct.categories.map((cat) => cat.id)}
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductTable;
