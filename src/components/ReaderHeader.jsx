'use client';

import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme';

/**
 * Shared header for "reader" pages : blog, guides, glossary.
 * Includes a theme toggle for comfortable long-form reading.
 */
export default function ReaderHeader() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-base/80 backdrop-blur-2xl border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mr-1.5">
            <span className="text-[11px] font-bold text-white">P</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-content-primary">Prospectia</span>
          <span className="text-violet-500 dark:text-violet-400 text-xs font-semibold">.cloud</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-content-tertiary hover:text-content-primary hover:bg-surface-elevated transition"
            aria-label={theme === 'dark' ? 'Activer mode clair' : 'Activer mode sombre'}
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link href="/login" className="text-sm text-content-tertiary hover:text-content-primary transition hidden sm:inline">
            Se connecter
          </Link>
          <Link
            href="/signup"
            className="text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition"
          >
            Essayer gratuitement
          </Link>
        </div>
      </div>
    </nav>
  );
}
