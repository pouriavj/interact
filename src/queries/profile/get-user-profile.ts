"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

async function getUserProfileBase(username: string) {
  return prisma.user.findFirst({
    where: {
      name: username,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
}

export async function getUserProfile(username: string) {
  return unstable_cache(
    () => getUserProfileBase(username),
    [`user-profile-${username}`],
    {
      revalidate: 60,
      tags: [`user-profile-${username}`],
    },
  )();
}