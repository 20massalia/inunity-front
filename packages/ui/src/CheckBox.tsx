import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type CheckBoxProps = {
  checked: boolean;
  setChecked: (updator: boolean) => void;
};

export function CheckBox({ checked, setChecked }: CheckBoxProps) {
  return (
    <div
      onClick={() => setChecked(!checked)}
      className={`w-5 h-5 flex justify-center items-center ${
        checked ? "bg-primary" : "bg-unselected"
      }`}
    >
      {checked && <FontAwesomeIcon color="white" icon={faCheck} />}
    </div>
  );
}
