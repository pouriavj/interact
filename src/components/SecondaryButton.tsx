"use client";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export default function SecondaryButton({
  children,
  type,
  color,
}: ButtonProps) {
  return (
    <Button variant="outlined" type={type} color={color}>
      {children}
    </Button>
  );
}
