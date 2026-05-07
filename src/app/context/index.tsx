"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/lib/theme";

import { SnackbarProvider } from "notistack";
import { ToastProvider } from "@/app/context/ToastContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <ToastProvider>{children}</ToastProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}