"use client";

import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import StoryProgress from "./StoryProgress";
import styles from "./StoryViewer.module.css";
import type { Story } from "./StoriesHydrator";

type Props = {
  story: Story;
  onNext: () => void;
  onPrev?: () => void;
  onClose: () => void;
};

export default function StoryViewer({ story, onClose, onNext, onPrev }: Props) {
  return (
    <div className={styles.overlay}>
      <StoryProgress duration={30000} onFinish={onNext} />

      {/* CLICK AREAS */}
      <div className={styles.leftZone} onClick={onPrev} />
      <div className={styles.rightZone} onClick={onNext} />

      <div className={styles.header} onClick={(e) => e.stopPropagation()}>
        <div className={styles.user}>
          <Avatar src={story.user.image ?? "/default-avatar2.png"} />
          <span>{story.user.name}</span>
        </div>

        <button type="button" onClick={onClose} className={styles.closeButton}>
          <CloseIcon fontSize="medium" />
        </button>
      </div>

      {story.mediaType === "IMAGE" && (
        <Image src={story.mediaUrl} alt="" fill className={styles.image} priority />
      )}
    </div>
  );
}
