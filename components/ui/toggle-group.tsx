'use client';

import * as React from 'react';
import ToggleGroupRoot from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { toggleVariants } from '@/components/ui/toggle';

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: 'default',
  variant: 'default',
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupRoot>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupRoot> &
    VariantProps<typeof toggleVariants> &
    { className?: string }
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupRoot
    ref={ref}
    className={cn('flex items-center justify-center gap-1', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupRoot>
));

ToggleGroup.displayName = ToggleGroupRoot.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupRoot.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupRoot.Item> &
    VariantProps<typeof toggleVariants> &
    { className?: string }
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupRoot.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupRoot.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupRoot.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
