"use server";

import * as auth from "@/auth";

type Provider = "google" | "github";

export async function signIn(provider: Provider) {
  return auth.signIn(provider);
}