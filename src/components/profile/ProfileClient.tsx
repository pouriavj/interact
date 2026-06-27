"use client";

import { useSession, signOut } from "next-auth/react";
import SecondaryButton from "@/components/SecondaryButton";
import useActions from "@/hooks/useActions";
import PrimaryButton from "../PrimaryButton";

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
  const actions = useActions();
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>

      {isOwner ? (
        <div>
          <button>Edit Profile</button>
           <>
          <form action={actions.stories.delete.submitAction}>
            <PrimaryButton
              type="submit"
              disabled={actions.stories.delete.isPending}
            >
              {actions.stories.delete.isPending ? "Deleting..." : "Delete Story"}
            </PrimaryButton>
          </form>

          {actions.stories.delete.formState.message && (
            <p>{actions.stories.delete.formState.message}</p>
          )}
        </>
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
