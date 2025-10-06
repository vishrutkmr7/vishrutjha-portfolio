import { fetchReferralsData } from '@/app/lib/data-fetcher';

import ReferralsContent from './ReferralsContent';

// Server component for data fetching
export default async function ReferralsPage() {
  const referrals = await fetchReferralsData();

  return <ReferralsContent referrals={referrals} />;
}
