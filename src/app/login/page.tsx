import { auth } from "@/auth";
import { redirect } from "next/navigation";
import styles from "@/components/login/Login.module.css";
import AuthButtons from "@/components/login/AuthButtons";
import EmailForm from "@/components/login/EmailForm";
import Image from "next/image";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Image
          className={styles.logo}
          src="/interact-logo-nobg.png"
          alt="Interact Logo"
          width={160}
          height={160}
          priority
        />

        <h1>Welcome to Interact</h1>

        <p>Connect with friends and conversations.</p>

        <AuthButtons />

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <EmailForm />

        <small>We'll send a secure sign-in link to your email.</small>
      </div>
    </main>
  );
}
