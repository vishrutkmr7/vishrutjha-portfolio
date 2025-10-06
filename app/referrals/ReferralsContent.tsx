'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Gift, Search, Star, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import PageTransition from '@/app/components/PageTransition';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { TooltipSimple } from '@/app/components/ui/tooltip';
import { cn } from '@/app/lib/utils';
import type { ReferralItem } from '@/app/types/portfolio.types';

interface ReferralsContentProps {
  referrals: ReferralItem[];
}

function ReferralCard({ referral }: { referral: ReferralItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="group h-full transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            {referral.image && (
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={referral.image}
                  alt={referral.title}
                  fill
                  className="object-contain p-2"
                  sizes="48px"
                  unoptimized
                />
              </div>
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{referral.title}</CardTitle>
                {referral.featured && (
                  <TooltipSimple content="Featured referral" side="top">
                    <Badge variant="default" className="gap-1 text-xs">
                      <Gift className="h-3 w-3" />
                      Featured
                    </Badge>
                  </TooltipSimple>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1 text-xs">
                  <Tag className="h-3 w-3" />
                  {referral.category}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="leading-relaxed">
            {referral.description || 'Discover this amazing service'}
          </CardDescription>
        </CardContent>
        <CardFooter className="pt-0">
          <Button asChild variant="default" className="w-full">
            <Link
              href={referral.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Get Started
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function ReferralsContent({ referrals }: ReferralsContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(referrals.map(r => r.category));
    return ['all', ...Array.from(cats)];
  }, [referrals]);

  // Get featured count
  const featuredCount = useMemo(() => {
    return referrals.filter(r => r.featured).length;
  }, [referrals]);

  // Filter referrals based on search, category, and featured status
  const filteredReferrals = useMemo(() => {
    return referrals.filter(referral => {
      const matchesSearch =
        referral.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || referral.category === selectedCategory;

      const matchesFeatured = !showOnlyFeatured || referral.featured;

      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [referrals, searchQuery, selectedCategory, showOnlyFeatured]);

  // Sort featured first
  const sortedReferrals = useMemo(() => {
    return [...filteredReferrals].sort((a, b) => {
      if (a.featured && !b.featured) {
        return -1;
      }
      if (!a.featured && b.featured) {
        return 1;
      }
      return 0;
    });
  }, [filteredReferrals]);

  return (
    <PageTransition>
      <div className="container mx-auto space-y-6 p-4 pt-6 md:pt-4">
        {/* Header */}
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-bold text-3xl leading-tight tracking-tighter md:text-4xl">
            Referrals
          </h1>
          <p className="text-muted-foreground">
            Discover my favorite products and services. Use these links to get started!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search referrals..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={cn(
              'w-full rounded-2xl border bg-background py-3 pr-4 pl-10 text-sm shadow-sm',
              'ring-offset-background transition-all duration-200 placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category} (
              {category === 'all'
                ? referrals.length
                : referrals.filter(r => r.category === category).length}
              )
            </Button>
          ))}

          {/* Featured Filter */}
          <Button
            variant={showOnlyFeatured ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
            className="gap-1"
          >
            <Star className={cn('h-4 w-4', showOnlyFeatured && 'fill-current')} />
            Featured ({featuredCount})
          </Button>
        </div>

        {/* Referrals Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {sortedReferrals.length > 0 ? (
              sortedReferrals.map(referral => (
                <ReferralCard key={referral.slug} referral={referral} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-12 text-center"
              >
                <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 font-semibold text-lg">No referrals found</h3>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
