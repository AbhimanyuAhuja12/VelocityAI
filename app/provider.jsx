"use client";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Provider = ({children}) => {
  return (
    <NextThemesProvider attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange>
      <div>{children}</div>
    </NextThemesProvider>
  );
};

export default Provider;
