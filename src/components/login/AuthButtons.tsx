"use client";

import { useTransition } from "react";

import Button from "@mui/material/Button";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import * as actions from "@/actions";

import styles from "./Login.module.css";

export default function AuthButtons() {
  const [pending, startTransition] =
    useTransition();

  return (
    <>
      <Button
        fullWidth
        disabled={pending}
        className={styles.socialButton}
        startIcon={<GoogleIcon />}
        onClick={() =>
          startTransition(() =>
            actions.signInWithProvider("google")
          )
        }
      >
        Continue with Google
      </Button>

      <Button
        fullWidth
        disabled={pending}
        className={styles.socialButton}
        startIcon={<GitHubIcon />}
        onClick={() =>
          startTransition(() =>
            actions.signInWithProvider("github")
          )
        }
      >
        Continue with GitHub
      </Button>
    </>
  );
}