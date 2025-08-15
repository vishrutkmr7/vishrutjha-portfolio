'use client';

import { Briefcase, Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { memo, Suspense } from 'react';

import { socialIconMap } from '@/app/lib/icons';

import { Button } from './ui/button';
import { TooltipSimple } from './ui/tooltip';

// Lazy load TypeAnimation component for better performance
const TypeAnimation = dynamic(
  () => import('react-type-animation').then(mod => ({ default: mod.TypeAnimation })),
  {
    ssr: false,
    loading: () => (
      <span className="font-mono text-lg text-muted-foreground sm:text-xl md:text-2xl">
        iOS Developer 📱
      </span>
    ),
  }
);

// Memoized profile image component
const ProfileImage = memo(() => (
  <TooltipSimple content="That's me! 👋" side="bottom">
    <div className="relative mb-6 h-44 w-44 md:mb-2">
      <Image
        src="/pfp.png"
        alt="Vishrut Jha"
        fill
        priority
        quality={90}
        className="rounded-full object-cover ring-2 ring-primary/20 transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 176px, 176px"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
  </TooltipSimple>
));
ProfileImage.displayName = 'ProfileImage';

// Memoized greeting component
const Greeting = memo(() => (
  <div className="mb-4 text-center md:mb-2">
    <h1 className="mb-3 flex flex-wrap items-center justify-center font-bold text-3xl sm:text-4xl md:text-5xl">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
          Vishrut
        </span>
        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Jha
        </span>
      </div>
      <TooltipSimple content="Hi there! 👋" side="right">
        <Image
          src="/hi.png"
          alt="Memoji"
          width={40}
          height={40}
          quality={85}
          className="ml-2 inline-block h-8 w-8 animate-wave sm:ml-3 sm:h-10 sm:w-10 md:h-12 md:w-12"
          loading="eager"
        />
      </TooltipSimple>
    </h1>
    <div className="font-medium text-lg text-muted-foreground sm:text-xl md:text-2xl">
      <Suspense fallback={<span className="font-mono">iOS Developer 📱</span>}>
        <TypeAnimation
          sequence={[
            'iOS Developer 📱',
            3000,
            'Full-Stack Developer 🚀',
            3000,
            'Software Engineer 💻',
            3000,
            'Culér 🔵🔴',
            3000,
            'Founding Engineer ⚡',
            3000,
          ]}
          wrapper="span"
          speed={40}
          repeat={2}
          className="font-mono"
        />
      </Suspense>
    </div>
  </div>
));
Greeting.displayName = 'Greeting';

// Memoized location component
const Location = memo(() => (
  <div className="mb-6 flex items-center justify-center gap-2 text-muted-foreground md:mb-4">
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Location"
    >
      <title>Location</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
    <span className="text-sm">Phoenix, AZ 🇺🇸</span>
  </div>
));
Location.displayName = 'Location';

// Memoized action buttons component
const ActionButtons = memo(() => (
  <div className="mb-8 grid w-full max-w-md gap-4 sm:grid-cols-2 md:mb-5">
    <TooltipSimple content="View my professional journey" side="top">
      <Button
        asChild
        variant="default"
        size="lg"
        className="flex-1 transition-all duration-300 hover:scale-105 hover:bg-primary/90"
      >
        <Link href="/journey" className="flex items-center justify-center gap-2">
          <Briefcase className="h-4 w-4" />
          Work Experience
        </Link>
      </Button>
    </TooltipSimple>
    <TooltipSimple content="Download my résumé" side="top">
      <Button
        asChild
        variant="outline"
        size="lg"
        className="flex-1 transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
      >
        <Link
          href="/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <Download className="h-4 w-4" />
          Résumé
        </Link>
      </Button>
    </TooltipSimple>
  </div>
));
ActionButtons.displayName = 'ActionButtons';

// Memoized social links component
const SocialLinks = memo(() => (
  <div className="mb-8 flex flex-wrap items-center justify-center gap-4 md:mb-5">
    <TooltipSimple content="GitHub" side="top">
      <Link
        href="https://github.com/vishrutkmr7"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-muted p-3 text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
      >
        <socialIconMap.github className="h-5 w-5" />
      </Link>
    </TooltipSimple>
    <TooltipSimple content="LinkedIn" side="top">
      <Link
        href="https://linkedin.com/in/vishrutjha"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-muted p-3 text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
      >
        <socialIconMap.LinkedIn className="h-5 w-5" />
      </Link>
    </TooltipSimple>
    <TooltipSimple content="Twitter" side="top">
      <Link
        href="https://twitter.com/vishrutkmr7"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-muted p-3 text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
      >
        <socialIconMap.Twitter className="h-5 w-5" />
      </Link>
    </TooltipSimple>
    <TooltipSimple content="Instagram" side="top">
      <Link
        href="https://www.instagram.com/vishrutkmr7"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-muted p-3 text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
      >
        <socialIconMap.Instagram className="h-5 w-5" />
      </Link>
    </TooltipSimple>
    <TooltipSimple content="Email" side="top">
      <Link
        href="mailto:i@vishrut.co"
        className="flex items-center justify-center rounded-full bg-muted p-3 text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
      >
        <socialIconMap.email className="h-5 w-5" />
      </Link>
    </TooltipSimple>
  </div>
));
SocialLinks.displayName = 'SocialLinks';

interface BioProps {
  children?: React.ReactNode;
}

const Bio = memo(({ children }: BioProps) => {
  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-8 md:py-0">
      <ProfileImage />
      <Greeting />
      <Location />
      <ActionButtons />
      <SocialLinks />
      {children}
    </div>
  );
});
Bio.displayName = 'Bio';

export default Bio;
