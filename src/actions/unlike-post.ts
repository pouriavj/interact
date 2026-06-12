"use server";

export async function unlikePost() {
  // TODO:
  // - revalidate: "/post/[id]" (instant UI feedback)
  // - revalidate: "/profile/[username]" (optional if likes shown there)
  // ❌ DO NOT revalidate "/" and "/explore" (use optimistic UI instead) Time Based
}
