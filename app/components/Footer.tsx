'use client';

import { Gift } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useMemo } from 'react';

import { socialIconMap } from '@/app/lib/icons';

import { Button } from './ui/button';
import { TooltipSimple } from './ui/tooltip';

// Memoized copyright component
const Copyright = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="text-center text-muted-foreground text-xs md:text-sm">
      <span suppressHydrationWarning>© {currentYear} Vishrut Jha</span>
    </div>
  );
});
Copyright.displayName = 'Copyright';

// Memoized Barcelona component
const BarcelonaSection = memo(() => (
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
));
BarcelonaSection.displayName = 'BarcelonaSection';

// Memoized social links component
const SocialLinks = memo(() => {
  const socialLinks = useMemo(
    () => [
      {
        href: 'https://github.com/vishrutkmr7',
        icon: socialIconMap.github,
        label: 'GitHub',
        external: true,
      },
      {
        href: 'https://linkedin.com/in/vishrutjha',
        icon: socialIconMap.LinkedIn,
        label: 'LinkedIn',
        external: true,
      },
      {
        href: 'https://twitter.com/vishrutkmr7',
        icon: socialIconMap.Twitter,
        label: 'Twitter',
        external: true,
      },
      {
        href: 'https://www.instagram.com/vishrutkmr7',
        icon: socialIconMap.Instagram,
        label: 'Instagram',
        external: true,
      },
      {
        href: 'mailto:i@vishrut.co',
        icon: socialIconMap.email,
        label: 'Email',
        external: false,
      },
      {
        href: '/referrals',
        icon: Gift,
        label: 'Referrals',
        external: false,
      },
    ],
    []
  );

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map(({ href, icon: Icon, label, external }) => (
        <TooltipSimple key={label} content={label} side="top">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 text-muted-foreground hover:text-primary"
          >
            <Link
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={`Visit ${label}`}
            >
              <Icon className="h-4 w-4" />
            </Link>
          </Button>
        </TooltipSimple>
      ))}
    </div>
  );
});
SocialLinks.displayName = 'SocialLinks';

const Footer = memo(() => {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center space-y-3 py-4 pb-[72px] md:space-y-4 md:py-6 md:pb-6">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <Copyright />
          <BarcelonaSection />
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
});
Footer.displayName = 'Footer';

export default Footer;
