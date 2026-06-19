"use client";

import Image from "next/image";
import styles from "./Stories.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const stories = [
  { id: 1, name: "You", image: null },
  { id: 2, name: "aurora", image: "/story1.jpg" },
  { id: 3, name: "ericarl", image: "/story2.jpg" },
  { id: 4, name: "keanuagl", image: "/story3.jpg" },
  { id: 5, name: "awkarin", image: "/story4.jpg" },
];

export default function Stories() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {stories.map((story) => (
          <div key={story.id} className={styles.story}>
            <div className={styles.avatarWrapper}>
              {story.image ? (
                <Image
                  src={story.image}
                  alt={story.name}
                  width={78}
                  height={78}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.you}>
                  <AddCircleIcon className={styles.plus} />
                </div>
              )}
            </div>

            <span className={styles.name}>{story.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
