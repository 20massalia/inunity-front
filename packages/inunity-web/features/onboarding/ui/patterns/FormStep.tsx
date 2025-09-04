"use client";

import { Controller, useForm } from "react-hook-form";
import StepLayout from "@/features/onboarding/ui/steps/StepLayout";
import ActionBar from "@/features/onboarding/ui/primitives/ActionBar";
import { Input } from "ui";

type Field =
  | { type: "text"; name: string; label: string; placeholder?: string }
  | { type: "password"; name: string; label: string; placeholder?: string }
  | { type: "email"; name: string; label: string; placeholder?: string }
  | { type: "month"; name: string; label: string; placeholder?: string };

export default function FormStep<TValues extends Record<string, any>>({
  title,
  description,
  fields,
  defaultValues,
  onSubmit,
  submitting,
  shown = true,
  onBack,
  secondaryText,
  onSecondary,
}: {
  title: string;
  description?: React.ReactNode;
  fields: Field[];
  defaultValues?: Partial<TValues>;
  onSubmit: (values: TValues) => void | Promise<void>;
  submitting?: boolean;
  shown?: boolean;
  onBack?: () => void;
  secondaryText?: string;
  onSecondary?: () => void;
}) {
  const { handleSubmit, control } = useForm<TValues>({
    defaultValues: defaultValues as any,
  });

  const finalSecondaryText = secondaryText ?? (onBack ? "이전" : undefined);
  const finalOnSecondary = onSecondary ?? onBack;

  return (
    <StepLayout
      title={title}
      description={description}
      shown={shown}
      footer={
        <ActionBar
          primaryText={submitting ? "처리 중…" : "계속하기"}
          onPrimary={handleSubmit(onSubmit as any)}
          disabled={submitting}
          secondaryText={finalSecondaryText}
          onSecondary={finalOnSecondary}
        />
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit as any)}
        className="flex flex-col gap-4"
      >
        {fields.map((f) => (
          <Controller
            key={f.name}
            name={f.name as any}
            control={control}
            render={({ field }) => (
              <div>
                {f.label ? (
                  <label className="block text-sm mb-2">{f.label}</label>
                ) : null}
                <Input
                  masked={f.type === "password"}
                  type={f.type === "password" ? undefined : f.type}
                  placeholder={f.placeholder}
                  value={field.value ?? ""}
                  setValue={(v) => field.onChange(v)}
                  className="w-full"
                />
              </div>
            )}
          />
        ))}
      </form>
    </StepLayout>
  );
}
