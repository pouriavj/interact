"use server";

import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/prisma";

async function fetchPublicPostsBase() {
  console.log("(Caching Query) DB HIT for public posts");

  return prisma.post.findMany({
    where: {
      user: {
        visibility: "PUBLIC",
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 10,

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

      _count: {
        select: {
          likes: true,
          comments: true,
          shares: true,
        },
      },
    },
  });
}

export const fetchPublicPosts = unstable_cache(
  fetchPublicPostsBase,
  ["public-posts"],
  {
    revalidate: 60,
    tags: ["public-posts"],
  },
);