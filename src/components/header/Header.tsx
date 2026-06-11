import Link from "next/link";

import HeaderAuth from "./HeaderAuth";
import styles from "./Header.module.css";

function Logo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="18" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.logo}
        aria-label="Home"
      >
        <Logo />
      </Link>

      <HeaderAuth />
    </header>
  );
}