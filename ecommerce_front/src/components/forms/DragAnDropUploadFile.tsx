import { IProductForm } from "@/interfaces/product_response.interface";
import styled from "@emotion/styled";
import { Box, FormLabel, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { DetailedHTMLProps, DragEvent } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import colors from "@/resources/colors";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface Props
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  handleDropChange: (file: File) => Promise<void>;
  selectedImage: string | undefined;
}

const DragAnDropUploadFile = ({
  handleDropChange,
  selectedImage,
  ...props
}: Props) => {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    handleDropChange(file);
  };
  return (
    <Stack
      flex={2}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      height={170}
      bgcolor="#F2F4F7"
      borderRadius={2}
      alignItems="center"
      justifyContent="center"
      border={`1px dashed ${colors.textLight}`}
    >
      {selectedImage ? (
        <Image
          src={selectedImage}
          alt="product image"
          width={150}
          height={150}
          loading="lazy"
          style={{ objectFit: "contain" }}
        />
      ) : (
        <Stack direction="row" gap={2} m={2}>
          <Stack
            p={2}
            borderRadius={50}
            bgcolor="#E5E7EB"
            sx={{ color: colors.textLight }}
          >
            <FileUploadOutlinedIcon />
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="center"
            gap={1}
            textAlign="center"
          >
            <Typography color={colors.textLight}>
              <FormLabel
                sx={{
                  textDecoration: "underline",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                Click para agregar{" "}
                <VisuallyHiddenInput type="file" {...props} />
              </FormLabel>{" "}
              or arrastra la imagen aquí
            </Typography>
            <Typography color={colors.textDisabled}>
              (WEBP, JPEG, JPG or PNG)
            </Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default DragAnDropUploadFile;
