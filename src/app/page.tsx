
"use client"

import { useState, useEffect } from 'react';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ProjectsSection from '@/components/projects-section';
import LoadingScreen from '@/components/loading-screen';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // This timer simulates the total duration of the loading sequence.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); // Increased duration to allow for typing animation

    // After loading is complete, wait for fade-out before showing content.
    const contentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 4800); // Slightly after loading becomes false

    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />
      {contentVisible && (
        <>
          <div className="section-slide-up">
            <HeroSection />
          </div>
          <div className="section-slide-up">
            <AboutSection />
          </div>
          <div className="section-slide-up">
            <ProjectsSection />
          </div>
        </>
      )}
    </>
  );
}
