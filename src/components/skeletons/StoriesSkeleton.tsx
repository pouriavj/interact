import Skeleton from "@mui/material/Skeleton";
import styles from "@/components/stories/Stories.module.css";

export default function StoriesSkeleton() {
  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={styles.story}>
          <Skeleton variant="circular" width={74} height={74} />
          <Skeleton width={50} />
        </div>
      ))}
    </div>
  );
}