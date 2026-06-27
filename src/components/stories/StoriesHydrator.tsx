"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StoriesClient from "./StoriesClient";
import { fetchFollowingStories, fetchOwnStory } from "@/queries";
import StoriesSkeleton from "../skeletons/StoriesSkeleton";

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

type Props = {
  initialStories: Story[];
};

export default function StoriesHydrator({ initialStories }: Props) {
  const { data: session, status } = useSession();

  const [followingStories, setFollowingStories] = useState<Story[] | null>(
    null,
  );

  const [ownStory, setOwnStory] = useState<Story | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    const userId = session?.user?.id;
    if (!userId) return;

    let cancelled = false;

    async function loadStories() {
      if (!userId) return;

      const [following, own] = await Promise.all([
        fetchFollowingStories(userId),
        fetchOwnStory(userId),
      ]);

      if (!cancelled) {
        setFollowingStories(following);
        setOwnStory(own);
      }
    }

    loadStories();

    return () => {
      cancelled = true;
    };
  }, [status, session?.user?.id]);

  // Session is still loading
  if (status === "loading") {
    return <StoriesSkeleton />;
  }

  // Logged in, but following stories haven't arrived yet
  if (status === "authenticated" && followingStories === null) {
    return <StoriesSkeleton />;
  }

  // Logged in
  if (status === "authenticated") {
    return (
      <StoriesClient
        stories={followingStories}
        ownStory={ownStory}
        currentUser={{
          name: session.user?.name,
          image: session.user?.image,
        }}
      />
    );
  }

  // Guest
  return <StoriesClient stories={initialStories}  ownStory={null} currentUser={null} />;
}
