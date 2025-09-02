// features/onboarding/ui/patterns/FormStep.tsx
"use client";
import { useForm, Controller } from "react-hook-form";
import StepLayout from "@/features/onboarding/ui/StepLayout";
import { Input } from "ui";
import ActionBar from "@/features/onboarding/ui/primitives/ActionBar";

type Field =
  | { type: "text"; name: string; label: string; placeholder?: string }
  | { type: "password"; name: string; label: string; placeholder?: string };

export default function FormStep<TValues extends Record<string, any>>({
  title,
  description,
  fields,
  defaultValues,
  onSubmit,
  submitting,
  shown = true,
  onBack,
}: {
  title: string;
  description?: React.ReactNode;
  fields: Field[];
  defaultValues?: Partial<TValues>;
  onSubmit: (values: TValues) => void;
  submitting?: boolean;
  shown?: boolean;
  onBack?: () => void;
}) {
  const { handleSubmit, control } = useForm<TValues>({
    defaultValues: defaultValues as any,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      <StepLayout
        title={title}
        description={description}
        shown={shown}
        footer={
          <ActionBar
            primaryText={submitting ? "처리 중…" : "계속하기"}
            onPrimary={handleSubmit(onSubmit as any)}
            disabled={submitting}
            secondaryText={onBack ? "이전" : undefined}
            onSecondary={onBack}
          />
        }
      >
        <div className="flex flex-col gap-4">
          {fields.map((f) => (
            <Controller
              key={f.name}
              name={f.name as any}
              control={control}
              render={({ field }: { field: any }) => (
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{f.label}</span>
                  <Input
                    ref={field.ref}
                    value={(field.value ?? "") as string}
                    setValue={field.onChange}
                    placeholder={f.placeholder}
                    {...(f.type === "password"
                      ? { masked: true }
                      : { type: f.type })}
                  />
                </div>
              )}
            />
          ))}
        </div>
      </StepLayout>
    </form>
  );
}
