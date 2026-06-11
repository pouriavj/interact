"use client";

import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

import { useSession } from "next-auth/react";

import styles from "./Header.module.css";

export default function HeaderAuth() {
  const session = useSession();
  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <nav className={styles.actions} aria-label="Header actions">
        <IconButton className={styles.iconButton} aria-label="Notifications">
          <Badge badgeContent={2} color="error">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>

        <IconButton className={styles.iconButton} aria-label="Messages">
          <Badge badgeContent={99} color="error">
            <MailOutlineOutlinedIcon />
          </Badge>
        </IconButton>
      </nav>
    );
  } else {
    authContent = (
      <div>signup</div>
    );
  }

  return authContent;
}
