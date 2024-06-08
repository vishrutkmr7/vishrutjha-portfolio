import Image from "next/image";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import HomePage from "../app/components/home";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Analytics />
      <SpeedInsights />
      <HomePage />
    </main>
  );
}
