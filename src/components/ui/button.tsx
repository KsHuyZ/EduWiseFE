import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { Loader2, LucideIcon } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-600 text-primary-foreground hover:bg-primary/90 text-white',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        error: 'text-destructive-foreground bg-red-500 hover:bg-red-800',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      isLoading,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      size,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          'items-center'
        )}
        disabled={isLoading}
        ref={ref}
        {...props}
      >
        {isLoading === true ? (
          <Loader2
            className={cn(
              'h-4 w-4 animate-spin',
              children !== undefined && 'mr-2'
            )}
          />
        ) : (
          LeftIcon && (
            <div className={cn([size === 'sm' && 'mr-1.5'], [!size && 'mr-2'])}>
              <LeftIcon
                size='1em'
                className={cn([size === 'sm' && 'md:text-md text-sm'])}
              />
            </div>
          )
        )}
        {children}
        {RightIcon && (
          <div className={cn([size === 'sm' && 'mr-1.5'], [!size && 'ml-2'])}>
            <RightIcon
              size='1em'
              className={cn([size === 'sm' && 'md:text-md text-sm'])}
            />
          </div>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
