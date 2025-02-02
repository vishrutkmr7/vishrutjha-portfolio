import Image from 'next/image';

import { cn } from '@/app/lib/utils';

interface TechIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
}

const techIconClasses: Record<string, string> = {
  Python: 'text-[#3776AB]',
  JavaScript: 'text-[#F7DF1E]',
  TypeScript: 'text-[#3178C6]',
  React: 'text-[#61DAFB]',
  NextJS: 'text-[#000000] dark:text-white',
  Swift: 'text-[#F05138]',
  SwiftUI: 'text-[#F05138]',
  Angular: 'text-[#DD0031]',
  CSS: 'text-[#1572B6]',
  HTML: 'text-[#E34F26]',
  Git: 'text-[#F05032]',
  Redis: 'text-[#DC382D]',
  SQL: 'text-[#4479A1]',
  Java: 'text-[#007396]',
  Scala: 'text-[#DC322F]',
  Bun: 'text-[#FBF0DF]',
  Hono: 'text-[#E36002]',
  Vercel: 'text-[#000000] dark:text-white',
  iOS: 'text-[#000000] dark:text-white',
  iPadOS: 'text-[#000000] dark:text-white',
  macOS: 'text-[#000000] dark:text-white',
  'Machine Learning': 'text-[#FF6F61]',
  Selenium: 'text-[#43B02A]',
  LlamaStack: 'text-[#FF9A00]',
};

const techIconEmojis: Record<string, string> = {
  Python: '🐍',
  JavaScript: '💛',
  TypeScript: '💙',
  React: '⚛️',
  NextJS: '▲',
  Swift: '🦅',
  SwiftUI: '🎨',
  Angular: '🅰️',
  CSS: '🎨',
  HTML: '📄',
  Git: '🔄',
  Redis: '🗄️',
  SQL: '🗃️',
  Java: '☕',
  Scala: '🌟',
  Bun: '🐰',
  Hono: '⚡',
  Vercel: '▲',
  iOS: '📱',
  iPadOS: '📱',
  macOS: '🍎',
  'Machine Learning': '🤖',
  Selenium: '🤖',
  LlamaStack: '🦙',
};

export function TechIcon({ name, className, ...props }: TechIconProps) {
  return (
    <span className={cn('inline-flex items-center justify-center', className)} {...props}>
      <Image
        src={`/icons/tech/${name.toLowerCase().replace(/\s+/g, '-')}.svg`}
        alt={`${name} ${techIconEmojis[name] || ''} logo`}
        width={16}
        height={16}
        className={cn(
          'h-4 w-4 transition-transform duration-200 hover:scale-110',
          techIconClasses[name] || 'text-current'
        )}
      />
    </span>
  );
}
