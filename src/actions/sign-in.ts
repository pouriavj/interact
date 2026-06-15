"use server";

import * as auth from "@/auth";

export async function signInWithProvider(provider: "google" | "github") {
  await auth.signIn(provider, {
    redirectTo: "/",
  });
}

export async function signInWithEmail(formData: FormData) {
  const email = formData.get("email");

  if (typeof email !== "string") {
    return;
  }

  await auth.signIn("resend", {
    email,
    redirectTo: "/",
  });
}
