"use client";
import { Typography } from "ui";
import FadeInOutStep from "./FadeInOutStep";

const renderWithBreaks = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line}
    </span>
  ));

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
      <div className="h-full flex flex-col gap-3">
        <Typography variant="HeadingLargeBold" className="mb-4">
          {renderWithBreaks(title)}
        </Typography>
        <Typography className="text-sm mb-6">{description}</Typography>
        {children}
        {footer && (
          <div className="sticky bottom-0 mt-auto flex flex-col gap-4">
            {footer}
          </div>
        )}
      </div>
    </FadeInOutStep>
  );
}
