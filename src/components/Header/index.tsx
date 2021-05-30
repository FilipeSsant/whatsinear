import { LoginButton } from "../LoginButton";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header>
      <div className={styles.headerContent}>
        <strong>What's In Ear 👂</strong>
        <LoginButton />
      </div>
    </header>
  );
}
