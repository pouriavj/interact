import * as actions from "@/actions"
import styles from "./Login.module.css";

export default function EmailForm() {
  return (
    <form
      action={actions.signInWithEmail}
      className={styles.form}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Email Address"
        className={styles.input}
      />

      <button
        type="submit"
        className={styles.primaryButton}
      >
        Send Magic Link
      </button>
    </form>
  );
}