import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const LayoutFormCards = ({ title, children }: Props): JSX.Element => {
  return (
    <Stack
      component="section"
      direction={{ sm: "row" }}
      gap={2}
      p={{xs: 2, sm: 3}}
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      borderRadius={2}
    >
      <Typography variant="subtitle1" sx={{ flex: 1 }}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

export default LayoutFormCards;
