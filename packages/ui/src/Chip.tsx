import React from "react";
export type ChipProps = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  checkedColor?: string;
  onClick?: () => void;
};
export function Chip({
  checked,
  setChecked,
  checkedColor,
  children,
  onClick
}: React.PropsWithChildren<ChipProps>) {
  const bgColor = checked ? (checkedColor ?? 'var(--color-primary)') : "var(--color-unselected)";
  return (
    <div
      onClick={onClick ?? (() => setChecked(!checked))}
      style={{ backgroundColor: bgColor }}
      className={`px-3 py-2  text-${checked ? 'white' : 'black'} rounded-full`}
    >
      {children}
    </div>
  );
}
