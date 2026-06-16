"use client";

import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import * as actions from "@/actions";
import styles from "./Login.module.css";
import Image from "next/image";
import SecondaryButton from "../SecondaryButton";

export default function AuthButtons() {
  const [pendingProvider, setPendingProvider] = useState<"google" | "github" | null>(null);

  const handleLogin = (provider: "google" | "github") => {
    if (pendingProvider) return;

    setPendingProvider(provider);
    actions.signInWithProvider(provider);
  };

  const isLoading = (provider: "google" | "github") =>
    pendingProvider === provider;

  return (
    <>
      <SecondaryButton
        fullWidth
        className={styles.socialButton}
        onClick={() => handleLogin("google")}
        style={{
          pointerEvents: pendingProvider ? "none" : "auto",
          opacity: pendingProvider && !isLoading("google") ? 0.6 : 1,
        }}
        startIcon={
          isLoading("google") ? (
            <CircularProgress size={18} />
          ) : (
            <Image src="/google-logo.svg" alt="google" width={20} height={20} />
          )
        }
      >
        {isLoading("google") ? "Redirecting..." : "Continue with Google"}
      </SecondaryButton>

      <SecondaryButton
        fullWidth
        className={styles.socialButton}
        onClick={() => handleLogin("github")}
        style={{
          pointerEvents: pendingProvider ? "none" : "auto",
          opacity: pendingProvider && !isLoading("github") ? 0.6 : 1,
        }}
        startIcon={
          isLoading("github") ? (
            <CircularProgress size={18} />
          ) : (
            <Image src="/github-logo.svg" alt="github" width={20} height={20} />
          )
        }
      >
        {isLoading("github") ? "Redirecting..." : "Continue with GitHub"}
      </SecondaryButton>
    </>
  );
}