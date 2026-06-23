"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StoriesClient from "./StoriesClient";
import { fetchFollowingStories } from "@/queries";
import StoriesSkeleton from "../skeletons/StoriesSkeleton";

type Story = {
  id: string;
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

  useEffect(() => {
    if (status !== "authenticated") return;

    const userId = session?.user?.id;
    if (!userId) return;

    let cancelled = false;

    async function loadStories() {
      if (!userId) return;

      const data = await fetchFollowingStories(userId);

      if (!cancelled) {
        setFollowingStories(data);
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
    return <StoriesClient stories={followingStories} />;
  }

  // Guest
  return <StoriesClient stories={initialStories} />;
}
