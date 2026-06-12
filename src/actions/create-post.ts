"use server";

export async function createPost() {
  // TODO:
  // - revalidate: "/" (home feed shows new post immediately if user is logged in feed)
  // - revalidate: "/profile/[username]" (author profile feed updates)
  // ❌ DO NOT revalidate /post/[id] (doesn't exist yet in cache flow)
  // ❌ DO NOT revalidate /explore, /trending (time-based)
}
