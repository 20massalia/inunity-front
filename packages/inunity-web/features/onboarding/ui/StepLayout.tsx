"use client";
import { Typography } from "ui";
import FadeInOutStep from "./steps/FadeInOutStep";

export default function StepLayout({
  title,
  description,
  children,
  footer,
  shown = true,
  onExit,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  shown?: boolean;
  onExit?: () => void;
}) {
  return (
    <FadeInOutStep shown={shown} onExit={onExit}>
      <div className="flex flex-col gap-3">
        <Typography variant="HeadingLargeBold" className="mb-4">
          {title}
        </Typography>
        <Typography className="text-sm mb-6">{description}</Typography>
        {children}
        {footer && (
          <div className="mt-auto mb-5 flex flex-col gap-4">{footer}</div>
        )}
      </div>
    </FadeInOutStep>
  );
}
