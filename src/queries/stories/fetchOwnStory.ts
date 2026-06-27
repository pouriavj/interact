"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

async function fetchOwnStoryBase(userId: string) {
  console.log("(Caching Query) DB HIT for own story:", userId);

  return prisma.story.findUnique({
  where: {
    userId,
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
});
}

export async function fetchOwnStory(userId: string) {
  return unstable_cache(
    () => fetchOwnStoryBase(userId),
    [`own-story-${userId}`],
    {
      revalidate: 60,
      tags: [`own-story-${userId}`],
    },
  )();
}