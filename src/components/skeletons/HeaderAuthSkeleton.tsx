"use client";

import Skeleton from "@mui/material/Skeleton";
import styles from "@/components/header/Header.module.css";

export default function HeaderAuthSkeleton() {
  return (
    <div className={styles.authSkeleton}>
      <div className={styles.actions}>
        <Skeleton
          variant="circular"
          width={36}
          height={36}
          animation="wave"
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.04)",
            "&::after": {
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            },
          }}
        />

        <Skeleton
          variant="circular"
          width={36}
          height={36}
          animation="wave"
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.04)",
            "&::after": {
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            },
          }}
        />
      </div>
    </div>
  );
}
