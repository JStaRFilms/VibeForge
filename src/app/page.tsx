import HeroSection from '@/features/hero/HeroSection';
import StatsBar from '@/features/stats/StatsBar';
import SkillsGrid from '@/features/skills-grid/SkillsGrid';
import LiveDemoSection from '@/features/live-demo/LiveDemoSection';
import RemotionSection from '@/features/remotion-embed/RemotionSection';
import InstallSection from '@/features/install/InstallSection';
import FooterSection from '@/features/footer/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsBar />
      <RemotionSection />
      <SkillsGrid />
      <LiveDemoSection />
      <InstallSection />
      <FooterSection />
    </main>
  );
}
