"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const getLinkClass = (href: string) => {
    return cn(
      "text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-md",
      pathname === href
        ? "text-primary bg-primary/10"
        : "text-muted-foreground"
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-2 text-sm font-medium">
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/journey" className={getLinkClass("/journey")}>
              Journey
            </Link>
            <Link href="/projects" className={getLinkClass("/projects")}>
              Projects
            </Link>
            <Link href="/media" className={getLinkClass("/media")}>
              Media
            </Link>
          </nav>
        </div>
        <Button
          className="mr-6 md:hidden"
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden">
            <nav className="flex flex-col p-4 space-y-2">
              <Link
                href="/"
                className={getLinkClass("/")}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/journey"
                className={getLinkClass("/journey")}
                onClick={() => setIsMenuOpen(false)}
              >
                Journey
              </Link>
              <Link
                href="/projects"
                className={getLinkClass("/projects")}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/media"
                className={getLinkClass("/media")}
                onClick={() => setIsMenuOpen(false)}
              >
                Media
              </Link>
            </nav>
          </div>
        )}
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
