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

  const schema = getRouteSchema(pathname);
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
