"use server";

import { put } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createStory(
  prevState: { message: string },
  formData: FormData,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        message: "You must be signed in.",
      };
    }

    const file = formData.get("image");

    if (!(file instanceof File)) {
      return {
        message: "Please select an image.",
      };
    }

    if (file.size === 0) {
      return {
        message: "Please select an image.",
      };
    }

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      return {
        message: "Invalid image type.",
      };
    }

    if (file.size > 5 * 1024 * 1024) {
      return {
        message: "Image must be smaller than 5MB.",
      };
    }

    const header = formData.get("header")?.toString().trim() || null;

    const subHeader = formData.get("subHeader")?.toString().trim() || null;

    //---------------------------------------
    // Upload image
    //---------------------------------------

    const blob = await put(
      `stories/${session.user.id}/${crypto.randomUUID()}-${file.name}`,
      file,
      {
        access: "public",
      },
    );

    //---------------------------------------
    // Save story
    //---------------------------------------

    await prisma.story.create({
      data: {
        mediaUrl: blob.url,
        mediaType: "IMAGE",

        header,
        subHeader,

        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Long expire time for tests

        userId: session.user.id,
      },
    });
    revalidateTag(`own-story-${session.user.id}`, "max");
    
    if (session.user.name) {
      revalidatePath(`/profile/${session.user.name}`);
    }
    revalidatePath("/");
  } catch (error) {
    console.error(error);

    return {
      message: "Something went wrong.",
    };
  }
  redirect("/");
}
