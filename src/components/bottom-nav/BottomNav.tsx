"use client";

import Avatar from "@mui/material/Avatar";
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
import Skeleton from "@mui/material/Skeleton";

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

export default function BottomNav() {
  const pathname = usePathname();
  const session = useSession();

  const profileHref = session.data?.user
    ? paths.profile(session.data.user.name || "me")
    : paths.signIn();

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

        const isProfileLoading = item.isProfile && session.status === "loading";

        const isLoggedInProfile =
          item.isProfile &&
          session.status === "authenticated" &&
          !!session.data?.user?.image;

        const IconComponent = active ? item.FilledIcon : item.Icon;

        return (
          <Link key={item.href} href={item.href} className={styles.item} >
            {isProfileLoading ? (
              <Skeleton
                variant="circular"
                animation="wave"
                width={28}
                height={28}
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  "&::after": {
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                  },
                }}
              />
            ) : isLoggedInProfile ? (
              <Avatar
                src={session.data!.user!.image!}
                alt={session.data!.user!.name || "Profile"}
                className={`${styles.avatar} ${
                  active ? styles.avatarActive : ""
                }`}
              />
            ) : (
              <IconComponent className={styles.icon} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
