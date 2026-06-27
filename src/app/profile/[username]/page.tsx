import { auth } from "@/auth";

import { notFound } from "next/navigation";
import { getUserProfile, fetchOwnStory } from "@/queries";
import ProfileClient from "@/components/profile/ProfileClient";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const [session, user] = await Promise.all([auth(), getUserProfile(username)]);
  if (!user) {
    notFound();
  }

  const isOwner = session?.user?.id === user.id;

  const story = isOwner ? await fetchOwnStory(user.id) : null;

  return <ProfileClient user={user} isOwner={isOwner} story={story} />;
}
