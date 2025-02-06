'use client';

import { DraggableCard, dragVariants } from '@/app/components/MotionList';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/app/components/ui/card';
import { socialIconMap } from '@/app/lib/icons';

export default function ContactCard() {
  return (
    <DraggableCard
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag="drag"
      whileHover="hover"
      variants={dragVariants}
      className="h-full"
    >
      <Card className="flex flex-col h-full group hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex-none pb-2">
          <div className="space-y-1.5">
            <CardTitle className="line-clamp-2 flex items-center gap-2 min-h-[2rem]">
              <socialIconMap.email className="h-5 w-5 flex-shrink-0" />
              Get in Touch
            </CardTitle>
            <CardDescription>
              Let&apos;s connect and build something amazing together!
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button
              asChild
              variant="outline"
              className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <a
                href="https://github.com/vishrutkmr7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <socialIconMap.github className="h-4 w-4 flex-shrink-0" />
                GitHub
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <a
                href="https://linkedin.com/in/vishrutkmr7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <socialIconMap.LinkedIn className="h-4 w-4 flex-shrink-0" />
                LinkedIn
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <a
                href="https://twitter.com/vishrutkmr7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <socialIconMap.Twitter className="h-4 w-4 flex-shrink-0" />
                Twitter
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <a
                href="mailto:i+website@vishrut.co"
                className="flex items-center justify-center gap-2"
              >
                <socialIconMap.email className="h-4 w-4 flex-shrink-0" />
                Email
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </DraggableCard>
  );
}
