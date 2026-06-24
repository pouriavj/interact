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

function formatStoryTime(createdAt: Date | string) {
  const created =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  const diff = Date.now() - created.getTime();

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);

  return `${days}d`;
}

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

          <div className={styles.userInfo}>
            <span className={styles.username}>{story.user.name}</span>
            <span className={styles.time}>
              {formatStoryTime(story.createdAt)}
            </span>
          </div>
        </div>

        <button type="button" onClick={onClose} className={styles.closeButton}>
          <CloseIcon fontSize="medium" />
        </button>
      </div>

      {story.mediaType === "IMAGE" && (
        <Image
          src={story.mediaUrl}
          alt=""
          fill
          className={styles.image}
          priority
        />
      )}
    </div>
  );
}
