import { fetchReferralsData } from '@/app/lib/data-fetcher';

import ReferralsContent from './ReferralsContent';

// Enable ISR with revalidation every 24 hours
export const revalidate = 86400; // 24 hours in seconds

// Server component for data fetching
export default async function ReferralsPage() {
  const referrals = await fetchReferralsData();

  return <ReferralsContent referrals={referrals} />;
}
