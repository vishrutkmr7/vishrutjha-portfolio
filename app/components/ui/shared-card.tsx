/** biome-ignore-all assist/source/organizeImports: <no need to organize imports> */
import { useIsMobile } from '@/app/lib/hooks';
import { cn } from '@/app/lib/utils';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { forwardRef, type ReactNode } from 'react';
import { DraggableCard, dragVariants, mobileDragVariants } from '../MotionList';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

// Base interfaces following Interface Segregation Principle
interface BaseCardProps {
  className?: string;
  children?: ReactNode;
  isDraggable?: boolean;
  dragConstraints?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  className?: string;
  unoptimized?: boolean;
}

interface CardHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  date?: string;
  className?: string;
}

interface CardTechBadgesProps {
  tech: string[];
  techIconMap?: Record<string, React.ComponentType<{ className?: string }>>;
  className?: string;
}

interface CardActionButtonProps {
  text: string;
  url: string;
  icon?: ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  external?: boolean;
}

// Shared Card Image Component (Single Responsibility)
export const SharedCardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt, aspectRatio = 'video', className, unoptimized = false }, ref) => {
    const aspectClasses = {
      square: 'aspect-square',
      video: 'aspect-[16/9]',
      portrait: 'aspect-[3/4]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-t-2xl',
          aspectClasses[aspectRatio],
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          unoptimized={unoptimized}
        />
      </div>
    );
  }
);
SharedCardImage.displayName = 'SharedCardImage';

// Shared Card Header Component (Single Responsibility)
export const SharedCardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, description, icon, date, className }, ref) => (
    <CardHeader ref={ref} className={cn('flex-none space-y-1.5 p-6 pb-2', className)}>
      <CardTitle className="flex items-center gap-2 sm:line-clamp-2 sm:min-h-[2rem]">
        {icon}
        {title}
      </CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
      {date && (
        <CardDescription className="flex items-center gap-2">
          <span className="text-xs">{date}</span>
        </CardDescription>
      )}
    </CardHeader>
  )
);
SharedCardHeader.displayName = 'SharedCardHeader';

// Shared Tech Badges Component (Single Responsibility)
export const SharedTechBadges = forwardRef<HTMLDivElement, CardTechBadgesProps>(
  ({ tech, techIconMap, className }, ref) => (
    <div ref={ref} className={cn('relative', className)}>
      <div className="no-scrollbar mask-fade-right flex gap-2 overflow-x-auto pb-2">
        {tech.map(techName => {
          const TechIcon = techIconMap?.[techName];
          return (
            <Badge
              key={techName}
              variant="secondary"
              className="flex flex-shrink-0 items-center gap-1.5 transition-colors duration-200 hover:bg-primary/10"
            >
              {TechIcon && (
                <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                  <TechIcon className="h-3.5 w-3.5" />
                </span>
              )}
              {techName}
            </Badge>
          );
        })}
      </div>
    </div>
  )
);
SharedTechBadges.displayName = 'SharedTechBadges';

// Shared Action Button Component (Single Responsibility)
export const SharedActionButton = ({
  text,
  url,
  icon,
  variant = 'default',
  className,
  external = true,
}: CardActionButtonProps) => (
  <Button asChild variant={variant} className={cn('w-full', className)}>
    <Link
      href={url}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center justify-center gap-2"
    >
      {icon}
      <span>{text}</span>
      {external && <ExternalLink className="h-4 w-4" />}
    </Link>
  </Button>
);
SharedActionButton.displayName = 'SharedActionButton';

// Base Draggable Card Component following Open/Closed Principle
export const BaseDraggableCard = forwardRef<HTMLDivElement, BaseCardProps>(
  ({ className, children, isDraggable = true, dragConstraints }, ref) => {
    const isMobile = useIsMobile();
    const dragVars = isMobile ? mobileDragVariants : dragVariants;

    if (!isDraggable) {
      return (
        <Card
          ref={ref}
          className={cn('group h-full transition-all duration-300 hover:shadow-lg', className)}
        >
          {children}
        </Card>
      );
    }

    return (
      <DraggableCard
        ref={ref}
        dragConstraints={dragConstraints || { left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        whileDrag="drag"
        whileHover="hover"
        variants={dragVars}
        className={cn('h-full', className)}
      >
        <Card className="group flex h-full flex-col transition-all duration-300 hover:shadow-lg">
          {children}
        </Card>
      </DraggableCard>
    );
  }
);
BaseDraggableCard.displayName = 'BaseDraggableCard';

// Flexible Card Layout Component (Composition over Inheritance)
interface FlexibleCardProps extends BaseCardProps {
  image?: {
    src: string;
    alt: string;
    aspectRatio?: 'square' | 'video' | 'portrait';
    unoptimized?: boolean;
  };
  header: {
    title: string;
    description?: string;
    icon?: ReactNode;
    date?: string;
  };
  content?: ReactNode;
  tech?: string[];
  techIconMap?: Record<string, React.ComponentType<{ className?: string }>>;
  actions?: {
    text: string;
    url: string;
    icon?: ReactNode;
    variant?: 'default' | 'outline' | 'ghost';
  }[];
}

export const FlexibleCard = forwardRef<HTMLDivElement, FlexibleCardProps>(
  (
    {
      className,
      isDraggable = true,
      dragConstraints,
      image,
      header,
      content,
      tech,
      techIconMap,
      actions,
    },
    ref
  ) => (
    <BaseDraggableCard
      ref={ref}
      className={className}
      isDraggable={isDraggable}
      dragConstraints={dragConstraints}
    >
      {image && (
        <div className="flex-none">
          <SharedCardImage
            src={image.src}
            alt={image.alt}
            aspectRatio={image.aspectRatio}
            unoptimized={image.unoptimized}
          />
        </div>
      )}

      <SharedCardHeader
        title={header.title}
        description={header.description}
        icon={header.icon}
        date={header.date}
      />

      {(content || tech) && (
        <CardContent className="flex flex-grow flex-col gap-4 p-6 pt-2">
          {content}
          {tech && tech.length > 0 && <SharedTechBadges tech={tech} techIconMap={techIconMap} />}
        </CardContent>
      )}

      {actions && actions.length > 0 && (
        <CardFooter className="flex-none space-y-2 p-6 pt-0">
          {actions.map(action => (
            <SharedActionButton
              key={`${action.text}-${action.url}`}
              text={action.text}
              url={action.url}
              icon={action.icon}
              variant={action.variant}
            />
          ))}
        </CardFooter>
      )}
    </BaseDraggableCard>
  )
);
FlexibleCard.displayName = 'FlexibleCard';

// Export all components for easy import
export type {
  BaseCardProps,
  CardActionButtonProps,
  CardHeaderProps,
  CardImageProps,
  CardTechBadgesProps,
  FlexibleCardProps,
};
