"use client";

import StepLayout from "@/features/onboarding/ui/steps/StepLayout";
import ActionBar from "@/features/onboarding/ui/primitives/ActionBar";

export default function InfoStep({
  title,
  description,
  primaryText,
  onPrimary,
  secondaryText,
  onSecondary,
  shown = true,
}: {
  title: string;
  description?: React.ReactNode;
  primaryText?: string;
  onPrimary?: () => void;
  secondaryText?: string;
  onSecondary?: () => void;
  shown?: boolean;
}) {
  const renderFooter =
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
      footer={renderFooter}
    >
      <div />
    </StepLayout>
  );
}
