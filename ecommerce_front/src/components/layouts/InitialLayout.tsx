"use client";
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { SnackbarProvider } from "notistack";

const InitialLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SnackbarProvider>
        <Navbar />
        {children}
      </SnackbarProvider>
    </>
  );
};

export default InitialLayout;
