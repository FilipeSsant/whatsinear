import styles from "./styles.module.scss";

export function Button({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${styles.buttonContainer} ${className}`} {...props}>
      {children}
    </button>
  );
}
