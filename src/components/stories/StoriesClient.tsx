"use client";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./Stories.module.css";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import StoryViewer from "./StoryViewer";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

export type Story = {
  id: string;
  mediaUrl: string;
  mediaType: "IMAGE" | "VIDEO";
  createdAt: Date;

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();
  const [viewedStories, setViewedStories] = useState<string[]>([]);

  function handleYourStoryClick() {
    if (!currentUser) {
      router.push(paths.login());
      return;
    }

    // Later:
    // setShowAddStory(true);
  }
  return (
    <>
      {/* Your Story */}
      <div className={styles.story} onClick={handleYourStoryClick}>
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
      {stories?.map((story, index) => (
        <div
          key={story.id}
          className={styles.story}
          onClick={() => {
            if (!viewedStories.includes(story.id)) {
              setViewedStories([...viewedStories, story.id]);
            }

            setSelectedIndex(index);
          }}
        >
          <div
            className={`${styles.avatarWrapper} ${
              viewedStories.includes(story.id) ? styles.viewedAvatarWrapper : ""
            }`}
          >
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
      {selectedIndex !== null && stories && (
        <StoryViewer
          story={stories[selectedIndex]}
          onNext={() => {
            if (selectedIndex < stories.length - 1) {
              setSelectedIndex(selectedIndex + 1);
            } else {
              setSelectedIndex(null);
            }
          }}
          onPrev={() => {
            if (selectedIndex > 0) {
              setSelectedIndex(selectedIndex - 1);
            }
          }}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
