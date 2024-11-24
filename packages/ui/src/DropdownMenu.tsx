"use client";
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useMenu } from "./contexts/MenuContext";

export function DropdownMenu({
  menuId,
  actions,
  scrollContainerRef,
}: {
  menuId: string;
  actions: { label: string; icon?: React.ReactNode; onClick: () => void }[];
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}) {
  const { openMenuId, setOpenMenuId } = useMenu();
  const [menuPosition, setMenuPosition] = useState<"bottom" | "top">("bottom");
  const menuTriggerRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const isMenuOpen = openMenuId === menuId;

  const calculateMenuPosition = () => {
    if (!menuTriggerRef.current) return;

    const triggerRect = menuTriggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const menuHeight = actions.length * 38; // Approximate menu height

    // Determine menu position based on available space
    if (spaceBelow >= menuHeight) {
      setMenuPosition("bottom");
    } else if (spaceAbove >= menuHeight) {
      setMenuPosition("top");
    } else {
      // If no good space, default to bottom
      setMenuPosition("bottom");
    }
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(isMenuOpen ? null : menuId);
    calculateMenuPosition();
  };

  const handleActionClick = (
    action: { onClick: () => void },
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    action.onClick();
    setOpenMenuId(null);
  };

  // Prevent scroll on external container when menu is open
  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current ?? document;

    const preventScroll = (e: Event) => {
      if (isMenuOpen) {
        e.preventDefault();
      }
    };

    if (isMenuOpen && scrollContainer) {
      scrollContainer.addEventListener("touchmove", preventScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("touchmove", preventScroll);
      }
    };
  }, [isMenuOpen, scrollContainerRef]);

  return (
    <div
      ref={menuTriggerRef}
      data-menu-id={menuId}
      className="w-6 h-6 relative flex justify-end"
      onClick={toggleMenu}
    >
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        fontSize={24}
        color="#7E7E7E"
      />
      {isMenuOpen && actions && actions.length > 0 && (
        <div
          ref={menuContainerRef}
          className={`absolute right-0 w-48 bg-[rgba(250,250,250,1)] rounded-xl shadow-2xl z-10`}
          style={{
            ...(menuPosition === "bottom"
              ? { top: "100%", marginTop: "0.5rem" }
              : { bottom: "100%", marginBottom: "0.5rem" }),
          }}
        >
          {actions.map((action, index) => (
            <button
              key={index}
              className={`block w-full text-left px-4 py-2 text-sm border-b 
                [&:not(:last-child)]:border-b-[#EFF3F4] 
                hover:bg-[rgba(226,226,226)] 
                last:rounded-b-xl first:rounded-t-xl`}
              onClick={(e) => handleActionClick(action, e)}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
