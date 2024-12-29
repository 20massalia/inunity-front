import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Typography } from "./Typography";

export type SimpleListItemType = "button" | "toggle" | "text";
export type SimpleListItemProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text: string;
  onClick?: () => void;
  type?: SimpleListItemType;
};
export function SimpleListItem({
  rightIcon,
  leftIcon,
  text,
  onClick,
  type = "button",
}: SimpleListItemProps) {
  return (
    <div className="justify-between items-center flex flex-row flex-1" onClick={onClick}>
      <div className="flex flex-row gap-3">
        <div className="w-5 h-5 relative">{leftIcon}</div>
        <Typography variant="ParagraphLargeBold">{text}</Typography>
      </div>
      <div>
        {type == "button" ? (
          <FontAwesomeIcon icon={faChevronRight} />
        ) : (
          rightIcon
        )}
      </div>
    </div>
  );
}
