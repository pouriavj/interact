"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { fetchFollowingPosts } from "@/queries";

import type { PublicPosts, FollowingPosts } from "@/types";

import PostsClient from "./PostsClient";
import PostsSkeleton from "../skeletons/PostsSkeleton";

type Props = {
  initialPosts: PublicPosts;
};

export default function PostsHydrator({ initialPosts }: Props) {
  const { data: session, status } = useSession();

  const [followingPosts, setFollowingPosts] = useState<FollowingPosts | null>(
    null,
  );

  useEffect(() => {
    if (status !== "authenticated") return;

    const userId = session?.user?.id;

    if (!userId) return;

    let cancelled = false;

    async function loadPosts(userId: string) {
        
      const posts = await fetchFollowingPosts(userId);

      if (!cancelled) {
        setFollowingPosts(posts);
      }
    }

    loadPosts(userId);

    return () => {
      cancelled = true;
    };
  }, [status, session?.user?.id]);

  // Session loading
  if (status === "loading") {
    return <PostsSkeleton />;
  }

  // Logged in, waiting for following posts
  if (status === "authenticated" && followingPosts === null) {
    return <PostsSkeleton />;
  }

  // Logged in
  if (status === "authenticated") {
    return <PostsClient posts={followingPosts} />;
  }

  // Guest
  return <PostsClient posts={initialPosts} />;
}
