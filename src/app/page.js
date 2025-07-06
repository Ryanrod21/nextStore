import WelcomeModal from '@/components/WelcomeMsg';
import MainHero from '@/sections/MainHero';

export default function Home() {
  return (
    <>
      <div className="main-container">
        <div className="page-content">
          <WelcomeModal />
          <MainHero />
        </div>
      </div>
    </>
  );
}
