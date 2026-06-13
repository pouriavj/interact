"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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

const items = [
  {
    href: paths.home(),
    Icon: HomeIcon,
    FilledIcon: HomeIconFilled,
  },
  {
    href: paths.messages(),
    Icon: MessageIcon,
    FilledIcon: MessageIconFilled,
  },
  {
    href: paths.explore(),
    Icon: SearchIcon,
    FilledIcon: SearchIconFilled,
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const session = useSession();

  const profileHref = session.data?.user
    ? paths.profile(session.data.user.name || "me")
    : paths.signIn();

  const allItems = [
    ...items,
    {
      href: profileHref,
      Icon: UserIcon,
      FilledIcon: UserIconFilled,
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
            <IconComponent className={styles.icon} />
          </Link>
        );
      })}
    </nav>
  );
}
