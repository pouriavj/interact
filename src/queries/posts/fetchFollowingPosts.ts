"use server";

import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/prisma";

async function fetchFollowingPostsBase(userId: string) {
  console.log("(Caching Query) DB HIT for user:", userId);

  const posts = await prisma.post.findMany({
    where: {
      user: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },

      media: {
        orderBy: {
          order: "asc",
        },
      },

      likes: {
        where: {
          userId,
        },

        select: {
          id: true,
        },
      },

      _count: {
        select: {
          likes: true,
          comments: true,
          shares: true,
        },
      },
    },
  });

  return posts.map(({ likes, ...post }) => ({
    ...post,
    isCurrentUserLiked: likes.length > 0,
  }));
}

export async function fetchFollowingPosts(userId: string) {
  return unstable_cache(
    () => fetchFollowingPostsBase(userId),
    [`following-posts-${userId}`],
    {
      revalidate: 60,
      tags: [`following-posts-${userId}`],
    },
  )();
}