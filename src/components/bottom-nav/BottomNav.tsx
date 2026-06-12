"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchIcon from "@mui/icons-material/Search";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SendIcon from "@mui/icons-material/Send";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { paths } from "@/paths";
import styles from "./BottomNav.module.css";

const items = [
  {
    href: paths.home(),
    Icon: HomeIcon,
    OutlinedIcon: HomeOutlinedIcon,
  },
  {
    href: paths.messages(),
    Icon: SendIcon,
    OutlinedIcon: SendOutlinedIcon,
  },
  {
    href: paths.explore(),
    Icon: SearchIcon,
    OutlinedIcon: SearchOutlinedIcon,
  },
  {
    href: paths.settings(),
    Icon: PersonIcon,
    OutlinedIcon: PersonOutlinedIcon,
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

  const Icon = active ? item.Icon : item.OutlinedIcon;

  return (
    <Link
      key={item.href}
      href={item.href}
      className={styles.item}
    >
      <Icon className={styles.icon} />
    </Link>
  );
})}
    </nav>
  );
}
