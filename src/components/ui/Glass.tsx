'use client';

import React, { ElementType, ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type GlassVariant = 'panel' | 'card' | 'pill' | 'button';

export interface GlassBaseProps {
  variant?: GlassVariant;
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export type GlassProps<T extends ElementType = 'div'> = GlassBaseProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof GlassBaseProps | 'as'>;

export function Glass<T extends ElementType = 'div'>({
  as,
  variant = 'panel',
  interactive = false,
  className,
  children,
  style,
  ...restProps
}: GlassProps<T>) {
  const Component = as || 'div';

  const baseStyles = 'relative overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]';

  const variantStyles: Record<GlassVariant, string> = {
    panel: 'rounded-[20px] p-6 sm:p-8',
    card: 'rounded-[20px] p-5 sm:p-6',
    pill: 'rounded-full px-5 py-2.5',
    button: 'rounded-full px-6 py-3 font-medium text-sm tracking-wider uppercase inline-flex items-center justify-center gap-2 cursor-pointer',
  };

  const interactiveStyles = interactive
    ? 'hover:border-[rgba(201,163,107,0.45)] hover:bg-[rgba(255,255,255,0.09)] active:scale-[0.985]'
    : '';

  const mergedStyles: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(201, 163, 107, 0.25)',
    boxShadow:
      'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 20px 0 rgba(201, 163, 107, 0.03), 0 20px 40px -15px rgba(0, 0, 0, 0.5)',
    ...(style as React.CSSProperties),
  };

  const DynamicTag = Component as any;

  return (
    <DynamicTag
      className={twMerge(
        clsx(
          baseStyles,
          variantStyles[variant],
          interactiveStyles,
          className
        )
      )}
      style={mergedStyles}
      {...restProps}
    >
      {/* Subtle top edge brass specular sheen */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent" 
      />
      {children}
    </DynamicTag>
  );
}

export default Glass;
