import AdminHeader from "@/components/layouts/AdminHeader";
import { Container } from "@mui/material";
import { headers } from "next/headers";
import { ReactNode } from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {

  return (
    <Container component="main">
      <AdminHeader />
      {children}
    </Container>
  );
};

export default AdminLayout;
