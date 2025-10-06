'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/app/components/ui/card';
import type { Achievement } from '@/app/types/portfolio.types';

export function MediaItem({ title, description, image, link }: Achievement) {
  return (
    <Link href={link?.url || '#'} target="_blank" rel="noopener noreferrer">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-col gap-4 p-4 md:flex-row">
          <div className="relative h-48 w-full flex-shrink-0 md:w-48">
            <Image
              src={`/${image}`}
              alt={title}
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, 192px"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-2 font-semibold text-xl">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
