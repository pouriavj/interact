"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send"; // direct / kite message
import PersonIcon from "@mui/icons-material/Person";
import { paths } from "@/paths";
import styles from "./BottomNav.module.css";

const items = [
  {
    href: paths.home(),
    icon: HomeIcon,
  },
  {
    href: paths.messages(),
    icon: SendIcon,
  },
  {
    href: paths.explore(),
    icon: SearchIcon,
  },
  {
    href: paths.settings(),
    icon: PersonIcon,
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
            : pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.item} ${active ? styles.active : ""}`}
          >
            <Icon className={styles.icon} />
          </Link>
        );
      })}
    </nav>
  );
}
