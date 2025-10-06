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

function ReferralCard({
  referral,
  isPriority = false,
}: {
  referral: ReferralItem;
  isPriority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-3">
            {referral.image && (
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border bg-gradient-to-br from-background to-muted p-2 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={referral.image}
                  alt={referral.title}
                  fill
                  className="object-contain"
                  sizes="56px"
                  priority={isPriority}
                  unoptimized
                />
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-col gap-1.5">
                <CardTitle className="line-clamp-1 text-lg leading-tight">
                  {referral.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Tag className="h-3 w-3" />
                    {referral.category}
                  </Badge>
                  {referral.featured && (
                    <TooltipSimple content="Featured referral" side="top">
                      <Badge variant="default" className="gap-1 text-xs">
                        <Gift className="h-3 w-3" />
                        Featured
                      </Badge>
                    </TooltipSimple>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {referral.description || 'Discover this amazing service and get exclusive benefits.'}
          </CardDescription>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            asChild
            variant="default"
            className="w-full transition-all duration-300 group-hover:bg-primary group-hover:shadow-md"
          >
            <Link
              href={referral.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Get Started
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
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
      <div className="container mx-auto space-y-8 p-4 pt-6 md:pt-4">
        {/* Header */}
        <div className="flex flex-col items-start gap-3">
          <h1 className="font-bold text-3xl leading-tight tracking-tighter md:text-4xl">
            Referrals
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            Discover my favorite products and services. Use these links to get exclusive benefits!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="-translate-y-1/2 absolute top-1/2 left-4 h-5 w-5 text-muted-foreground transition-colors" />
          <input
            type="text"
            placeholder="Search by name, category, or description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={cn(
              'w-full rounded-2xl border bg-background py-3.5 pr-4 pl-12 text-sm shadow-sm',
              'ring-offset-background transition-all duration-200 placeholder:text-muted-foreground',
              'focus-visible:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'hover:border-primary/50'
            )}
          />
        </div>

        {/* Filters */}
        <div className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          <div className="flex min-w-max items-center gap-2 md:min-w-0 md:flex-wrap">
            {/* Featured Filter - Prioritized */}
            <Button
              variant={showOnlyFeatured ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
              className="flex-shrink-0 gap-1.5 transition-all duration-300"
            >
              <Star className={cn('h-3.5 w-3.5', showOnlyFeatured && 'fill-current')} />
              Featured ({featuredCount})
            </Button>

            {/* Category Filter */}
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex-shrink-0 capitalize transition-all duration-300"
              >
                {category} (
                {category === 'all'
                  ? referrals.length
                  : referrals.filter(r => r.category === category).length}
                )
              </Button>
            ))}
          </div>
        </div>

        {/* Referrals Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {sortedReferrals.length > 0 ? (
              sortedReferrals.map((referral, index) => (
                <ReferralCard key={referral.slug} referral={referral} isPriority={index < 6} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 py-16 text-center"
              >
                <div className="mb-4 rounded-full bg-muted p-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 font-semibold text-xl">No referrals found</h3>
                <p className="mb-4 max-w-sm text-muted-foreground text-sm">
                  Try adjusting your search or filter criteria to find what you're looking for
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setShowOnlyFeatured(false);
                  }}
                  className="gap-2"
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
