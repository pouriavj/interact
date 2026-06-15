"use client";
import * as actions from "@/actions";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

import { Bell, Mail } from "lucide-react";

import { useSession } from "next-auth/react";
import PrimaryButton from "@/components/PrimaryButton";
import styles from "./Header.module.css";
import Skeleton from "@mui/material/Skeleton";

export default function HeaderAuth() {
  const session = useSession();
  let authContent: React.ReactNode;
  if (session.status === "loading") {
    return (
      <div className={styles.authSkeleton}>
        <Skeleton
          variant="rounded"
          animation="wave"
          width={92}
          height={36}
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.04)",
            "&::after": {
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            },
          }}
        />
      </div>
    );
  } else if (session.data?.user) {
    authContent = (
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
  } else {
    authContent = (
      <div>
        <form action={() => actions.signInWithProvider("github")}>
          <PrimaryButton type="submit" children="Login with GitHub" />
        </form>
        <form action={() => actions.signInWithProvider("google")}>
          <PrimaryButton type="submit" children="Login with Google" />
        </form>
      </div>
    );
  }

  return authContent;
}
