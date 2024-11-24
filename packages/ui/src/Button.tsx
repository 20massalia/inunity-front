import React from 'react';
import { Typography } from './Typography';


interface ButtonProps {
  variant?: 'primary' | 'disabled' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
}) => {
  const baseClasses = 'px-2.5 py-1  rounded-xl justify-center items-center gap-2.5 inline-flex';
  const variantClasses = {
    primary: 'bg-primary/80 hover:bg-primary/60 text-white',
    disabled: 'bg-disabled-bg text-disabled-text',
    danger: 'bg-danger'
  };
  const sizeClasses = {
    small: 'py-1 px-2 text-p-no font-bold',
    medium: 'py-2 px-4 text-xl font-semibold leading-9 rounded-md',
    large: 'px-3 py-1 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <div onClick={variant !== 'disabled' ? onClick : undefined} className={classes}>
      <span  className="text-center text-white  ">{children}</span>

    </div>
  );
};