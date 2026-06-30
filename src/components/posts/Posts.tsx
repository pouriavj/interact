import styles from "./Posts.module.css";

import { fetchPublicPosts } from "@/queries";

import PostsHydrator from "./PostsHydrator";

export default async function Posts() {
  const publicPosts = await fetchPublicPosts();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <PostsHydrator initialPosts={publicPosts} />
      </div>
    </div>
  );
}