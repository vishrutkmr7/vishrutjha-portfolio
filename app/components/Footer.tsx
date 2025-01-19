"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { socialIconMap } from "@/app/lib/icons";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container flex flex-col sm:flex-row justify-between items-center py-6">
        <div className="text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Vishrut Jha™. </span>
          <span>Made with ❤️ using Next.js and Vercel</span>
        </div>
        <div className="flex items-center space-x-4 mt-3 sm:mt-0">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
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
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
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
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
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
