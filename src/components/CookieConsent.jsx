'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        // Small delay so the animation is visible
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // localStorage not available
    }
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem('cookie_consent', 'accepted');
    } catch (e) {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto animate-[fadeIn_0.3s_ease-out]" />

      {/* Banner */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto animate-[slideUp_0.4s_ease-out]">
        <div className="max-w-3xl mx-auto px-4 pb-6">
          <div className="p-5 rounded-2xl border border-line bg-surface-card shadow-2xl shadow-black/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-content-primary mb-1">
                  Ce site utilise des cookies
                </p>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Nous utilisons des cookies essentiels pour le fonctionnement du site et des cookies
                  de préférences pour améliorer votre expérience. En cliquant sur « Accepter »,
                  vous consentez à l&apos;utilisation de tous les cookies.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href="/confidentialite"
                  className="px-4 py-2 text-xs font-medium text-content-secondary hover:text-content-primary border border-line rounded-lg hover:bg-surface-elevated transition"
                >
                  Paramétrer
                </Link>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg hover:from-violet-500 hover:to-indigo-500 transition shadow-lg shadow-violet-500/20"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
