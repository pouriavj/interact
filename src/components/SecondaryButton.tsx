"use client";

import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export default function SecondaryButton({
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      variant="outlined"
    >
      {children}
    </Button>
  );
}