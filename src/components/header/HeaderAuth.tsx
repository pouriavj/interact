"use client";
import * as actions from "@/actions";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

import { Bell, Mail } from "lucide-react";

import { useSession } from "next-auth/react";
import PrimaryButton from "@/components/PrimaryButton";
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
          <Badge badgeContent={2} color="error"  classes={{ badge: styles.badge }}>
            <Bell size={20}/>
          </Badge>
        </IconButton>

        <IconButton className={styles.iconButton} aria-label="Messages">
          <Badge badgeContent={99} color="error"  classes={{ badge: styles.badge }}>
            <Mail size={20}/>
          </Badge>
        </IconButton>
       
      </nav>
    );
  } else {
    authContent =  <form action={actions.signIn}>
        <PrimaryButton type="submit" children="Login with GitHub" />
      </form>;
  }

  return authContent;
}
