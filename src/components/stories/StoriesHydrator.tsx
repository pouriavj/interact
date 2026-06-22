"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
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
  const isAuthenticated = status === "authenticated";
  const [stories, setStories] = useState(
    isAuthenticated ? null : initialStories,   // Initial Stories if user is logged in, is null and if not is public stories
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (status !== "authenticated") return;

    const userId = session?.user?.id;
    if (!userId) return;

    startTransition(async () => {
      const data = await fetchFollowingStories(userId);
      setStories(data);
    });
  }, [status, session?.user?.id]);
  if (status === "loading") return <StoriesSkeleton />;   // If auth is loading show skeleton 
  if (isPending) return <StoriesSkeleton />  // If auth is done but query is pending show nothing, if not authenticated show public stories
  return <StoriesClient stories={stories} />;
}
