"use client";

import { useTransition } from "react";

import Button from "@mui/material/Button";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import * as actions from "@/actions";

import styles from "./Login.module.css";
import Image from "next/image";

export default function AuthButtons() {
  const [pending, startTransition] = useTransition();

  return (
    <>
      <Button
        fullWidth
        disabled={pending}
        className={styles.socialButton}
        startIcon={
          <Image src="/google-logo.svg" alt="google" width={20} height={20} />
        }
        onClick={() =>
          startTransition(() => actions.signInWithProvider("google"))
        }
      >
        Continue with Google
      </Button>

      <Button
        fullWidth
        disabled={pending}
        className={styles.socialButton}
        startIcon={<Image src="/github-logo.svg" alt="github" width={20} height={20} />}
        onClick={() =>
          startTransition(() => actions.signInWithProvider("github"))
        }
      >
        Continue with GitHub
      </Button>
    </>
  );
}
