
import React from "react";
import { useLanguage } from "../components/LanguageProvider";
import HeroSection from "../components/sections/HeroSection";
import GamesSection from "../components/sections/GamesSection";
import EventsSection from "../components/sections/EventsSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import LocationSection from "../components/sections/LocationSection";
import FaqSection from "../components/sections/FaqSection";
import BookingSection from "../components/sections/BookingSection";

export default function Home() {
  const { t, language } = useLanguage();

  if (!t) {
    return <div className="min-h-screen bg-black" />;
  }

  // A slimmed down homepage for linking to other pages.
  // We can add more promotional content here later.
  return (
    <div className="w-full">
      <HeroSection t={t} />
      <div id="games">
        <GamesSection t={t} isPreview={true} language={language} />
      </div>
      <div id="events">
        <EventsSection t={t} />
      </div>
      <div id="booking">
         <BookingSection t={t} language={language} />
      </div>
    </div>
  );
}
