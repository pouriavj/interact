"use client";

import { useTransition } from "react";

import * as actions from "@/actions"

import styles from "./Login.module.css";

export default function AuthButtons() {
  const [pending, startTransition] =
    useTransition();

  return (
    <>
      <button
        className={styles.socialButton}
        disabled={pending}
        onClick={() =>
          startTransition(() =>
            actions.signInWithProvider("google")
          )
        }
      >
        Continue with Google
      </button>

      <button
        className={styles.socialButton}
        disabled={pending}
        onClick={() =>
          startTransition(() =>
            actions.signInWithProvider("github")
          )
        }
      >
        Continue with GitHub
      </button>
    </>
  );
}