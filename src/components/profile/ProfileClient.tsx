"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import useActions from "@/hooks/useActions";

type Props = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };

  isOwner: boolean;

  story: {
    id: string;
    mediaUrl: string;
    mediaType: "IMAGE" | "VIDEO";
    createdAt: Date;
    expiresAt: Date;
    userId: string;
  } | null;
};

export default function ProfileClient({
  user,
  isOwner,
  story,
}: Props) {
  const actions = useActions();

  useEffect(() => {
    const message = actions.stories.delete.formState.message;

    if (!message) return;

    if (message.startsWith("SUCCESS:")) {
      toast.success("Story deleted successfully.");
      return;
    }

    if (message.startsWith("ERROR:")) {
      const text = message.slice(6, message.lastIndexOf(":"));
      toast.error(text);
    }
  }, [actions.stories.delete.formState.message]);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>

      {isOwner ? (
        <div>
          <button>Edit Profile</button>

          {story ? (
            <form action={actions.stories.delete.submitAction}>
              <PrimaryButton
                type="submit"
                disabled={actions.stories.delete.isPending}
              >
                {actions.stories.delete.isPending
                  ? "Deleting..."
                  : "Delete Story"}
              </PrimaryButton>
            </form>
          ) : (
            <p>You have no active story.</p>
          )}

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