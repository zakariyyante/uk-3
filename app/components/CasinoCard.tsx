'use client';

import { Casino } from '../data/casinos';
import { Star } from 'lucide-react';
import { logos } from './CasinoLogos';
import Image from 'next/image';
import { track } from '@vercel/analytics';

interface CasinoCardProps {
  casino: Casino;
  badge?: 'gold' | 'silver' | 'bronze';
}

export default function CasinoCard({ casino, badge }: CasinoCardProps) {
  // Track click on mobile casino brands
  const handleCasinoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (casino.isMobile) {
      track('Casino Click', {
        casino: casino.name
      });
    }
  };
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
    );
  };

  // Render logo: either from logos object (SVG) or as Image (PNG)
  const renderLogo = () => {
    if (typeof casino.logo === 'string' && casino.logo.startsWith('/')) {
      // It's an image path
      return (
        <Image 
          src={casino.logo} 
          alt={`${casino.name} Casino`} 
          width={200} 
          height={80} 
          className="w-full h-full object-contain"
        />
      );
    }
    // It's a LogoKey, render from logos object
    return logos[casino.logo as keyof typeof logos];
  };

  const getBadgeStyles = () => {
    if (badge === 'gold') {
      return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black border-yellow-500';
    }
    if (badge === 'silver') {
      return 'bg-gradient-to-br from-gray-300 to-gray-500 text-black border-gray-400';
    }
    if (badge === 'bronze') {
      return 'bg-gradient-to-br from-amber-600 to-amber-800 text-white border-amber-700';
    }
    return '';
  };

  const getBadgeLabel = () => {
    if (badge === 'gold') return "Editor's pick";
    if (badge === 'silver') return 'Most Popular';
    if (badge === 'bronze') return 'Fast Payout';
    return '';
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-3 sm:p-4 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40">
      {/* Top Row: Logo Left, Rating Right */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
        {/* Logo - Left */}
        <div className="relative flex-shrink-0 w-28 sm:w-32 lg:w-40">
          {/* Badge */}
          {badge && (
            <div className={`absolute -top-3 sm:-top-4 left-0 z-[1] ${getBadgeStyles()} px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border flex items-center justify-center font-bold text-[10px] sm:text-xs shadow-lg whitespace-nowrap`}>
              {getBadgeLabel()}
            </div>
          )}
          <div className={`w-full aspect-[5/2] ${badge ? 'mt-5 sm:mt-6' : ''}`}>
            {renderLogo()}
          </div>
        </div>

        {/* Rating - Right */}
        <div className="flex flex-col items-center sm:items-end gap-0.5 sm:gap-1">
          {renderStars(casino.rating)}
          <span className="text-emerald-400 text-xl sm:text-2xl lg:text-3xl font-bold">
            {casino.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Bottom Row: Bonus Text Left, CTA Button Right */}
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Bonus Text - Left */}
        <div className="flex-1 min-w-0">
          <p className="text-yellow-400 font-semibold text-base sm:text-lg lg:text-2xl leading-snug">
            {casino.bonus}
          </p>
        </div>

        {/* CTA Button - Right */}
        <a
          href={casino.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCasinoClick}
          className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-2 px-5 sm:py-2.5 sm:px-6 lg:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap"
        >
          GET BONUS
        </a>
      </div>
    </div>
  );
}
