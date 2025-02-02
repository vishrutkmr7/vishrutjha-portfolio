'use client';

import { useEffect, useState } from 'react';

import { MoveLeft, Unlink } from 'lucide-react';
import Link from 'next/link';
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
      className={`flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground px-4 sm:px-6 ${styles.notFound}`}
    >
      <div className="space-y-4 sm:space-y-6 text-center w-full max-w-lg">
        {/* Animated 404 Text */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 relative">
          <Unlink className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-muted-foreground/80 animate-pulse" />
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold relative">
            <span
              className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent inline-block transition-transform duration-200"
              style={{
                transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              }}
            >
              4
            </span>
            <span
              className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent inline-block transition-transform duration-200"
              style={{
                transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
              }}
            >
              0
            </span>
            <span
              className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent inline-block transition-transform duration-200"
              style={{
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              }}
            >
              4
            </span>
          </h1>
        </div>

        {/* Animated Typing Text */}
        <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium">
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
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto space-y-1">
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
              className="gap-2 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
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
