import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import React from 'react';

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          ref={ref}
          className={cn(
            icon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

InputWithIcon.displayName = 'InputWithIcon';