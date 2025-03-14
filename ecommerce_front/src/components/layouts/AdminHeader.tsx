"use client";
import colors from "@/resources/colors";
import { Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const adminPaths = [
  { path: "admin", title: "Admin" },
  { path: "products", title: "Productos" },
  { path: "categories", title: "Categorias" },
  { path: "create-product", title: "Crear producto" },
  { path: "create-category", title: "Crear categoría" },
];

const AdminHeader = (): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const pathAvailables = pathname.split("/").filter((x) => x);
  const currentPath = adminPaths.find(
    (path) => path.path === pathname.split("/")[pathAvailables.length]
  );

  const handleGoToCreate = (path: string) =>
    router.push(`/admin/${currentPath?.path}/${path}`);

  return (
    <Stack
      component="header"
      py={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <Stack gap={1}>
        <Typography variant="h3">{currentPath?.title}</Typography>
        <Breadcrumbs separator="•">
          {pathAvailables.map((path, index) => {
            const route = adminPaths.find(
              (adminPath) => adminPath.path === path
            );
            return (
              <Typography
                key={index}
                color={
                  currentPath?.path === path ? colors.text : colors.textDisabled
                }
              >
                {route?.title}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </Stack>
      <Stack gap={2} flexDirection={"row"}>
        {currentPath &&
          !["create-category", "create-product"].includes(currentPath.path) && (
            <Button
              sx={{ px: 1, py: 1, minWidth: 0 }}
              variant="outlined"
              onClick={() => router.push("/admin/categories/create-category")}
            >
              <Typography>Crear categoría</Typography>
            </Button>
          )}
        {currentPath &&
          !["create-category", "create-product"].includes(currentPath.path) && (
            <Button
              sx={{ px: 1, py: 1, minWidth: 0 }}
              variant="outlined"
              onClick={() => handleGoToCreate("create-product")}
            >
              <Typography>Crear producto</Typography>
            </Button>
          )}
      </Stack>
    </Stack>
  );
};

export default AdminHeader;
