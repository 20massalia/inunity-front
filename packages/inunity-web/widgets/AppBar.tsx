"use client";

export default function AppBar({
  center,
  leftIcon,
  rightIcon,
}: {
  center?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div className="flex bg-white w-full text-black border-b border-b-divider">
      <div className="w-full px-4 py-3 flex items-center justify-between">
        <div className="w-1/3 flex justify-start">
          {leftIcon}
        </div>
        <div className="w-1/3 flex justify-center">
          {center}
        </div>
        <div className="w-1/3 flex justify-end">
          {rightIcon}
        </div>
      </div>
    </div>
  );
}