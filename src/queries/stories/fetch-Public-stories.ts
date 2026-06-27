"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

async function fetchPublicStoriesBase() {
  console.log("Fetching public stories from database");

  return prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      user: {
        visibility: "PUBLIC",
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

export async function fetchPublicStories() {
  return unstable_cache(
    () => fetchPublicStoriesBase(),
    ["public-stories"],
    {
      revalidate: 60,
      tags: ["public-stories"],
    },
  )();
}