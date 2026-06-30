import Skeleton from "@mui/material/Skeleton";

import styles from "@/components/posts/Posts.module.css";

export default function PostsSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.createPost}>
        <div className={styles.createHeader}>
          <Skeleton variant="circular" width={42} height={42} />

          <Skeleton
            variant="rectangular"
            width="100%"
            height={48}
            sx={{ borderRadius: 0 }}
          />
        </div>

        <div className={styles.createActions}>
          <div className={styles.leftActions}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="circular" width={20} height={20} />
          </div>

          <Skeleton
            variant="rectangular"
            width={82}
            height={36}
            sx={{ borderRadius: 0 }}
          />
        </div>
      </div>

      {/* Dummy Posts */}
      {[1, 2].map((post) => (
        <div key={post} className={styles.post}>
          <div className={styles.postHeader}>
            <Skeleton variant="circular" width={42} height={42} />

            <div className={styles.postInfo}>
              <Skeleton width={120} />
              <Skeleton width={70} />
            </div>
          </div>

          <Skeleton width="75%" height={18} />
          <Skeleton width="55%" height={18} />
          <Skeleton width="45%" height={18} />

          <Skeleton
            variant="rectangular"
            width="100%"
            height={280}
            sx={{
              marginTop: 12,
              borderRadius: 0,
            }}
          />

          <div className={styles.postActions}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.action}>
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton width={40} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}