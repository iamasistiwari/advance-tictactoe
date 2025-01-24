import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm transition-colors font-medium disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'text-white bg-[#9f5ebd] hover:opacity-75',
        ghost: 'bg-transparent text-white hover:opacity-75',
      },
      size: {
        default: 'py-3 px-5 h-11',
        lg: 'px-10 py-4 h-11 text-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonsProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean;
}

const Button: FC<ButtonsProps> = ({
  className,
  children,
  variant,
  size,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="2-4 mr-2 h-4 animate-spin" /> : null}
      {children}
    </button>
  );
};
export default Button;
