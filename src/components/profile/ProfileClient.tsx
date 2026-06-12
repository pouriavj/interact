"use client";

import { useSession, signOut } from "next-auth/react";
import SecondaryButton from "@/components/SecondaryButton";

export default function ProfileClient({
  user,
}: {
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}) {
  const { data: session } = useSession();
  const isOwner = session?.user?.id === user.id;
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>

      {isOwner ? (
        <div>
          <button>Edit Profile</button>

          <SecondaryButton
            type="button"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Logout
          </SecondaryButton>
        </div>
      ) : (
        <p>This is a public profile</p>
      )}
    </div>
  );
}
