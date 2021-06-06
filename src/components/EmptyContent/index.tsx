import styles from "./styles.module.scss";

export function EmptyContent() {
  return (
    <section className={styles.container}>
      <img src="/images/searching.svg" alt="Searching" />
      <h3>Oops...</h3>
      <span>We didn't find your content</span>
    </section>
  );
}
