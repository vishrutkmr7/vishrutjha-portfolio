import { DOMAIN } from '@/app/constants';

interface RouteJsonLdProps {
  pathname: string;
}

export default function RouteJsonLd({ pathname }: RouteJsonLdProps) {
  const getRouteSchema = (pathname: string) => {
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
          name: "Vishrut's Media Appearances",
          description: 'Media appearances, articles, and publications',
        };
      case '/journey':
        return {
          ...baseSchema,
          name: "Vishrut's Professional Journey",
          description: 'Professional experience and career milestones',
        };
      case '/projects':
        return {
          ...baseSchema,
          name: "Vishrut's Projects",
          description: 'Portfolio of projects and applications',
        };
      default:
        return null;
    }
  };

  const schema = getRouteSchema(pathname);
  if (!schema) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
