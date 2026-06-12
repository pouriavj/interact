import Link from "next/link";
import Image from "next/image";

import HeaderAuth from "./HeaderAuth";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="Home">
        <Image
          src="/interact-logo-lowQuality.png"
          alt="Interact Logo"
          width={98}
          height={26}
          priority
        />
      </Link>

      <HeaderAuth />
    </header>
  );
}