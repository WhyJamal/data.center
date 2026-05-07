"use client";

import React, { createContext, useContext } from "react";
import { useSnackbar, VariantType, SnackbarKey } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type ToastContextType = {
  showToast: (message: string, variant?: VariantType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showToast = (message: string, variant: VariantType = "default") => {
    enqueueSnackbar(message, {
      variant,
      action: (key: SnackbarKey) => (
        <IconButton
          size="small"
          color="inherit"
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      ),
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}