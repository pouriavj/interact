"use client";

import { useActionState } from "react";
import * as actions from "@/actions";

export default function useActions() {
  // Stories
  const [createStoryState, createStoryAction, createStoryPending] =
    useActionState(actions.createStory, {
      message: "",
    });

  return {
    stories: {
      create: {
        formState: createStoryState,
        submitAction: createStoryAction,
        isPending: createStoryPending,
      },
    },
  };
}