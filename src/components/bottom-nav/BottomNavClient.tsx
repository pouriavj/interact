"use client";

import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "@/icons/HomeIcon";
import HomeIconFilled from "@/icons/HomeIconFilled";

import MessageIcon from "@/icons/MessageIcon";
import MessageIconFilled from "@/icons/MessageIconFilled";

import SearchIcon from "@/icons/SearchIcon";
import SearchIconFilled from "@/icons/SearchIconFilled";

import UserIcon from "@/icons/UserIcon";
import UserIconFilled from "@/icons/UserIconFilled";

import { paths } from "@/paths";
import styles from "./BottomNav.module.css";
import { useSession } from "next-auth/react";
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

export default function BottomNavClient() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

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
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");

        const IconComponent = active ? item.FilledIcon : item.Icon;

        return (
          <Link key={item.href} href={item.href} className={styles.item}>
            {item.isProfile ? (
              status === "loading" ? (
                <ProfileNavSkeleton />
              ) : session?.user?.image ? (
                <Avatar
                  src={session.user.image}
                  alt={session.user.name ?? "Profile"}
                  className={`${styles.avatar} ${
                    active ? styles.avatarActive : ""
                  }`}
                />
              ) : active ? (
                <UserIconFilled className={styles.icon} />
              ) : (
                <UserIcon className={styles.icon} />
              )
            ) : (
              <IconComponent className={styles.icon} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
