"use client";

import StepLayout from "@/features/onboarding/ui/steps/StepLayout";
import ActionBar from "@/features/onboarding/ui/primitives/ActionBar";

export default function ActionStep({
  title,
  description,
  children,
  primaryText,
  onPrimary,
  secondaryText,
  onSecondary,
  shown = true,
}: React.PropsWithChildren<{
  title: string;
  description?: React.ReactNode;
  primaryText?: string;
  onPrimary?: () => void;
  secondaryText?: string;
  onSecondary?: () => void;
  shown?: boolean;
}>) {
  const footer =
    primaryText || secondaryText ? (
      <ActionBar
        primaryText={primaryText}
        onPrimary={onPrimary ?? (() => {})}
        secondaryText={secondaryText}
        onSecondary={onSecondary}
      />
    ) : null;

  return (
    <StepLayout
      title={title}
      description={description}
      shown={shown}
      footer={footer}
    >
      {children}
    </StepLayout>
  );
}
