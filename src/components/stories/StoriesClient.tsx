"use client";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./Stories.module.css";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import StoryViewer from "./StoryViewer";

type Story = {
  id: string;
  mediaUrl: string;
  mediaType: "IMAGE" | "VIDEO";

  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};
type CurrentUser = {
  name: string | null | undefined;
  image: string | null | undefined;
} | null;

export default function StoriesClient({
  stories,
  currentUser,
}: {
  stories: Story[] | null;
  currentUser: CurrentUser;
}) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  return (
    <>
      {/* Your Story */}
      <div className={styles.story}>
        <div className={`${styles.avatarWrapper} ${styles.yourAvatarWrapper}`}>
          <Avatar
            src={currentUser?.image ?? "/default-avatar2.png"}
            alt="You"
            sx={{ width: 74, height: 74 }}
          />
          <AddCircleIcon className={styles.plus} />
        </div>

        <span className={styles.name}>You</span>
      </div>

      {/* Stories */}
      {stories?.map((story) => (
        <div
          key={story.id}
          className={styles.story}
          onClick={() => setSelectedStory(story)}
        >
          <div className={styles.avatarWrapper}>
            {story.user.image && (
              <Avatar
                src={story.user.image}
                alt={story.user.name ?? ""}
                className={styles.avatar}
                sx={{ width: 74, height: 74 }}
              />
            )}
          </div>

          <span className={styles.name}>{story.user.name}</span>
        </div>
      ))}
      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}
