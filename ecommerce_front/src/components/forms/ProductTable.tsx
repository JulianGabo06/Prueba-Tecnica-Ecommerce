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
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import Image from "next/image";
import { formatCurrency } from "@/resources/numberManager";

const header = [
  "Id",
  "Nombre",
  "Stock",
  "Precio",
  "Fecha de creación",
  "Eliminar",
];

const TableCell = styled(TB)(() => ({
  textAlign: "start",
  borderColor: "#F2F4F7",
}));

const ProductTable = ({
  products,
  handleDeleteProduct,
}: {
  products: IProduct[];
  handleDeleteProduct: (productId: number) => void;
}) => {
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

  return (
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
                maxWidth: th === "Nombre" ? 350 : "100%"
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
        {products.map(
          ({ id, name, description, stock, price, createdAt, images }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell sx={{maxWidth: 350}} >
                <Stack direction="row" gap={1} alignItems="center">
                  <Image
                    src={images[0]}
                    alt={`${name} image`}
                    width={46}
                    height={46}
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                  <Stack gap={1}>
                    <Typography sx={{ textOverflow: "ellipsis" }}>
                      {name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={colors.textSubtitle}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: " -webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {description}
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
                    {stock}/{stock} unidades
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{formatCurrency(price)}</TableCell>
              <TableCell>
                {new Date(createdAt!).toLocaleDateString("es-Es", {
                  weekday: "long",
                  day: "2-digit",
                  month: "short",
                })}
              </TableCell>
              <TableCell sx={{ textAlign: "end" }}>
                <IconButton onClick={() => handleDelete(id)}>
                  <DeleteOutlineIcon fontSize="small" color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
