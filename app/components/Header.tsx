'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Casinos', href: '/#casinos' },
    { name: 'Guide', href: '/#guide' },
    { name: 'About Us', href: '/#about' },
    { name: 'Contact Us', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0812]/95 backdrop-blur-xl border-b border-violet-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3.5">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-violet-100/70 hover:text-orange-400 transition-colors font-semibold tracking-wide text-sm px-4 py-2 rounded-lg hover:bg-violet-500/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-violet-300/80 hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-violet-500/10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-violet-500/10 mt-2 pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-violet-100/70 hover:text-orange-400 transition-colors font-semibold py-2.5 px-3 rounded-lg hover:bg-violet-500/5"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
