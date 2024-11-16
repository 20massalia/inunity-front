import React, { ForwardedRef, HTMLInputTypeAttribute, InputHTMLAttributes, PropsWithRef } from 'react';

export type InputProps =  {
    value: string;
    setValue: (value: string) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    placeholder?: string;
    masked?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { value, setValue, leftIcon, rightIcon, placeholder = "Input Placeholder", masked, className } = props;

    return (
        <div className={`p-4 py-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex ${className}`}>
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

