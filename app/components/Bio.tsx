'use client';

import { Briefcase, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

import { socialIconMap } from '@/app/lib/icons';
import { Button } from '@/components/ui/button';

import Highlights from './Highlights';

const Bio = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      {/* Profile Section */}
      <div className="relative w-44 h-44 mb-6">
        <Image
          src="/pfp.png"
          alt="Vishrut Jha"
          fill
          priority
          className="rounded-full object-cover ring-2 ring-primary/20 transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 176px, 176px"
        />
      </div>

      {/* Name and Memoji */}
      <div className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 flex flex-wrap items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
              Vishrut
            </span>
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Jha
            </span>
          </div>
          <Image
            src="/hi.png"
            alt="Memoji"
            width={40}
            height={40}
            className="inline-block animate-wave ml-2 sm:ml-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
        </h1>
        <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium">
          <TypeAnimation
            sequence={[
              'iOS Developer 📱',
              3000,
              'Full-Stack Developer 🚀',
              3000,
              'Software Engineer 💻',
              3000,
              'Founding Engineer ⚡',
              3000,
            ]}
            wrapper="span"
            speed={40}
            repeat={2}
          />
        </div>
      </div>

      {/* Location */}
      <div className="text-base sm:text-lg text-muted-foreground mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-muted/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span>Phoenix</span>
          <span className="text-xl sm:text-2xl transform hover:rotate-12 transition-transform duration-300">
            🌵
          </span>
        </div>
        <span className="text-muted-foreground/60">•</span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span>Arizona, USA</span>
          <span className="text-lg sm:text-xl">🇺🇸</span>
        </div>
      </div>

      {/* Bio Description */}
      <div className="text-lg text-muted-foreground text-center max-w-2xl mb-8 space-y-3">
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <span>Founding Engineer at</span>
          <Button
            variant="link"
            asChild
            className="text-primary font-medium p-0 h-auto text-lg hover:no-underline"
          >
            <Link href="https://pricklypear.io" target="_blank" rel="noopener noreferrer">
              Prickly Pear
            </Link>
          </Button>
        </p>
        {/* <p>Currently building the next generation of healthcare tools</p> */}
        <p className="flex items-center justify-center gap-2">
          Building in Public!
          <span className="inline-block animate-bounce">🚀</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md">
        <Button
          asChild
          variant="default"
          size="lg"
          className="flex-1 hover:bg-primary/90 transition-all duration-300 hover:scale-105"
        >
          <Link href="/journey" className="flex items-center justify-center gap-2">
            <Briefcase className="h-4 w-4" />
            Work Experience
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
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
      </div>

      {/* Social Links */}
      <div className="flex gap-4 mb-10">
        {[
          {
            icon: 'email',
            href: 'mailto:me@vishrutjha.com',
            title: 'me [at] vishrutjha [dot] com',
          },
          { icon: 'Twitter', href: 'https://twitter.com/vishrutkmr7', title: '@vishrutkmr7' },
          { icon: 'github', href: 'https://github.com/vishrutkmr7', title: '@vishrutkmr7' },
          { icon: 'Instagram', href: 'https://instagram.com/vishrutkmr7', title: '@vishrutkmr7' },
          { icon: 'LinkedIn', href: 'https://linkedin.com/in/vishrutkmr7', title: 'Vishrut Jha' },
        ].map(social => {
          const Icon = socialIconMap[social.icon as keyof typeof socialIconMap];
          return (
            <Button
              key={social.icon}
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.title}
                onClick={
                  social.icon === 'email'
                    ? e => {
                        window.location.href = social.href;
                        e.preventDefault();
                      }
                    : undefined
                }
              >
                <Icon className="h-5 w-5" />
              </Link>
            </Button>
          );
        })}
      </div>

      {/* Highlights Section */}
      <Highlights />
    </div>
  );
};

export default Bio;
