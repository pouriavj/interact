"use client";

import Skeleton from "@mui/material/Skeleton";
import styles from "./ProfileSkeleton.module.css";

export default function ProfileSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Skeleton
          variant="circular"
          width={80}
          height={80}
          animation="wave"
           sx={{
            bgcolor: "rgba(0, 0, 0, 0.04)",
            "&::after": {
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            },
          }}
        />

        <div className={styles.info}>
          <Skeleton
            variant="text"
            width={140}
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

          <Skeleton
            variant="text"
            width={220}
            height={24}
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
            variant="rounded"
            width={120}
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

      <div className={styles.posts}>
        <Skeleton
          variant="rounded"
          height={120}
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
          variant="rounded"
          height={120}
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
          variant="rounded"
          height={120}
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