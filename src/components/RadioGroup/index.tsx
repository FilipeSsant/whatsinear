import { useState } from "react";
import { RadioButton } from "../RadioButton";
import styles from "./styles.module.scss";

type Option = {
  label: string;
  value: string;
  selected?: boolean;
};

interface RadioGroupProps {
  values: Option[];
  onRadioChange?: (selectedRadio: Option) => void;
}

export function RadioGroup({ values, onRadioChange }: RadioGroupProps) {
  const [options, setOptions] = useState<Option[]>(values);

  const handleRadioButton = (selectedRadioValue: string) => {
    setOptions((prevState) =>
      prevState.map((prevStateOption) => {
        if (prevStateOption.value === selectedRadioValue) {
          if (!prevStateOption.selected) {
            prevStateOption.selected = true;
            onRadioChange && onRadioChange(prevStateOption);
          }
        } else {
          prevStateOption.selected = false;
        }
        return prevStateOption;
      })
    );
  };

  return (
    <div className={styles.radioGroup}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          title={option.label}
          selected={option.selected}
          onClick={(value) => handleRadioButton(value)}
        />
      ))}
    </div>
  );
}
