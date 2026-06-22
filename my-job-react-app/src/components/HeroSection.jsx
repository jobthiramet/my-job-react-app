import React from 'react';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1>Stay<br />Informed,<br />Stay Inspired</h1>
        <p>Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.</p>
      </div>
      <div className="hero-middle">
        <img src="https://images.unsplash.com/photo-1548366086-7f1b76106622?w=600&auto=format&fit=crop&q=80" alt="Author with cat" />
      </div>
      <div className="hero-right">
        <span className="author-label">-Author</span>
        <h2>Thompson P.</h2>
        <p>I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.</p>
        <p>When I’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.</p>
      </div>
    </section>
  );
}