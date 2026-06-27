"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteStory(prevState: { message: string }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        message: "You must be signed in.",
      };
    }

    const story = await prisma.story.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        mediaUrl: true,
      },
    });

    if (!story) {
      return {
        message: "Story not found.",
      };
    }

    // Delete from Blob
    await del(story.mediaUrl);

    // Delete from Prisma
    await prisma.story.delete({
      where: {
        userId: session.user.id,
      },
    });

    revalidatePath("/");
    // revalidatePath("/profile");
  } catch (error) {
    console.error(error);

    return {
      message: "Something went wrong.",
    };
  }

  redirect("/");
}
