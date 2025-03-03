import { IProduct } from "@/interfaces/product_response.interface";
import colors from "@/resources/colors";
import { formatCurrency } from "@/resources/numberManager";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const handleGoDetails = () => router.push(`/products/${product.id}`);

  return (
    <Stack
      component="article"
      p={2}
      gap={4}
      borderRadius={2}
      border={`1.5px solid ${isHovered ? colors.primary : colors.borderColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        transition: "all .2s ease-out",
        boxShadow: isHovered ? "0px 0px 12px 0px #20B52652" : "initial",
        cursor: "pointer",
      }}
      onClick={handleGoDetails}
    >
      <Stack justifyContent="center" alignItems="center" component="picture">
        <Image
          src={product.images[0]}
          alt={`${product.name} image`}
          loading="lazy"
          width={220}
          height={220}
          style={{ objectFit: "contain" }}
        />
      </Stack>
      <Stack
        component="footer"
        direction="row"
        gap={1}
        justifyContent="space-between"
      >
        <Stack gap={0.5}>
          <Typography variant="caption" color={colors.textLight}>
            {product.name}
          </Typography>
          <Typography variant="body1">
            {formatCurrency(product.price as number)}
          </Typography>
        </Stack>
        <Stack
          width={40}
          height={40}
          borderRadius={50}
          bgcolor={isHovered ? colors.primary : "#F2F2F2"}
          justifyContent="center"
          alignItems="center"
          sx={{
            color: isHovered ? colors.contrastText : colors.text,
            transition: "all .2s ease-out",
          }}
        >
          <AddIcon fontSize="small" color="inherit" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
