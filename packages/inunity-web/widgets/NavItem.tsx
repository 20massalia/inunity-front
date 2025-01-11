"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  Typography } from "ui";

export function isCurrentRoute(basePath: string, currentPath: string): boolean {
  // 경로 끝의 '/' 제거
  const normalizedBasePath = basePath.replace(/\/$/, '');
  const normalizedCurrentPath = currentPath.replace(/\/$/, '');

  // 루트 경로('/')에 대한 특별 처리
  if (normalizedBasePath === '' && normalizedCurrentPath !== '') {
    return false;
  }

  // 정확히 일치하거나 서브경로인 경우 true 반환
  return normalizedCurrentPath === normalizedBasePath || 
         normalizedCurrentPath.startsWith(normalizedBasePath + '/');
}

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
  console.log(route, pathname)

  const color = isCurrentRoute(route, pathname)? "primary" : "[#999999]";

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
