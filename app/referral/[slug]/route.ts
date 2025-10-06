import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { fetchReferralsData } from '@/app/lib/data-fetcher';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const referrals = await fetchReferralsData();
    const referral = referrals.find(r => r.slug === slug);

    if (referral) {
      // Redirect to the actual referral URL
      redirect(referral.url);
    }

    // If referral not found, redirect to referrals page
    return NextResponse.redirect(new URL('/referrals', _request.url));
  } catch (error) {
    console.error('Error processing referral redirect:', error);
    return NextResponse.redirect(new URL('/referrals', _request.url));
  }
}
