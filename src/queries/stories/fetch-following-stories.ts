"use server"
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

async function fetchFollowingStoriesBase(userId: string) {
  console.log("(Caching Query) DB HIT for user:", userId );
  return prisma.story.findMany({
    where: {
      expiresAt: { gt: new Date() },
      user: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
}

export async function fetchFollowingStories(userId: string) {
  return unstable_cache(
    () => fetchFollowingStoriesBase(userId),
    [`following-stories-${userId}`], // ✅ per-user cache key
    {
      revalidate: 60, // 60s Instagram-style refresh
    }
  )();
}