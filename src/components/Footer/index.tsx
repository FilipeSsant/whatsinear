import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.linkContainer}>
        <FaLinkedin size={24} />
        <a
          href="https://www.linkedin.com/in/filipe-da-silva-santos/"
          target="_blank">
          Filipe Santos | Front End Developer
        </a>
      </div>
      <div className={styles.linkContainer}>
        <FaGithub size={24} />
        <a href="hhttps://github.com/FilipeSsant/whatsinear" target="_blank">
          Project Repository
        </a>
      </div>
    </footer>
  );
}
