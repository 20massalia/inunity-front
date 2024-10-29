import React from 'react';
import Typography from './Typography';

interface ButtonProps {
  variant?: 'primary' | 'disabled';
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
  };
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <div onClick={variant !== 'disabled' ? onClick : undefined} className={classes}>
      <Typography variant='body' className="text-center text-white text-xl font-semibold  leading-9">{children}</Typography>

    </div>
  );
};