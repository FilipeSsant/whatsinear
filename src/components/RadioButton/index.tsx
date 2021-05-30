import { Button } from "../Button";
import styles from "../Button/styles.module.scss";

interface RadioButtonProps {
  value: string;
  title: string;
  selected?: boolean;
  onClick?: (value: string) => void;
}

export function RadioButton({
  value,
  title,
  onClick,
  selected,
}: RadioButtonProps) {
  return (
    <Button
      onClick={() => onClick(value)}
      className={selected ? null : styles.unselected}>
      <span>{title}</span>
    </Button>
  );
}
