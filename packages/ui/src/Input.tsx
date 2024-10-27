import React, { ForwardedRef, PropsWithRef } from 'react';

export interface InputProps {
    value: string;
    setValue: (value: string) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    placeholder?: string;
    masked?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { value, setValue, leftIcon, rightIcon, placeholder = "Input Placeholder", masked } = props;

    return (
        <div className="p-4 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex">
            {leftIcon && <div className="w-6 h-6 relative">{leftIcon}</div>}
            <input
                ref={ref}
                className="grow shrink basis-0 text-black/50 bg-transparent text-[17px] font-normal leading-6 focus:outline-none"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type={!masked ? 'text' : 'password'}
            />
            {rightIcon && <div className="w-5 h-5 relative">{rightIcon}</div>}
        </div>
    );
});

export default Input;