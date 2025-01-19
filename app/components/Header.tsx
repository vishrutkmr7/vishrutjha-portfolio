'use client';

import * as React from 'react';

import { Home, Map, FolderGit2, Image as ImageIcon, FileDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    return cn(
      'text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-md',
      pathname === href ? 'text-primary bg-primary/10' : 'text-muted-foreground'
    );
  };

  const getMobileLinkClass = (href: string) => {
    return cn(
      'flex flex-col items-center justify-center transition-colors hover:text-primary w-full',
      pathname === href ? 'text-primary' : 'text-muted-foreground'
    );
  };

  const ResumeButton = React.forwardRef<HTMLAnchorElement>((props, ref) => (
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
  ));
  ResumeButton.displayName = 'ResumeButton';

  return (
    <>
      <div className="pb-16 md:pb-0">
        {/* Mobile buttons */}
        <div className="md:hidden fixed top-3 right-3 z-50 flex items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg border p-1.5">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10" asChild>
            <ResumeButton />
          </Button>
          <ThemeToggle />
        </div>

        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block hidden">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <nav className="flex items-center space-x-2 text-sm font-medium">
                <Link href="/" className={getLinkClass('/')}>
                  <span className="flex items-center gap-2">
                    <Home className="h-4 w-4" aria-hidden="true" />
                    Home
                  </span>
                </Link>
                <Link href="/journey" className={getLinkClass('/journey')}>
                  <span className="flex items-center gap-2">
                    <Map className="h-4 w-4" aria-hidden="true" />
                    Journey
                  </span>
                </Link>
                <Link href="/projects" className={getLinkClass('/projects')}>
                  <span className="flex items-center gap-2">
                    <FolderGit2 className="h-4 w-4" aria-hidden="true" />
                    Projects
                  </span>
                </Link>
                <Link href="/media" className={getLinkClass('/media')}>
                  <span className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" aria-hidden="true" />
                    Media
                  </span>
                </Link>
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

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-50">
        <nav className="flex justify-between px-3 py-2 max-w-md mx-auto w-full">
          <Link href="/" className={getMobileLinkClass('/')}>
            <Home className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] mt-0.5">Home</span>
          </Link>
          <Link href="/journey" className={getMobileLinkClass('/journey')}>
            <Map className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] mt-0.5">Journey</span>
          </Link>
          <Link href="/projects" className={getMobileLinkClass('/projects')}>
            <FolderGit2 className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] mt-0.5">Projects</span>
          </Link>
          <Link href="/media" className={getMobileLinkClass('/media')}>
            <ImageIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] mt-0.5">Media</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
