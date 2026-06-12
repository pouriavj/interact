"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  Send,
  Search,
  User,
} from "lucide-react";

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
  {
    href: paths.settings(),
    Icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {items.map((item) => {
  const active =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href ||
        pathname.startsWith(item.href + "/");

  const Icon = item.Icon;

  const isSearch = item.href === paths.explore();

  return (
    <Link
      key={item.href}
      href={item.href}
      className={styles.item}
    >
      <Icon
        className={styles.icon}
        size={24}
        strokeWidth={
          isSearch
            ? active
              ? 3.5
              : 2
            : 2
        }
        fill={
          active && !isSearch
            ? "currentColor"
            : "none"
        }
      />
    </Link>
  );
})}
    </nav>
  );
}