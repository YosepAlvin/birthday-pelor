
import React from 'react';
import { Helmet } from 'react-helmet';
import LoadingScreen from '@/components/LoadingScreen.jsx';
import Header from '@/components/Header.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import GiftSection from '@/components/GiftSection.jsx';
import MessageSection from '@/components/MessageSection.jsx';
import TimelineSection from '@/components/TimelineSection.jsx';
import GallerySection from '@/components/GallerySection.jsx';
import MemoriesSlideshow from '@/components/MemoriesSlideshow.jsx';
import OpenWhenLetters from '@/components/OpenWhenLetters.jsx';
import CakeWishesSection from '@/components/CakeWishesSection.jsx';
import PhotoMosaicLove from '@/components/PhotoMosaicLove.jsx';
import NightSkyScene from '@/components/NightSkyScene.jsx';
import UniverseScene from '@/components/UniverseScene.jsx';
import FinalSection from '@/components/FinalSection.jsx';
import CinematicBreathingMoment from '@/components/CinematicBreathingMoment.jsx';
import SideNavigation from '@/components/SideNavigation.jsx';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';

const HomePage = () => {
  const { currentScene } = useSceneNavigation();
  const cinematicScenes = ['inter-1', 'inter-2', 'inter-3'];
  const showOverlayUi = currentScene !== 'loading' && !cinematicScenes.includes(currentScene);

  const renderScene = () => {
    switch (currentScene) {
      case 'loading':
        return <LoadingScreen />;
      case 'hero':
        return <HeroSection />;
      case 'inter-1':
        return <CinematicBreathingMoment key="inter-1" lines={["dan tanpa sadar...", "kamu udah sejauh ini ya?"]} nextScene="gift" lineDuration={1800} />;
      case 'gift':
        return <GiftSection />;
      case 'inter-2':
        return (
          <CinematicBreathingMoment 
            key="inter-2"
            lines={[
              "aku tahu kamu capek.",
              "tapi kamu tetap bertahan <br /> sampai hari ini.",
              "aku cuma pengen <br /> ada buat kamu.",
              "di hari buruk kamu juga."
            ]} 
            nextScene="message" 
            lineDuration={2500}
          />
        );
      case 'message':
        return <MessageSection />;
      case 'gallery':
        return <GallerySection />;
      case 'memories':
        return <MemoriesSlideshow />;
      case 'letters':
        return <OpenWhenLetters />;
      case 'timeline':
        return <TimelineSection />;
      case 'cake':
        return <CakeWishesSection />;
      case 'mosaic':
        return <PhotoMosaicLove />;
      case 'inter-3':
        return (
          <CinematicBreathingMoment 
            key="inter-3"
            lines={[
              "aku tahu kamu capek.",
              "tapi kamu tetap bertahan <br /> sampai hari ini."
            ]} 
            nextScene="night-sky" 
            lineDuration={2500}
          />
        );
      case 'night-sky':
        return <NightSkyScene />;
      case 'universe':
        return <UniverseScene />;
      case 'final':
        return <FinalSection />;
      default:
        return <LoadingScreen />;
    }
  };

  return (
    <div className="min-h-screen relative bg-[rgb(10,10,20)] text-white w-full overflow-x-hidden">
      <Helmet>
        <title>Happy Birthday Sayang ❤️</title>
      </Helmet>

      {showOverlayUi && <Header />}
      {showOverlayUi && <SideNavigation />}

      <main id="main-scene-content" className="relative w-full">
        {renderScene()}
      </main>
    </div>
  );
};

export default HomePage;
