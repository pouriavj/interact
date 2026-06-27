"use client";

import { useActionState } from "react";
import * as actions from "@/actions";

export default function useActions() {
  // Create Story
  const [createStoryState, createStoryAction, createStoryPending] =
    useActionState(actions.createStory, {
      message: "",
    });

  // Delete Story
  const [deleteStoryState, deleteStoryAction, deleteStoryPending] =
    useActionState(actions.deleteStory, {
      message: "",
    });

  return {
    stories: {
      create: {
        formState: createStoryState,
        submitAction: createStoryAction,
        isPending: createStoryPending,
      },

      delete: {
        formState: deleteStoryState,
        submitAction: deleteStoryAction,
        isPending: deleteStoryPending,
      },
    },
  };
}