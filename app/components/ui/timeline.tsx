import * as React from 'react';

import { cn } from '@/app/lib/utils';

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative space-y-10 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-border/50',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Timeline.displayName = 'Timeline';

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative pl-10 transition-all duration-200 hover:pl-12', className)}
        {...props}
      >
        <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm transition-transform duration-200 hover:scale-110">
          {icon}
        </div>
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = 'TimelineItem';

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('ml-4', className)} {...props}>
        {children}
      </div>
    );
  }
);
TimelineContent.displayName = 'TimelineContent';

interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('font-semibold leading-none tracking-tight text-foreground', className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
TimelineTitle.displayName = 'TimelineTitle';

interface TimelineTimeProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineTime = React.forwardRef<HTMLDivElement, TimelineTimeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props}>
        {children}
      </div>
    );
  }
);
TimelineTime.displayName = 'TimelineTime';

interface TimelineBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const TimelineBody = React.forwardRef<HTMLParagraphElement, TimelineBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-muted-foreground', className)} {...props}>
        {children}
      </p>
    );
  }
);
TimelineBody.displayName = 'TimelineBody';

export { Timeline, TimelineItem, TimelineContent, TimelineTitle, TimelineTime, TimelineBody };
