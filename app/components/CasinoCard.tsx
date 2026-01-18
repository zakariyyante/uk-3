'use client';

import { Casino } from '../data/casinos';
import { Star, ArrowRight } from 'lucide-react';
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
            className="w-3 h-3 fill-yellow-400 text-yellow-400"
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
          width={180} 
          height={80} 
          className="w-full h-full object-contain"
        />
      );
    }
    // It's a LogoKey, render from logos object
    return logos[casino.logo as keyof typeof logos];
  };

  // Default payment methods - can be made configurable later
  const paymentMethods = ['PayPal', 'Visa Debit', 'Mastercard Debit', 'Skrill', 'Neteller'];

  return (
    <div className="relative bg-[#31274F] rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Badge - Top Left */}
      {badge && (
        <div className={`absolute -top-2 -left-2 z-10 font-bold text-xs px-4 py-1.5 rounded-lg uppercase shadow-lg whitespace-nowrap border-2 ${
          badge === 'gold' 
            ? 'bg-orange-500 border-orange-300 text-white' 
            : badge === 'silver' 
            ? 'bg-purple-500 border-purple-300 text-white' 
            : 'bg-yellow-400 border-yellow-300 text-black'
        }`}>
          {badge === 'gold' ? "Editor's pick" : badge === 'silver' ? 'Most Popular' : 'Fast Payout'}
        </div>
      )}

      {/* Top Section: Logo and Rating */}
      <div className="flex items-start justify-between mb-6">
        {/* Logo - Left */}
        <div className="w-40 h-20 flex items-center justify-center">
          <div className="w-full h-full [&>svg]:text-[#C0A06D] [&>svg]:fill-[#C0A06D]">
            {renderLogo()}
          </div>
        </div>

        {/* Rating - Right */}
        <div className="flex flex-col items-end">
          <span className="text-white text-3xl font-bold mb-1">
            {casino.rating.toFixed(1)}
          </span>
          {renderStars(casino.rating)}
        </div>
      </div>

      {/* Bonus Offer - Centered */}
      <div className="text-center mb-6">
        <p className="text-white font-semibold text-base sm:text-lg uppercase leading-tight">
          {casino.bonus}
        </p>
      </div>

      {/* Payment Methods - Centered Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {paymentMethods.map((method) => (
          <span
            key={method}
            className="px-3 py-1 bg-gray-900/50 border border-gray-700 rounded-full text-white text-xs"
          >
            {method}
          </span>
        ))}
      </div>

      {/* CTA Button - Full Width Bottom */}
      <a
        href={casino.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCasinoClick}
        className="block w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-4 px-6 rounded-2xl text-center text-base sm:text-lg uppercase shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        Check Now
        <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  );
}
