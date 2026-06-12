"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { House, Send, Search, User } from "lucide-react";
import { useSession } from "next-auth/react";

import { paths } from "@/paths";
import styles from "./BottomNav.module.css";

const items = [
  {
    href: paths.home(),
    Icon: House,
  },
  {
    href: paths.messages(),
    Icon: Send,
  },
  {
    href: paths.explore(),
    Icon: Search,
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
      Icon: User,
    },
  ];

  return (
    <nav className={styles.nav}>
      {allItems.map((item) => {
        const active =
          pathname === item.href ||
          pathname.startsWith(item.href + "/");

        const Icon = item.Icon;

        return (
          <Link key={item.href} href={item.href} className={styles.item}>
            <Icon
              className={styles.icon}
              size={24}
              strokeWidth={active ? 3.6 : 2}
              color={active ? "currentColor" : "#9aa0a6"}
            />
          </Link>
        );
      })}
    </nav>
  );
}