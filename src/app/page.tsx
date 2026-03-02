import HeroSection from '@/features/hero/HeroSection';
import StatsBar from '@/features/stats/StatsBar';
import SkillsGrid from '@/features/skills-grid/SkillsGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsBar />
      <SkillsGrid />
    </main>
  );
}
