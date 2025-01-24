import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, { InputHTMLAttributes, forwardRef } from 'react';

const inputVariants = cva(
  'rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 bg-transparent border placeholder:text-sm py-2 w-60 h-11'
);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ className }))}
        placeholder={placeholder}
        {...props}
      >
        {children}
      </input>
    );
  }
);
Input.displayName = 'Input';
export default Input;
