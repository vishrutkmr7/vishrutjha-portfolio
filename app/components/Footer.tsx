'use client';

import Image from 'next/image';
import Link from 'next/link';

import { socialIconMap } from '@/app/lib/icons';

import { Button } from './ui/button';
import { TooltipSimple } from './ui/tooltip';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center space-y-3 py-4 pb-[72px] md:space-y-4 md:py-6 md:pb-6">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <div className="text-center text-muted-foreground text-xs md:text-sm">
            <span>© {new Date().getFullYear()} Vishrut Jha</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <TooltipSimple content="Més que un Club 🔵🔴" side="top">
              <span className="group flex cursor-help items-center gap-1.5 text-muted-foreground text-xs transition-colors duration-200 hover:text-primary md:text-sm">
                <span className="text-red-500">❤️</span>
                <Image
                  src="/FC_Barcelona_(crest).svg"
                  alt="FC Barcelona Crest"
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                <span>Visca El Barça i Visca Catalunya! 🔵🔴</span>
              </span>
            </TooltipSimple>
            <TooltipSimple content="The 🐐 - Leo Messi" side="top">
              <span className="cursor-help text-muted-foreground text-xs transition-colors duration-200 hover:text-primary md:text-sm">
                𝕄¹⁰
              </span>
            </TooltipSimple>
          </div>
        </div>
        <div className="flex items-center space-x-3 md:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary md:h-9 md:w-9"
          >
            <Link href="https://github.com/vishrutkmr7">
              <socialIconMap.github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary md:h-9 md:w-9"
          >
            <Link href="https://linkedin.com/in/vishrutkmr7">
              <socialIconMap.LinkedIn className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary md:h-9 md:w-9"
          >
            <Link href="https://x.com/vishrutkmr7">
              <socialIconMap.Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
