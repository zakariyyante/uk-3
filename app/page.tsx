import CasinoCard from './components/CasinoCard';
import Header from './components/Header';
import Logo from './components/Logo';
import MobileCasinoModal from './components/MobileCasinoModal';
import ExclusiveOfferPopup from './components/ExclusiveOfferPopup';
import { casinos } from './data/casinos';
import { headers } from 'next/headers';
import Image from 'next/image';

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const gclid = resolvedSearchParams?.gclid as string | undefined;
  const hasGclid = !!gclid;

  const isOnline= hasGclid;

  const mobileCasinos = casinos.filter(casino => casino.isMobile === true);
  const regularCasinos = casinos.filter(casino => !casino.isMobile);
  const exclusiveCasino = casinos.find(casino => casino.name === 'Basswin') || mobileCasinos[0];
  
  return (
    <div className="min-h-screen bg-[#0d0812] felt-texture">
      <MobileCasinoModal mobileCasinos={mobileCasinos} isOnline={isOnline} gclidValue={gclid} />
      
      {/*<ExclusiveOfferPopup casino={exclusiveCasino} isOnline={isOnline} gclidValue={gclid} countryCode={countryCode} />*/}
      
      <Header />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-8 pb-6 sm:pt-14 sm:pb-8 lg:pt-16 lg:pb-10 text-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl sm:text-8xl opacity-[0.04] text-violet-400 rotate-12 select-none">♠</div>
          <div className="absolute top-20 right-16 text-5xl sm:text-7xl opacity-[0.04] text-orange-400 -rotate-12 select-none">♥</div>
          <div className="absolute bottom-10 left-1/4 text-5xl sm:text-7xl opacity-[0.04] text-violet-400 rotate-6 select-none">♦</div>
          <div className="absolute bottom-5 right-1/4 text-6xl sm:text-8xl opacity-[0.04] text-orange-400 -rotate-6 select-none">♣</div>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="inline-block mb-5 px-5 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-orange-500/10 border border-violet-500/20">
            <span className="text-xs sm:text-sm font-bold text-orange-400 uppercase tracking-wider">UK&apos;s Premier Casino Review Hub 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Find the UK&apos;s <span className="gold-text">Best-Rated</span> Online Casino Sites
          </h1>
          <p className="text-base sm:text-lg text-violet-100/50 mb-8 max-w-2xl mx-auto">
            Hand-picked casino sites featuring exclusive bonuses, rapid payouts, and elite gaming experiences
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 bg-[#150d20] rounded-full px-5 py-2.5 border border-violet-500/15">
              <span className="text-orange-400 text-lg">♠</span>
              <span className="text-violet-100/70 text-sm font-semibold">UKGC Licensed</span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#150d20] rounded-full px-5 py-2.5 border border-violet-500/15">
              <span className="text-orange-400 text-lg">★</span>
              <span className="text-violet-100/70 text-sm font-semibold">Expert Approved</span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#150d20] rounded-full px-5 py-2.5 border border-violet-500/15">
              <span className="text-orange-400 text-lg">♦</span>
              <span className="text-violet-100/70 text-sm font-semibold">Quick Withdrawals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Casino Cards Section */}
      <section id="casinos" className="container mx-auto px-4 pb-16">
        <div className="mb-3 sm:mb-5 lg:mb-8 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-extrabold gold-text mb-2 sm:mb-4 tracking-wide">
            Our Expert Casino Picks
          </h3>
          <p className="text-sm sm:text-base text-violet-100/40">Updated every week — scored on payout speed, bonus quality, and genuine player reviews.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {regularCasinos.map((casino, index) => (
            <CasinoCard
              key={casino.id}
              casino={casino}
              rank={index + 1}
              badge={index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : undefined}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 bg-violet-500/5 border border-violet-500/15 rounded-2xl p-3 sm:p-4 lg:p-6 max-w-6xl mx-auto">
          <p className="text-violet-200/50 text-xs sm:text-sm text-center">
            <strong className="text-violet-200/70">New customers only.</strong> 18+. T&Cs apply. BeGambleAware.org. Please play responsibly.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#100a18] py-8 sm:py-12 lg:py-16 border-y border-violet-500/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-4 sm:mb-6 lg:mb-8 text-center">
            How We Rate UK Casinos
          </h3>
          
          <div className="casino-card-bg rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-violet-500/15">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-violet-100 mb-3 sm:mb-4">
              Why Our Reviews Stand Out
            </h4>
            <p className="text-violet-100/50 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              Our expert team thoroughly tests every casino so UK players can make smart,
              well-informed decisions. We assess each site across licensing credentials, game
              selection, bonus offers, banking options, and support quality.
            </p>
            <ul className="space-y-2.5 text-violet-100/50 text-sm sm:text-base">
              <li className="flex items-start gap-2.5">
                <span className="text-orange-400 mt-0.5">♠</span>
                <span>All featured casinos hold valid UKGC licences</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-400 mt-0.5">♦</span>
                <span>We verify security protocols and RNG integrity independently</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-400 mt-0.5">♣</span>
                <span>Our scores are fully impartial and free from commercial influence</span>
              </li>
            </ul>
          </div>

          <div id="guide" className="bg-[#130b1e] rounded-2xl p-4 sm:p-6 lg:p-8 border border-violet-500/10 shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold gold-text mb-3 sm:mb-4">
              Play Safely
            </h4>
            <p className="text-violet-100/60 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
              Your wellbeing comes first. Free, confidential support is available 24/7
              if you or someone close to you needs help:
            </p>
            <ul className="space-y-2 text-violet-100/60 text-sm sm:text-base">
              <li>• <strong className="text-violet-200/80">BeGambleAware:</strong> Visit{' '}
                <a href="https://www.begambleaware.org" className="text-orange-400 hover:text-orange-300 underline decoration-orange-400/30 underline-offset-2">
                  begambleaware.org
                </a>
              </li>
              <li>• <strong className="text-violet-200/80">GamCare:</strong> Call 0808 8020 133 or visit{' '}
                <a href="https://www.gamcare.org.uk" className="text-orange-400 hover:text-orange-300 underline decoration-orange-400/30 underline-offset-2">
                  gamcare.org.uk
                </a>
              </li>
              <li>• <strong className="text-violet-200/80">National Gambling Helpline:</strong> 0808 8020 133</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0a0610] border-t border-violet-500/10 py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Logo />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h5 className="text-violet-200/80 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Quick Links</h5>
              <ul className="space-y-1 sm:space-y-2 text-violet-100/40 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
                <li><a href="#casinos" className="hover:text-orange-400 transition-colors">Casinos</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-violet-200/80 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Legal</h5>
              <ul className="space-y-1 sm:space-y-2 text-violet-100/40 text-xs sm:text-sm">
                <li><a href="/privacy" className="hover:text-orange-400 transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-orange-400 transition-colors">Terms</a></li>
                <li><a href="#about" className="hover:text-orange-400 transition-colors">About Us</a></li>
              </ul>
            </div>
            <div className="col-span-2">
              <h5 className="text-violet-200/80 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Disclaimer</h5>
              <p className="text-violet-100/40 text-xs sm:text-sm leading-relaxed">
                We provide independent, expert-led casino reviews. Every listed site is fully
                regulated by the UK Gambling Commission. Gambling is for entertainment — only
                ever bet what you can afford.
              </p>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-10 flex flex-col items-center gap-4">
            <p className="text-violet-200/50 text-xs sm:text-sm uppercase tracking-widest font-semibold">
              Safer Gambling
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-violet-500/5 rounded-xl px-3 py-2 border border-violet-500/15 flex items-center justify-center">
                <Image
                  src="/18plus.png"
                  alt="18+ Only"
                  width={48}
                  height={48}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <a
                href="https://www.gamstop.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-500/5 rounded-xl px-4 py-3 border border-violet-500/15 hover:border-orange-400/40 transition-colors flex items-center justify-center"
                aria-label="Visit GamStop"
              >
                <Image
                  src="/gamestop.png"
                  alt="GamStop"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </a>
              <a
                href="https://www.gambleaware.org"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-500/5 rounded-xl px-4 py-3 border border-violet-500/15 hover:border-orange-400/40 transition-colors flex items-center justify-center"
                aria-label="Visit GambleAware"
              >
                <Image
                  src="/gambleaware.png"
                  alt="GambleAware"
                  width={160}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </a>
              <a
                href="https://www.gamcare.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-500/5 rounded-xl px-4 py-3 border border-violet-500/15 hover:border-orange-400/40 transition-colors flex items-center justify-center"
                aria-label="Visit GamCare"
              >
                <Image
                  src="/gamcare.png"
                  alt="GamCare"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          <div className="border-t border-violet-500/10 pt-4 sm:pt-6 text-center mt-6">
            <p className="text-violet-100/30 text-xs sm:text-sm">
              &copy; 2026 instantukcasinos.org. For educational purposes only. 18+ only. Please gamble responsibly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
