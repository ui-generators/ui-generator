import { SignUp } from "@clerk/nextjs";
import styles from "./styles.module.css";

export default function Page() {

  return (
  <div className={styles.mainContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.welcomeMessage}>
          UI Generator
        </h1>
        <div className={styles.googleButton}>
          <SignUp />
        </div>

        <h1 className={styles.teaseMessage}>
          Creating interfaces that excite, one prompt at a time.
        </h1>
      </div>
    </div>);
}
