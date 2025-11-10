'use client';

import dynamic from 'next/dynamic';

// Lazy load Chat component - not needed for initial render, improves FCP/LCP
const Chat = dynamic(() => import('./Chat'), {
  ssr: false,
  loading: () => null,
});

export default Chat;
