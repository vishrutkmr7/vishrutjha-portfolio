import * as React from 'react';

import { cn } from '@/app/lib/utils';

export interface GlassCardBaseProps {
  /**
   * Blur intensity: 'sm' | 'md' | 'lg' | 'xl'
   * @default 'xl'
   */
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Background opacity (0-100)
   * @default 70
   */
  opacity?: number;
  /**
   * Whether to add floating-layer shadow
   * @default true
   */
  withShadow?: boolean;
  /**
   * Whether to add border
   * @default false
   */
  withBorder?: boolean;
  /**
   * Render as a different element
   */
  as?: React.ElementType;
}

export type GlassCardProps = GlassCardBaseProps & React.HTMLAttributes<HTMLDivElement> & Record<string, any>;

/**
 * GlassCard - Reusable glassmorphism/liquid glass component
 *
 * Provides consistent glass effect styling across the application
 * with support for different blur levels, opacities, and shadows.
 *
 * @example
 * ```tsx
 * <GlassCard blur="xl" withBorder>
 *   <p>Content here</p>
 * </GlassCard>
 * ```
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      blur = 'xl' as const,
      opacity = 70,
      withShadow = true,
      withBorder = false,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    const blurClass: Record<string, string> = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl',
    };

    const selectedBlur = blurClass[blur];

    return (
      <Component
        ref={ref}
        className={cn(
          selectedBlur,
          'supports-[backdrop-filter]:bg-background/70',
          withShadow && 'floating-layer',
          withBorder && 'border',
          className
        )}
        style={{
          backgroundColor: `hsl(var(--background) / ${opacity}%)`,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GlassCard.displayName = 'GlassCard';

/**
 * Preset: Glass effect for assistant message bubbles
 */
export interface GlassMessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const GlassMessageBubble = React.forwardRef<HTMLDivElement, GlassMessageBubbleProps & Record<string, any>>(
  ({ className, as: Component = 'div', ...props }, ref) => (
    <Component ref={ref} className={cn('glass-effect floating-layer', className)} {...props} />
  )
);
GlassMessageBubble.displayName = 'GlassMessageBubble';
