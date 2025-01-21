'use client';

import { usePathname } from 'next/navigation';

import { DOMAIN } from '@/app/constants';

export default function RouteJsonLd() {
  const pathname = usePathname();

  const getRouteSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${DOMAIN}${pathname}#profilepage`,
      url: `${DOMAIN}${pathname}`,
      isPartOf: {
        '@id': `${DOMAIN}/#website`,
      },
      mainEntity: {
        '@id': `${DOMAIN}/#person`,
      },
    };

    switch (pathname) {
      case '/media':
        return {
          ...baseSchema,
          name: "Vishrut Jha's Media Appearances",
          description: 'Media appearances, articles, and publications by Vishrut Jha',
        };
      case '/journey':
        return {
          ...baseSchema,
          name: "Vishrut Jha's Professional Journey",
          description: 'Professional experience and career milestones of Vishrut Jha',
        };
      case '/projects':
        return {
          ...baseSchema,
          name: "Vishrut Jha's Projects",
          description: 'Portfolio of projects and applications developed by Vishrut Jha',
        };
      default:
        return null;
    }
  };

  const schema = getRouteSchema();
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
