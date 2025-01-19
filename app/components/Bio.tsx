"use client";

import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import Highlights from "./Highlights";
import { Button } from "@/components/ui/button";
import { socialIconMap } from "@/app/lib/icons";
import { Briefcase, Download } from "lucide-react";

const Bio = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      {/* Profile Section */}
      <div className="relative w-36 h-36 mb-8">
        <Image
          src="/pfp.png"
          alt="Vishrut Jha"
          fill
          priority
          className="rounded-full object-cover ring-2 ring-primary/20 transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 144px, 144px"
        />
      </div>

      {/* Name and Memoji */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
          Vishrut Jha
          <Image
            src="/hi.png"
            alt="Memoji"
            width={48}
            height={48}
            className="inline-block animate-wave"
          />
        </h1>
        <div className="text-xl sm:text-2xl text-muted-foreground font-medium">
          <TypeAnimation
            sequence={[
              "iOS Developer",
              2000,
              "Full-Stack Developer",
              2000,
              "Software Engineer",
              2000,
              "Founding Engineer",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
      </div>

      {/* Location */}
      <div className="text-lg text-muted-foreground mb-8 flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full">
        <span>Phoenix, Arizona</span>
        <span className="text-2xl transform hover:rotate-12 transition-transform duration-300">🌵</span>
        <span>USA</span>
        <span className="text-xl">🇺🇸</span>
      </div>

      {/* Bio Description */}
      <div className="text-lg text-muted-foreground text-center max-w-2xl mb-10 space-y-3">
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <span>Founding Engineer at</span>
          <Button
            variant="link"
            asChild
            className="text-primary font-medium p-0 h-auto text-lg hover:no-underline"
          >
            <Link
              href="https://pricklypear.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prickly Pear
            </Link>
          </Button>
        </p>
        <p>Currently building the next generation of healthcare tools</p>
        <p className="flex items-center justify-center gap-2">
          Building in Public!
          <span className="inline-block animate-bounce">🚀</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full max-w-md">
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
      <div className="flex gap-4 mb-12">
        {[
          { icon: "Email", href: "mailto:me@vishrutjha.com", title: "me [at] vishrutjha [dot] com" },
          { icon: "Twitter", href: "https://twitter.com/vishrutkmr7", title: "@vishrutkmr7" },
          { icon: "GitHub", href: "https://github.com/vishrutkmr7", title: "@vishrutkmr7" },
          { icon: "Instagram", href: "https://instagram.com/vishrutkmr7", title: "@vishrutkmr7" },
          { icon: "LinkedIn", href: "https://linkedin.com/in/vishrutkmr7", title: "Vishrut Jha" },
        ].map((social) => {
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
                onClick={social.icon === "Email" ? (e) => {
                  window.location.href = social.href;
                  e.preventDefault();
                } : undefined}
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
