'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { socialIconMap } from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { TooltipSimple } from '@/components/ui/tooltip';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container flex flex-col items-center py-4 space-y-3 md:space-y-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
          <div className="text-xs md:text-sm text-muted-foreground text-center">
            <span>© {new Date().getFullYear()} Vishrut Jha</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <TooltipSimple content="Més que un club 🔵🔴" side="top">
              <span className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-help group">
                <span className="text-red-500">❤️</span>
                <Image
                  src="/FC_Barcelona_(crest).svg"
                  alt="FC Barcelona Crest"
                  width={16}
                  height={16}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span>Visca El Barça i Visca Catalunya! 🔵🔴</span>
              </span>
            </TooltipSimple>
            <TooltipSimple content="The 🐐 - Leo Messi" side="top">
              <span className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-help">
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
            className="h-8 w-8 md:h-9 md:w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
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
            className="h-8 w-8 md:h-9 md:w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
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
            className="h-8 w-8 md:h-9 md:w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
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
