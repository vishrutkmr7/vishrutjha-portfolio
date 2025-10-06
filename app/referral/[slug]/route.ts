import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

import type { ReferralItem } from '@/app/types/portfolio.types';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    // Read referrals.json directly for faster redirect (no metadata fetching needed)
    const filePath = path.join(process.cwd(), 'public', 'data', 'referrals.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const referrals = JSON.parse(fileContent) as ReferralItem[];

    const referral = referrals.find(r => r.slug === slug);

    if (referral) {
      // Use NextResponse.redirect for Route Handlers with 307 (temporary redirect)
      return NextResponse.redirect(referral.url, { status: 307 });
    }

    // If referral not found, redirect to referrals page
    return NextResponse.redirect(new URL('/referrals', request.url));
  } catch (error) {
    console.error('Error processing referral redirect:', error);
    return NextResponse.redirect(new URL('/referrals', request.url));
  }
}
