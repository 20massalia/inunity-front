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
    <div className="mt-auto flex flex-col gap-4">
      {primaryText && onPrimary && (
        <Button variant="primary" onClick={onPrimary}>
          {primaryText}
        </Button>
      )}
      {secondaryText && onSecondary && (
        <button
          type="button"
          onClick={onSecondary}
          className="w-full mt-3 text-center text-sm text-gray-600"
        >
          {secondaryText}
        </button>
      )}
    </div>
  );
}
