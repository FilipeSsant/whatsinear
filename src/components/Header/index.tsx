import { LoginButton } from "../LoginButton";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header>
      <div className={styles.headerContent}>
        <strong>What's in ear 👂</strong>
        <LoginButton />
      </div>
    </header>
  );
}
