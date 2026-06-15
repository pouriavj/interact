import styles from "@/components/login/Login.module.css";
import AuthButtons from "@/components/login/AuthButtons";
import EmailForm from "@/components/login/EmailForm";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>i</div>

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
