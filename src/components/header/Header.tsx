import Link from "next/link";
import Image from "next/image";

import HeaderAuth from "./HeaderAuth";
import Stories from "@/components/stories/Stories";
import styles from "./Header.module.css";


export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <Image
            src="/interact_logo_transparent.png"
            alt="Interact Logo"
            width={102}
            height={24}
            priority
          />
        </Link>
        
        <HeaderAuth />
 
      </div>
      
      <Stories />
    </header>
  );
}