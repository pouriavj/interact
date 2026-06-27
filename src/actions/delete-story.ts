"use server";

import { del } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteStory(prevState: { message: string }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        message: `ERROR:You must be signed in.:${Date.now()}`,
      };
    }

    const story = await prisma.story.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        mediaUrl: true,
        user: {
          select: {
            name: true, 
          },
        },
      },
    });

    if (!story) {
      return {
        message: `ERROR:Story not found.:${Date.now()}`,
      };
    }

    await del(story.mediaUrl);

    await prisma.story.delete({
      where: {
        userId: session.user.id,
      },
    });
    revalidateTag(`own-story-${session.user.id}`, "max");
    revalidatePath("/");

    return {
      message: `SUCCESS:${Date.now()}`,
    };
  } catch (error) {
    console.error(error);

    return {
      message: `ERROR:Something went wrong.:${Date.now()}`,
    };
  }
}
