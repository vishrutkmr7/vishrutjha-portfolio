'use client';

import { usePathname } from 'next/navigation';

import RouteJsonLd from './RouteJsonLd';

export default function ClientRouteJsonLd() {
  const pathname = usePathname();

  return <RouteJsonLd pathname={pathname} />;
}
