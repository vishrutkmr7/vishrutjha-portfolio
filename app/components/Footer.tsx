"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { socialIconMap } from "@/app/lib/icons";

const Footer = () => {
  return (
    <footer className="bg-background border-t mb-[60px] md:mb-0">
      <div className="container flex flex-col items-center py-4 space-y-3 md:space-y-0 md:py-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <div className="text-xs md:text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Vishrut Jha. </span>
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
              <socialIconMap.GitHub className="h-4 w-4" />
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
