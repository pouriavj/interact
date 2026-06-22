// Stories.tsx (server component)
import styles from "./Stories.module.css";
import { fetchPublicStories } from "@/queries";
import StoriesHydrator from "./StoriesHydrator";

export default async function Stories() {
  const publicStories = await fetchPublicStories();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <StoriesHydrator initialStories={publicStories} />
      </div>
    </div>
  );
}