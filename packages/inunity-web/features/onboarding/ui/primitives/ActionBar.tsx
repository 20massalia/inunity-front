import { Button } from "ui";

// 하단 버튼을 출력하는 컴포넌트
export default function ActionBar({
  primaryText = "계속하기",
  onPrimary,
  disabled,
  secondaryText,
  onSecondary,
}: {
  primaryText?: string;
  onPrimary: () => void;
  disabled?: boolean;
  secondaryText?: string;
  onSecondary?: () => void;
}) {
  return (
    <div className="flex gap-2">
      {secondaryText && onSecondary && (
        <Button variant="primary" onClick={onSecondary}>
          {secondaryText}
        </Button>
      )}
      {primaryText && onPrimary && (
        <Button variant="primary" onClick={onPrimary}>
          {primaryText}
        </Button>
      )}
    </div>
  );
}
