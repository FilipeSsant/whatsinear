import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.linkContainer}>
        <FaLinkedin size={24} />
        <a href="https://www.linkedin.com/in/filipe-da-silva-santos/">
          Filipe Santos | Front End Developer
        </a>
      </div>
      <div className={styles.linkContainer}>
        <FaGithub size={24} />
        <a href="https://www.linkedin.com/in/filipe-da-silva-santos/">
          Project Repository
        </a>
      </div>
    </footer>
  );
}
