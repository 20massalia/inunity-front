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
    <div
      className={`flex bg-white w-full  text-black  border-b border-b-divider`}
    >
      <div className="px-4 py-3 flex flex-1 flex-col justify-between">
        <div className="flex flex-row justify-between items-center">
          <div className="relative">
            <div className="absolute h-full flex items-center">{leftIcon}</div>
          </div>
          <div className="relative">
            <div className="flex flex-col justify-center items-center">
              {center}
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-3 absolute right-0 h-full items-center">
              {rightIcon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}