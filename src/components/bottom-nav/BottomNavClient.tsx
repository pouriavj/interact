"use client";

import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";

import HomeIcon from "@/icons/HomeIcon";
import HomeIconFilled from "@/icons/HomeIconFilled";

import MessageIcon from "@/icons/MessageIcon";
import MessageIconFilled from "@/icons/MessageIconFilled";

import SearchIcon from "@/icons/SearchIcon";
import SearchIconFilled from "@/icons/SearchIconFilled";

import UserIcon from "@/icons/UserIcon";
import UserIconFilled from "@/icons/UserIconFilled";
import { useSelectedLayoutSegment } from "next/navigation";
import { paths } from "@/paths";
import styles from "./BottomNav.module.css";
import ProfileNavSkeleton from "../skeletons/ProfileNavSkeleton";

type NavItem = {
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  FilledIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isProfile: boolean;
};

const items: NavItem[] = [
  {
    href: paths.home(),
    Icon: HomeIcon,
    FilledIcon: HomeIconFilled,
    isProfile: false,
  },
  {
    href: paths.messages(),
    Icon: MessageIcon,
    FilledIcon: MessageIconFilled,
    isProfile: false,
  },
  {
    href: paths.explore(),
    Icon: SearchIcon,
    FilledIcon: SearchIconFilled,
    isProfile: false,
  },
];

// -------------------- helpers --------------------

function isActive(pathname: string, href: string): boolean {
  if (pathname === href) {
    return true;
  } else if (pathname.startsWith(href + "/")) {
    return true;
  } else {
    return false;
  }
}

function renderNavIcon(
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  FilledIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  active: boolean,
) {
  const IconComponent = active ? FilledIcon : Icon;
  return <IconComponent className={styles.icon} />;
}

function renderProfile({
  status,
  session,
  active,
  styles,
}: {
  status: string;
  session: any;
  active: boolean;
  styles: any;
}) {
  if (status === "loading") {
    return <ProfileNavSkeleton />;
  }

  if (session?.user?.image) {
    return (
      <Avatar
        src={session.user.image}
        alt={session.user.name ?? "Profile"}
        className={`${styles.avatar} ${active ? styles.avatarActive : ""}`}
      />
    );
  }

  if (active) {
    return <UserIconFilled className={styles.icon} />;
  }

  return <UserIcon className={styles.icon} />;
}

// -------------------- component --------------------

export default function BottomNavClient() {
  const { data: session, status } = useSession();

  const segment = useSelectedLayoutSegment();
  const pathname = segment ? `/${segment}` : "/";

  const profileHref = session?.user
    ? paths.profile(session.user.name || "me")
    : paths.login();

  const allItems: NavItem[] = [
    ...items,
    {
      href: profileHref,
      Icon: UserIcon,
      FilledIcon: UserIconFilled,
      isProfile: true,
    },
  ];

  return (
    <nav className={styles.nav}>
      {allItems.map((item) => {
        let active = isActive(pathname, item.href);

        if (item.isProfile && segment === "profile") {
          active = true;
        }

        return (
          <Link key={item.href} href={item.href} className={styles.item}>
            {item.isProfile
              ? renderProfile({
                  status,
                  session,
                  active,
                  styles,
                })
              : renderNavIcon(item.Icon, item.FilledIcon, active)}
          </Link>
        );
      })}
    </nav>
  );
}
