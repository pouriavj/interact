import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";

import styles from "@/components/login/Login.module.css";
import Link from "next/link";
import { paths } from "@/paths";

export default async function VerifyRequestPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className={styles.page}>
      <div className={styles.verifyCard}>
        <div className={styles.verifyIconWrapper}>
          <Mail className={styles.verifyIcon} />
        </div>

        <h1 className={styles.verifyTitle}>Check your inbox</h1>

        <p className={styles.verifyText}>
          We’ve sent you a secure sign-in link.
        </p>

        <p className={styles.verifySubtext}>
          Open your email and click the link to continue.
        </p>

        <div className={styles.verifyHint}>
          Didn’t receive it? Check spam or
          <Link href={paths.login()}>try again</Link>.
        </div>
      </div>
    </main>
  );
}
