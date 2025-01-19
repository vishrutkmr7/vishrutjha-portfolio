import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';

import { techIconMap } from '@/app/lib/icons';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: LucideIcon;
  tech?: string;
}

function Badge({ className, variant, icon: Icon, tech, children, ...props }: BadgeProps) {
  const TechIcon =
    tech && tech in techIconMap ? techIconMap[tech as keyof typeof techIconMap] : null;

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {TechIcon ? <TechIcon className="h-3 w-3" /> : Icon ? <Icon className="h-3 w-3" /> : null}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
