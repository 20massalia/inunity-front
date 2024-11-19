import React from "react";

export type MenuActionType = {
  label: string;
    icon?: React.ReactNode;
    onClick: () => void;
};

export type MenuProps = {
  actions: MenuActionType[];
  onToggleMenu: () => void;
};

export function Menu({actions, onToggleMenu}: MenuProps) {
  return <div className={`absolute right-0  mt-2 w-48 bg-[rgba(250,250,250,1)] rounded-xl shadow-2xl z-10`} style={{bottom: actions.length * -38}}>
  {actions.map((action, index) => (
    <button
      key={index}
      className={`block w-full text-left px-4 py-2 text-sm border-b [&:not(:last-child)]:border-b-[#EFF3F4] hover:bg-[rgba(226,226,226)] last:rounded-b-xl first:rounded-t-xl`}
      onClick={(e) => {
        e.stopPropagation();
        action.onClick();
        onToggleMenu();
      }}
    >
      {action.icon && <span className="mr-2">{action.icon}</span>}
      {action.label}
    </button>
  ))}
</div>
}