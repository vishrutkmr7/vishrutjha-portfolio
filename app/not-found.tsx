'use client';

import { MoveLeft, Unlink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import { Button } from '@/app/components/ui/button';
import { TooltipSimple } from '@/app/components/ui/tooltip';

import styles from './not-found.module.css';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the viewport
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`flex min-h-[80vh] flex-col items-center justify-center bg-background px-4 text-foreground sm:px-6 ${styles.notFound}`}
    >
      <div className="w-full max-w-lg space-y-4 text-center sm:space-y-6">
        {/* Animated 404 Text */}
        <div className="relative flex items-center justify-center gap-2 sm:gap-4">
          <Unlink className="h-10 w-10 animate-pulse text-muted-foreground/80 sm:h-14 sm:w-14 md:h-16 md:w-16" />
          <h1 className="relative font-bold text-6xl sm:text-8xl md:text-9xl">
            <span
              className="inline-block bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent transition-transform duration-200"
              style={{
                transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              }}
            >
              4
            </span>
            <span
              className="inline-block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-transform duration-200"
              style={{
                transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
              }}
            >
              0
            </span>
            <span
              className="inline-block bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent transition-transform duration-200"
              style={{
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              }}
            >
              4
            </span>
          </h1>
        </div>

        {/* Animated Typing Text */}
        <div className="font-medium text-lg text-muted-foreground sm:text-xl md:text-2xl">
          <TypeAnimation
            sequence={[
              'Page not found 😕',
              2000,
              'Lost in space 🚀',
              2000,
              'Nothing to see here 👀',
              2000,
            ]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
            className="font-mono"
          />
        </div>

        {/* Description */}
        <p className="mx-auto max-w-md space-y-1 text-muted-foreground text-sm sm:text-base md:text-lg">
          <span>Look! Schrödinger&rsquo;s page 🐱✨</span>
          <br />
          <span>Instead, let&rsquo;s take a path that definitely exists!</span>
        </p>

        {/* Action Button */}
        <div className="pt-2 sm:pt-4">
          <TooltipSimple content="Back to safety!" side="bottom">
            <Button
              asChild
              size="lg"
              className="w-full gap-2 transition-all duration-300 hover:scale-105 sm:w-auto"
            >
              <Link href="/">
                <MoveLeft className="h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </TooltipSimple>
        </div>
      </div>
    </div>
  );
}
