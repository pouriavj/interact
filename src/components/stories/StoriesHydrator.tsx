"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import StoriesClient from "./StoriesClient";
import { fetchFollowingStories } from "@/queries/stories/fetch-following-stories";

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

  const [stories, setStories] = useState(initialStories);
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

  return <StoriesClient stories={stories} />;
}