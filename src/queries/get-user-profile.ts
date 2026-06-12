import { prisma } from "@/lib/prisma";

export async function getUserProfile(username: string) {
  const user = await prisma.user.findFirst({
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

  return user;
}