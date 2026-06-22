"use client";

import Image from "next/image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./Stories.module.css";

type Story = {
  id: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export default function StoriesClient({ stories }: { stories: Story[] }) {
  return (
    <>
      {stories.map((story) => (
        <div key={story.id} className={styles.story}>
          <div className={styles.avatarWrapper}>
            {story.user.image ? (
              <Image
                src={story.user.image}
                alt={story.user.name ?? ""}
                width={74}
                height={74}
                className={styles.avatar}
              />
            ) : (
              <div className={styles.you}>
                <AddCircleIcon className={styles.plus} />
              </div>
            )}
          </div>

          <span className={styles.name}>{story.user.name}</span>
        </div>
      ))}
    </>
  );
}