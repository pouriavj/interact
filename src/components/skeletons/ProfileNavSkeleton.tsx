"use client";

import Skeleton from "@mui/material/Skeleton";

export default function ProfileNavSkeleton() {
  return (
    <Skeleton
      variant="circular"
      width={32}
      height={32}
      animation="wave"
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.04)",
        "&::after": {
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        },
      }}
    />
  );
}