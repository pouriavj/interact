import type { fetchFollowingPosts, fetchPublicPosts } from "@/queries";

export type PublicPosts = Awaited<ReturnType<typeof fetchPublicPosts>>;

export type FollowingPosts = Awaited<ReturnType<typeof fetchFollowingPosts>>;
