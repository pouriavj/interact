"use client";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./Stories.module.css";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import StoryViewer from "./StoryViewer";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import AddStoryViewer from "./AddStoryViewer";

export type Story = {
  id: string;
  mediaUrl: string;
  mediaType: "IMAGE" | "VIDEO";
  createdAt: Date;
  header: string | null;
  subHeader: string | null;
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

type Props = {
  stories: Story[] | null;
  ownStory: Story | null;
  currentUser: CurrentUser;
};

export default function StoriesClient({
  stories,
  currentUser,
  ownStory,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();
  const [viewedStories, setViewedStories] = useState<string[]>([]);
  const [showAddStory, setShowAddStory] = useState(false);

  useEffect(() => {
    if (selectedIndex === null) return;

    const story = selectedIndex === -1 ? ownStory : stories?.[selectedIndex];

    if (!story) return;

    setViewedStories((prev) =>
      prev.includes(story.id) ? prev : [...prev, story.id],
    );
  }, [selectedIndex, stories, ownStory]);

  function handleYourStoryClick() {
    if (!currentUser) {
      router.push(paths.login());
      return;
    }
    // If user is authenticated
    setShowAddStory(true);
  }
  return (
    <>
      {/* Your Story */}
      {ownStory ? (
        <div className={styles.story} onClick={() => setSelectedIndex(-1)}>
          <div
            className={`${styles.avatarWrapper} ${
              viewedStories.includes(ownStory.id)
                ? styles.viewedAvatarWrapper
                : ""
            }`}
          >
            <Avatar
              src={currentUser?.image ?? "/default-avatar2.png"}
              alt="You"
              className={styles.avatar}
              sx={{ width: 74, height: 74 }}
            />
          </div>

          <span className={styles.name}>You</span>
        </div>
      ) : (
        <div className={styles.story} onClick={handleYourStoryClick}>
          <div
            className={`${styles.avatarWrapper} ${styles.yourAvatarWrapper}`}
          >
            <Avatar
              src={currentUser?.image ?? "/default-avatar2.png"}
              alt="You"
              sx={{ width: 74, height: 74 }}
            />

            <AddCircleIcon className={styles.plus} />
          </div>

          <span className={styles.name}>You</span>
        </div>
      )}

      {/* Stories */}
      {stories?.map((story, index) => (
        <div
          key={story.id}
          className={styles.story}
          onClick={() => setSelectedIndex(index)}
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
      {/* Show story */}
      {selectedIndex !== null && (
        <StoryViewer
          story={selectedIndex === -1 ? ownStory! : stories![selectedIndex]}
          onNext={() => {
            if (selectedIndex === -1) {
              if (stories && stories.length > 0) {
                setSelectedIndex(0);
              } else {
                setSelectedIndex(null);
              }
              return;
            }

            if (selectedIndex < stories!.length - 1) {
              setSelectedIndex(selectedIndex + 1);
            } else {
              setSelectedIndex(null);
            }
          }}
          onPrev={() => {
            if (selectedIndex === -1) return;

            if (selectedIndex === 0 && ownStory) {
              setSelectedIndex(-1);
            } else if (selectedIndex > 0) {
              setSelectedIndex(selectedIndex - 1);
            }
          }}
          onClose={() => setSelectedIndex(null)}
        />
      )}
      {/* Add story */}
      {showAddStory && (
        <AddStoryViewer onClose={() => setShowAddStory(false)} />
      )}
    </>
  );
}
