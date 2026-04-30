'use client';

import { Casino } from '../data/casinos';
import { logos } from './CasinoLogos';
import Image from 'next/image';
import { track } from '@vercel/analytics';

interface CasinoCardProps {
  casino: Casino;
  rank?: number;
  badge?: 'gold' | 'silver' | 'bronze' | 'fourth';
  isOnline?: boolean;
}

export default function CasinoCard({ casino, rank, badge, isOnline: _isOnline = false }: CasinoCardProps) {
  const handleCasinoClick = () => {
    if (casino.isMobile) {
      track('Casino Click', { casino: casino.name });
    }
  };
  const handleCardClick = () => {
    handleCasinoClick();
    window.open(casino.url, '_blank', 'noopener,noreferrer');
  };
  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const renderLogo = () => {
    if (typeof casino.logo === 'string' && casino.logo.startsWith('/')) {
      return (
        <Image
          src={casino.logo}
          alt={`${casino.name} Casino`}
          width={200}
          height={120}
          className="w-full h-full object-contain"
        />
      );
    }
    return logos[casino.logo as keyof typeof logos];
  };

  const badgeLabel =
    badge === 'gold' ? 'Fast Withdrawal' :
    badge === 'silver' ? 'Most Popular' :
    badge === 'bronze' ? 'Trusted/Licensed' : null;

  return (
    <article
      className="group relative overflow-hidden casino-card-bg rounded-2xl p-5 shadow-xl transition-all duration-300 cursor-pointer border border-violet-500/20 hover:border-orange-400/50 casino-glow gold-shimmer"
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-violet-500/30 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-violet-500/30 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-violet-500/30 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-violet-500/30 rounded-br-2xl" />

      {isOnline && badge && (
        <span className="absolute top-0 left-0 rounded-br-xl rounded-tl-2xl px-3 py-1.5 text-[11px] font-extrabold bg-gradient-to-r from-violet-600 to-orange-500 text-white shadow-lg">
          {badgeLabel}
        </span>
      )}

      {/* Main body: left col (logo + rating) | right col (bonus + button) */}
      <div className="flex gap-4 items-stretch">

        {/* LEFT — logo then rating */}
        <div className="flex flex-col items-center gap-3 w-36 sm:w-40 shrink-0">
          <div className="w-full h-24 sm:h-28 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
            {renderLogo()}
          </div>
          <div className="flex flex-col items-center leading-none">
            <div className="gold-text text-3xl sm:text-4xl font-extrabold leading-none">
              {casino.rating.toFixed(1)}
            </div>
            <div className="text-orange-400 text-sm mt-0.5">★★★★★</div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-violet-500/15 self-stretch" />

        {/* RIGHT — bonus text then play button */}
        <div className="flex flex-col flex-1 justify-between gap-3">
          <div className="rounded-xl bg-gradient-to-b from-violet-500/10 to-violet-500/5 border border-violet-500/15 px-3 py-3 flex-1 flex items-center justify-center">
            <p className="text-sm sm:text-base font-extrabold text-violet-100 tracking-tight text-center leading-snug">
              {casino.bonus}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <a
              href={casino.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.stopPropagation();
                handleCasinoClick();
              }}
              className="block w-full bg-gradient-to-r from-violet-700 via-orange-500 to-violet-700 text-white font-extrabold py-3 px-4 rounded-xl text-sm sm:text-base uppercase shadow-lg transition-all duration-300 hover:from-violet-600 hover:via-orange-400 hover:to-violet-600 hover:shadow-violet-500/30 text-center tracking-wide"
            >
              Play Now
            </a>
            <p className="text-center text-[10px] text-violet-200/40">T&amp;Cs apply.</p>
          </div>
        </div>

      </div>
    </article>
  );
}
