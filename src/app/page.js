import WelcomeModal from '@/components/WelcomeMsg';
import Hero from '@/sections/Hero';
import MainHero from '@/sections/MainHero';

export default function Home() {
  return (
    <>
      <div className="main-container">
        <div className="page-content">
          <WelcomeModal />
          <Hero />
          <MainHero />
        </div>
      </div>
    </>
  );
}
