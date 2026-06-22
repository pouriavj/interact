"use server"
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const fetchPublicStories = unstable_cache(
  async () => {
    return prisma.story.findMany({
      where: {
        expiresAt: { gt: new Date() },
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
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  },
  ["public-stories"],
  {
    revalidate: 60, //  cache for 60s
  }
);