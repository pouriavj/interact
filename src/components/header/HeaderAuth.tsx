"use client";

import { useSession } from "next-auth/react";

import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

import { Bell, Mail, LogIn } from "lucide-react";

import styles from "./Header.module.css";
import { paths } from "@/paths";
import SecondaryButton from "../SecondaryButton";

export default function HeaderAuth() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <nav className={styles.actions} aria-label="Header actions">
        <IconButton className={styles.iconButton} aria-label="Notifications">
          <Badge variant="dot" color="error" classes={{ badge: styles.badge }}>
            <Bell size={20} />
          </Badge>
        </IconButton>

        <IconButton className={styles.iconButton} aria-label="Messages">
          <Badge
            badgeContent={99}
            color="error"
            classes={{ badge: styles.badge }}
          >
            <Mail size={20} />
          </Badge>
        </IconButton>
      </nav>
    );
  }

  return (
    <SecondaryButton
      className={styles.headerButton}
      href={paths.login()}
      startIcon={<LogIn size={18} />}
    >
      Sign in
    </SecondaryButton>
  );
}