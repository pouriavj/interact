import { auth } from "@/auth";
import { redirect } from "next/navigation";
import styles from "@/components/login/Login.module.css";

export default async function VerifyRequestPage() {
  const session = await auth();

  // If user is already logged in → redirect immediately
  if (session) {
    redirect("/");
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1>Check your inbox</h1>

        <p>We've sent you a secure sign-in link.</p>

        <p>Open the email and click the link to continue.</p>
      </div>
    </main>
  );
}