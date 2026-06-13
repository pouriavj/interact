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
        />

        <div className={styles.info}>
          <Skeleton
            variant="text"
            width={140}
            height={32}
            animation="wave"
          />

          <Skeleton
            variant="text"
            width={220}
            height={24}
            animation="wave"
          />

          <Skeleton
            variant="rounded"
            width={120}
            height={36}
            animation="wave"
          />
        </div>
      </div>

      <div className={styles.posts}>
        <Skeleton
          variant="rounded"
          height={120}
          animation="wave"
        />

        <Skeleton
          variant="rounded"
          height={120}
          animation="wave"
        />

        <Skeleton
          variant="rounded"
          height={120}
          animation="wave"
        />
      </div>
    </div>
  );
}