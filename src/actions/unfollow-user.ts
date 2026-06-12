"use server";

export async function unfollowUser() {
  // TODO:
  // TODO:
  // - revalidate: "/profile/[targetUsername]"   (they gained/lost follower)
  // - revalidate: "/profile/[currentUser]"      (your following list changed)
  // - revalidate: "/activity" (notification appears)
  // ❌ DO NOT revalidate "/" (feed is not instantly dependent)
}
