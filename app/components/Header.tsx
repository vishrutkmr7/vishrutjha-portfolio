'use client';

import { FileDown, FolderGit2, Home, Image as ImageIcon, Map as MapIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useMemo } from 'react';

import { ThemeToggle } from '@/app/components/theme-toggle';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/app/lib/utils';

// Memoized navigation items to prevent recreation on every render
const navigationItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/journey', icon: MapIcon, label: 'Journey' },
  { href: '/projects', icon: FolderGit2, label: 'Projects' },
  { href: '/media', icon: ImageIcon, label: 'Media' },
] as const;

// Memoized resume button component
const ResumeButton = React.memo(
  React.forwardRef<HTMLAnchorElement>((props, ref) => (
    <a
      {...props}
      ref={ref}
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      download
      className="inline-flex items-center justify-center"
      aria-expanded={false}
    >
      <FileDown className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">Download Resume</span>
    </a>
  ))
);
ResumeButton.displayName = 'ResumeButton';

// Memoized navigation link component
const NavigationLink = React.memo(
  ({
    href,
    icon: Icon,
    label,
    isActive,
    isMobile = false,
  }: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    isActive: boolean;
    isMobile?: boolean;
  }) => {
    const linkClass = useMemo(() => {
      if (isMobile) {
        return cn(
          'flex flex-col items-center justify-center transition-colors hover:text-primary w-full',
          isActive ? 'text-primary' : 'text-muted-foreground'
        );
      }
      return cn(
        'text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-2xl',
        isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground'
      );
    }, [isActive, isMobile]);

    if (isMobile) {
      return (
        <Link href={href} className={linkClass}>
          <Icon className="h-5 w-5" aria-hidden="true" />
          <span className="mt-0.5 text-[10px]">{label}</span>
        </Link>
      );
    }

    return (
      <Link href={href} className={linkClass}>
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </span>
      </Link>
    );
  }
);
NavigationLink.displayName = 'NavigationLink';

const Header: React.FC = () => {
  const pathname = usePathname();

  // Memoize the navigation items with active state
  const navigationWithActiveState = useMemo(
    () =>
      navigationItems.map(item => ({
        ...item,
        isActive: pathname === item.href,
      })),
    [pathname]
  );

  return (
    <>
      <div className="pb-0">
        {/* Mobile buttons - iOS 26 Liquid Glass */}
        <div className="floating-layer fixed top-3 right-3 z-50 flex items-center gap-2 rounded-2xl border bg-background/70 p-1.5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 md:hidden">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10" asChild>
            <ResumeButton />
          </Button>
          <ThemeToggle />
        </div>

        <header className="floating-layer fixed top-0 right-0 left-0 z-50 hidden w-full border-b bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 md:block">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <nav className="flex items-center space-x-2 font-medium text-sm">
                {navigationWithActiveState.map(({ href, icon, label, isActive }) => (
                  <NavigationLink
                    key={href}
                    href={href}
                    icon={icon}
                    label={label}
                    isActive={isActive}
                  />
                ))}
              </nav>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <nav className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10" asChild>
                  <ResumeButton />
                </Button>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Bottom Navigation Bar - iOS 26 Liquid Glass with safe area */}
      <div
        className="floating-layer fixed right-0 bottom-0 left-0 z-50 border-t bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 md:hidden"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <nav className="mx-auto flex w-full max-w-md justify-between px-3 py-2">
          {navigationWithActiveState.map(({ href, icon, label, isActive }) => (
            <NavigationLink
              key={href}
              href={href}
              icon={icon}
              label={label}
              isActive={isActive}
              isMobile={true}
            />
          ))}
        </nav>
      </div>
    </>
  );
};

export default React.memo(Header);
