import { ReactNode, useState } from "react";
import { Button, Input, Typography } from "ui";
import FadeInOutStep from "./FadeInOutStep";

interface InputField {
  name: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

interface InputFormProps {
  title: ReactNode;
  inputFields: InputField[];
  onSubmit: () => void;
  extraContent?: ReactNode; // 추가된 extraContent 속성
}

export default function InputForm({
  title,
  inputFields,
  onSubmit,
  extraContent,
}: InputFormProps) {
  const [shown, setShown] = useState(true);
  return (
    <FadeInOutStep shown={shown} onExit={onSubmit}>
      <div className="flex flex-col gap-3">
        <Typography variant="HeadingLargeBold" className="mb-4">
          {title}
        </Typography>
        {inputFields.map((field) => (
          <Input
            key={field.name}
            placeholder={field.placeholder}
            value={field.value}
            setValue={field.setValue}
            className="mt-4"
          />
        ))}
        {extraContent && <div className="mt-4">{extraContent}</div>}
      </div>
      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={() => setShown(false)}>
          계속하기
        </Button>
      </div>
    </FadeInOutStep>
  );
}
