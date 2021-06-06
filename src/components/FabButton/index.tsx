import { HTMLAttributes } from "react";
import styles from "./styles.module.scss";

export function FabButton({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${styles.fabButton} ${className}`} {...props}>
      {children}
    </button>
  );
}
