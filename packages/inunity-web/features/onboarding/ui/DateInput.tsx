interface DateInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  setValue,
  className = "",
}) => {
  return (
    <div
      className={`p-4 py-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex ${className}`}
    >
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="grow shrink basis-0 text-black/50 bg-transparent text-[17px] font-normal leading-6 focus:outline-none"
      />
    </div>
  );
};
