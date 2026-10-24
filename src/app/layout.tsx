import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { TripsProvider } from '@/context/TripsContext';

export const metadata: Metadata = {
  title: 'WanderHidden — Discover India’s Hidden Gems',
  description:
    'Find the places others miss. Curated travel discovery platform for lesser-known valleys, living root bridges, peaceful hamlets, and offbeat wonders across India.',
  keywords: [
    'hidden places India',
    'offbeat travel India',
    'Ziro Valley',
    'Dzukou Valley',
    'Chopta',
    'Gandikota',
    'trip planner India',
    'budget estimator INR',
  ],
  authors: [{ name: 'WanderHidden' }],
  openGraph: {
    title: 'WanderHidden — Find the Places Others Miss',
    description:
      'Curated offbeat destinations, interactive maps, multi-day itinerary planner, and INR budget estimator.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-forest-950 font-sans">
        <AuthProvider>
          <FavoritesProvider>
            <TripsProvider>{children}</TripsProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
