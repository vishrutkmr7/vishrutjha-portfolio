import { DOMAIN } from '@/app/constants';

export default function JsonLd() {
  const person = {
    '@type': 'Person',
    '@id': `${DOMAIN}/#person`,
    name: 'Vishrut Jha',
    givenName: 'Vishrut',
    familyName: 'Jha',
    jobTitle: 'iOS & Full-Stack Developer',
    description: 'iOS, Full-Stack Developer and Software Engineer based in Phoenix, AZ',
    url: DOMAIN,
    sameAs: [
      'https://github.com/vishrutkmr7',
      'https://x.com/vishrutkmr7',
      'https://www.linkedin.com/in/vishrutkmr7/',
      'https://www.instagram.com/vishrutkmr7',
    ],
    image: {
      '@type': 'ImageObject',
      url: `${DOMAIN}/pfp.png`,
      width: 1080,
      height: 1080,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Phoenix',
      addressRegion: 'AZ',
      addressCountry: 'US',
    },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': 'WebSite',
        '@id': `${DOMAIN}/#website`,
        url: DOMAIN,
        name: 'Vishrut Jha',
        description: 'Portfolio of Vishrut Jha, an experienced iOS and Full-Stack Developer',
        publisher: {
          '@id': `${DOMAIN}/#person`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${DOMAIN}/#webpage`,
        url: DOMAIN,
        name: 'Vishrut Jha - iOS & Full-Stack Developer',
        description:
          'Portfolio of Vishrut Jha, an experienced iOS and Full-Stack Developer based in Phoenix, AZ.',
        isPartOf: {
          '@id': `${DOMAIN}/#website`,
        },
        about: {
          '@id': `${DOMAIN}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${DOMAIN}/#profilepage`,
        url: DOMAIN,
        name: "Vishrut Jha's Portfolio",
        about: {
          '@id': `${DOMAIN}/#person`,
        },
        isPartOf: {
          '@id': `${DOMAIN}/#website`,
        },
        mainEntity: {
          '@id': `${DOMAIN}/#person`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
