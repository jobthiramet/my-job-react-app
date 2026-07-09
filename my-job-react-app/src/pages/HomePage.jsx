import React from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import LatestArticles from '../components/LatestArticles';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <div className="app-container">
        <NavBar />
        <main>
          <HeroSection />
          <LatestArticles />
        </main>
      </div>
      <Footer />
    </>
  );
}
