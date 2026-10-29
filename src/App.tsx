import React, { useState } from 'react';
import { SparkleField } from './components/SparkleField';
import { DungeonDivider } from './components/DungeonDivider';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';
import { AudioProvider } from './context/AudioContext';
import { PalaceProvider } from './context/PalaceContext';
import { ActionFlashProvider } from './context/ActionFlashContext';
import { CustomCursor } from './components/CustomCursor';
import { ActionFlash } from './components/ActionFlash';
import { SafeRoomToast } from './components/SafeRoomToast';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // Check if user already saw intro in current session
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('p5_intro_seen') !== 'true';
    }
    return true;
  });

  const handleCompleteIntro = () => {
    setShowIntro(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('p5_intro_seen', 'true');
    }
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <PalaceProvider>
      <AudioProvider>
        <ActionFlashProvider>
          <div className="min-h-screen bg-[#080808] text-[#f7f5f2] relative selection:bg-[#ff1b2d] selection:text-[#080808] overflow-x-hidden">
          
          {/* Custom Persona 5 Crosshair Mouse Cursor */}
          <CustomCursor />

          {/* Persona 5 Camera Shutter Action Flash Transition */}
          <ActionFlash />

          {/* Persona 5 Safe Room Haven Notification (Triggers after 5 min or via preview) */}
          <SafeRoomToast />

        {/* Intro Sequence Screen (Short, skippable, high-octane) */}
        {showIntro && <IntroScreen onComplete={handleCompleteIntro} />}

        {/* Global Bespoke Sparkle / Star Field */}
        <SparkleField interactive={true} />

        {/* Sticky 3-Zone Navigation Header */}
        <Navbar onReplayIntro={handleReplayIntro} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        
        {/* 1. Hero Section */}
        <HeroSection />

        {/* Decorative Dungeon Divider 1 */}
        <DungeonDivider
          dungeonName="MUSEUM OF ART"
          loadingText="NOW LOADING..."
          progress="INFILTRATING 70%"
          theme="crimson"
        />

        {/* 2. About Section / Confidant Dossier with Scroll Reveal */}
        <ScrollReveal direction="up" delay={50}>
          <AboutSection />
        </ScrollReveal>

        {/* Decorative Dungeon Divider 2 */}
        <DungeonDivider
          dungeonName="ARSENAL VAULT"
          loadingText="SECURITY SCAN..."
          progress="INFILTRATING 85%"
          theme="white"
          invert={true}
        />

        {/* 3. Skills Deck Section with Scroll Reveal */}
        <ScrollReveal direction="up" delay={50}>
          <SkillsSection />
        </ScrollReveal>

        {/* Decorative Dungeon Divider 3 */}
        <DungeonDivider
          dungeonName="PYRAMID OF CODE"
          loadingText="SYSTEM DECRYPT..."
          progress="INFILTRATING 92%"
          theme="black"
        />

        {/* 4. Projects Showcase Section with Scroll Reveal */}
        <ScrollReveal direction="up" delay={50}>
          <ProjectsSection />
        </ScrollReveal>

        {/* Decorative Dungeon Divider 4 */}
        <DungeonDivider
          dungeonName="DEPTHS OF MEMENTOS"
          loadingText="FINAL TARGET..."
          progress="STEAL 100%"
          theme="crimson"
          invert={true}
        />

        {/* 5. Contact / Calling Card Section with Scroll Reveal */}
        <ScrollReveal direction="up" delay={50}>
          <ContactSection />
        </ScrollReveal>

      </main>

        {/* Footer */}
        <Footer />

          </div>
        </ActionFlashProvider>
      </AudioProvider>
    </PalaceProvider>
  );
}
