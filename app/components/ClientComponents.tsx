"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function ClientComponents() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
