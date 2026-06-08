"use client";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export default function PrimaryButton({ children, type, color }: ButtonProps) {
  return (
    <Button variant="contained" type={type} color={color}>
      {children}
    </Button>
  );
}
