"use client";
import colors from "@/resources/colors";
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/shopZoneLogo.png";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user/user.store";
import { useShoppeKart } from "@/stores/ShoppeKart/shoppekart.store";

const links = [
  { path: "/", name: "Home" },
  { path: "/products", name: "Productos" },
];

const menuAdmin = [
  { path: "products", name: "Productos Admin" },
  { path: "categories", name: "Categorías" },
  { path: "users", name: "Usuarios" },
  { path: "orders", name: "Órdenes" },
];
const menuSeller = [
  { path: "products", name: "Productos Vendedor" },
  { path: "categories", name: "Categorías" },
  { path: "orders", name: "Órdenes" },
];

const Navbar = (): JSX.Element => {
  const { clearCart, cart } = useShoppeKart((state) => state);
  const { user, logOut } = useUserStore((state) => state);
  const [settings, setSettings] = useState<HTMLElement | null>(null);
  const [adminMenu, setAdminMenu] = useState<HTMLElement | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open: boolean) => () => {
    setOpenDrawer(open);
  };

  const handleOpenSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettings(event.currentTarget);
  };

  const handleLogOut = () => {
    clearCart();
    logOut();
    setSettings(null);
    router.replace("/");
  };

  return (
    <Stack component="header" mb={2}>
      <Stack
        component="section"
        borderBottom={`1px solid ${colors.borderColor}`}
      />
      <Container component="main">
        <Stack
          component="header"
          py={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>

          <Stack gap={1} flexDirection={"row"} alignItems={"center"}>
            {!user?.name ? (
              <Stack component="ul" direction="row" gap={1}>
                <Typography component={Link} href="/" color="primary">
                  Iniciar sesión
                </Typography>
                <Typography component="span" color="primary">
                  /
                </Typography>
                <Typography component={Link} href="/signup" color="primary">
                  Regístrate
                </Typography>
              </Stack>
            ) : (
              <>
                <Button
                  variant="text"
                  size="small"
                  sx={{ p: 0 }}
                  endIcon={<ExpandMoreRoundedIcon />}
                  onClick={handleOpenSettings}
                >
                  <Typography variant="body2">{user.name}</Typography>
                </Button>
                <Menu
                  open={!!settings}
                  onClose={() => setSettings(null)}
                  anchorEl={settings}
                >
                  <MenuItem onClick={handleLogOut}>
                    <ListItemText sx={{ color: "red" }}>
                      Cerrar sesión
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        </Stack>
      </Container>

      {/* Sidebar Menu */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250, p: 2 }}>
          {links.map(({ path, name }, index) => (
            <ListItem
              key={index}
              component={Link}
              href={path}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <ListItemText primary={name} />
            </ListItem>
          ))}
          {user?.role === "admin" &&
            menuAdmin.map(({ name, path }, index) => (
              <ListItem
                key={index}
                onClick={() => router.push(`/admin/${path}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <ListItemText primary={name} />
              </ListItem>
            ))}
          {user?.role === "seller" &&
            menuSeller.map(({ name, path }, index) => (
              <ListItem
                key={index}
                onClick={() => router.push(`/admin/${path}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <ListItemText primary={name} />
              </ListItem>
            ))}
          {user?.role === "user" && cart.length > 0 && (
            <ListItem
              onClick={() => router.push("/Cart")}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <ListItemText primary="Carrito" />
            </ListItem>
          )}
          {user?.role === "user" && (
            <ListItem
              onClick={() => router.push("/orders")}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <ListItemText primary="Órdenes" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Stack>
  );
};

export default Navbar;
