"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Typography } from "ui";

export default function NavItem({
  icon,
  label,
  route,
}: {
  icon: IconDefinition;
  label: string;
  route: Route;
}) {
  const pathname = usePathname();

  const color = route == pathname ? "primary" : "[#999999]";
  return (
    <Link href={route} className="flex-1">
      <div
        className={`flex text-unselected flex-col items-center text-${color} gap-1 h-10`}
      >
        <FontAwesomeIcon icon={icon} className={`text-${color}`} />
        <Typography
          variant="ParagraphNormalRegular"
          className={`text-nowrap text-${color}`}
        >
          {label}
        </Typography>
      </div>
    </Link>
  );
}
