import { notFound } from "next/navigation";
import { getUserProfile } from "@/queries/get-user-profile";
import ProfileClient from "@/components/profile/ProfileClient";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await getUserProfile(username);

  if (!user) {
    notFound();
  }

  return <ProfileClient user={user} />;
}
