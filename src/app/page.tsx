import HeroSection from '@/features/hero/HeroSection';
import StatsBar from '@/features/stats/StatsBar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsBar />
    </main>
  );
}
