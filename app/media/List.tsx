'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/app/components/ui/card';
import type { Achievement } from '@/app/types/portfolio.types';

export function MediaItem({ title, description, image, link }: Achievement) {
  return (
    <Link href={link?.url || '#'} target="_blank" rel="noopener noreferrer">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="relative w-full md:w-48 h-48 flex-shrink-0">
            <Image
              src={`/${image}`}
              alt={title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 192px"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
