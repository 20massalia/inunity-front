    import React  from 'react';

    export interface InputProps {
        value: string;
        setValue: (value: string) => void;
        leftIcon?: React.ReactNode;
        rightIcon?: React.ReactNode;
    }

    const Input: React.FC<InputProps> = ({ value, setValue, leftIcon, rightIcon }) => {
        return (
            <div className="p-4  absolute bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex">
                {leftIcon && <div className="w-6 h-6 relative">{leftIcon}</div>}
                <input 
                    className="grow shrink basis-0 text-black/50 bg-transparent text-[17px] font-normal font-['Inter'] leading-6 focus:outline-none" 
                    placeholder="포탈 비밀번호" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                />
                {rightIcon && <div className="w-5 h-5 relative">{rightIcon}</div>}
            </div>
        );
    };

    export default Input;