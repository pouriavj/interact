"use client";

import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import StoryProgress from "./StoryProgress";
import styles from "./StoryViewer.module.css";
import type { Story } from "./StoriesHydrator";

type Props = {
  story: Story;
  onClose: () => void;
};

export default function StoryViewer({ story, onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <StoryProgress duration={30000} onFinish={onClose} />

      <div className={styles.header}>
        <Avatar src={story.user.image ?? "/default-avatar2.png"} />

        <span>{story.user.name}</span>
      </div>

      {story.mediaType === "IMAGE" && (
        <Image src={story.mediaUrl} alt="" fill className={styles.image} />
      )}
    </div>
  );
}
