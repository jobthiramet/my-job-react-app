import React, { useState } from 'react';
import BlogCard from './BlogCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import obsessionPoster from '../assets/posters/obsession.jpg';
import interstellarPoster from '../assets/posters/interstellar.jpg';
import martySupremePoster from '../assets/posters/marty-supreme.jpg';
import drivePoster from '../assets/posters/drive.jpg';
import uncutGemsPoster from '../assets/posters/uncut-gems.jpg';
import nopePoster from '../assets/posters/nope.jpg';
import usPoster from '../assets/posters/us.jpg';
import pastLivesPoster from '../assets/posters/past-lives.jpg';
import aboutTimePoster from '../assets/posters/about-time.jpg';
import lostInTranslationPoster from '../assets/posters/lost-in-translation.jpg';
import inTheMoodForLovePoster from '../assets/posters/in-the-mood-for-love.jpg';
import poster2046 from '../assets/posters/2046.jpg';
import theLobsterPoster from '../assets/posters/the-lobster.jpg';
import fargoPoster from '../assets/posters/fargo.jpg';
import trainspottingPoster from '../assets/posters/trainspotting.jpg';
import americanPsychoPoster from '../assets/posters/american-psycho.jpg';

const categories = ['All Reviews', 'Thriller', 'Sci-Fi', 'Horror', 'Romance', 'Comedy'];

const moviesData = [
  {
    id: 1,
    image: obsessionPoster,
    tag: 'Thriller',
    title: 'Obsession: A Gripping Psychological Thriller That Keeps You Guessing',
    description:
      'Dive deep into the dark corners of human desire and obsession. This film delivers a masterclass in suspense, tension-building, and an unpredictable plot that...',
    author: 'Thompson P.',
    date: '22 June 2026',
  },
  {
    id: 2,
    image: interstellarPoster,
    tag: 'Sci-Fi',
    title: 'Interstellar: A Mind-Bending Masterpiece of Space and Time',
    description:
      "Christopher Nolan's sci-fi epic remains a monumental achievement. Blending hard science with a deeply emotional core, it explores love's power across dimensions and...",
    author: 'Thompson P.',
    date: '20 June 2026',
  },
  {
    id: 3,
    image: martySupremePoster,
    tag: 'Drama',
    title: 'Marty Supreme: A Stylish and Energetic Look at Subculture',
    description:
      'An extraordinary journey through a unique world. With brilliant performances and a sharp, witty script, this movie manages to turn an unexpected sport into an engaging...',
    author: 'Thompson P.',
    date: '18 June 2026',
  },
  {
    id: 4,
    image: drivePoster,
    tag: 'Action',
    title: 'Drive: Neon-Drenched Noir with a Stunning Atmospheric Style',
    description:
      'A silent driver, a killer soundtrack, and beautiful hyper-violence. Nicolas Winding Refn’s masterpiece blends arthouse aesthetic with classic Hollywood action perfectly...',
    author: 'Thompson P.',
    date: '15 June 2026',
  },
  {
    id: 5,
    image: uncutGemsPoster,
    tag: 'Thriller',
    title: 'Uncut Gems: An Anxiety-Inducing Masterclass in Suspense',
    description:
      "Adam Sandler delivers a career-defining performance in this chaotic, high-stakes thriller. It's a relentless 2-hour panic attack that you simply cannot look away from...",
    author: 'Thompson P.',
    date: '12 June 2026',
  },
  {
    id: 6,
    image: nopePoster,
    tag: 'Horror',
    title: 'Nope: Jordan Peele’s Spectacular Sci-Fi Horror Spectacle',
    description:
      "What lies above the clouds? Peele reimagines the classic UFO movie into a chilling critique of spectacle culture, exploitation, and humanity's obsession with capturing the unseen...",
    author: 'Thompson P.',
    date: '10 June 2026',
  },
  {
    id: 7,
    image: usPoster,
    tag: 'Horror',
    title: 'Us: A Terrifying and Thought-Provoking Doppelgänger Nightmare',
    description:
      'We are our own worst enemy. Jordan Peele delivers a stunningly creepy, metaphorical look at societal division through the lens of terrifying underground doppelgängers...',
    author: 'Thompson P.',
    date: '08 June 2026',
  },
  {
    id: 8,
    image: pastLivesPoster,
    tag: 'Romance',
    title: 'Past Lives: A Tender Meditation on Fate, Memory, and What Might Have Been',
    description:
      'Celine Song crafts a quietly devastating reunion story. Two childhood friends meet again in New York and wrestle with destiny, identity, and the lives they chose...',
    author: 'Thompson P.',
    date: '07 June 2026',
  },
  {
    id: 9,
    image: aboutTimePoster,
    tag: 'Romance',
    title: 'About Time: A Warm and Witty Celebration of Everyday Love',
    description:
      'Richard Curtis turns time travel into something deeply human. A young man learns that the greatest gift is not changing the past, but savoring each ordinary moment...',
    author: 'Thompson P.',
    date: '06 June 2026',
  },
  {
    id: 10,
    image: lostInTranslationPoster,
    tag: 'Romance',
    title: 'Lost in Translation: A Melancholic and Beautiful Tokyo Connection',
    description:
      'Sofia Coppola captures loneliness with poetic precision. Two strangers adrift in Tokyo find comfort in each other through quiet conversations and unspoken longing...',
    author: 'Thompson P.',
    date: '05 June 2026',
  },
  {
    id: 11,
    image: inTheMoodForLovePoster,
    tag: 'Romance',
    title: 'In the Mood for Love: Wong Kar-wai’s Masterpiece of Restrained Desire',
    description:
      'Every frame aches with longing. Maggie Cheung and Tony Leung navigate betrayal and unspoken attraction in 1960s Hong Kong with heartbreaking elegance...',
    author: 'Thompson P.',
    date: '04 June 2026',
  },
  {
    id: 12,
    image: poster2046,
    tag: 'Romance',
    title: '2046: A Lush, Dreamlike Sequel to Unfinished Longing',
    description:
      'Wong Kar-wai returns to Chow Mo-wan in a sci-fi romance about memory and regret. A hypnotic blend of nostalgia, fantasy, and love that refuses to fade...',
    author: 'Thompson P.',
    date: '03 June 2026',
  },
  {
    id: 13,
    image: theLobsterPoster,
    tag: 'Comedy',
    title: 'The Lobster: A Deadpan Dystopian Satire on Modern Romance',
    description:
      'Yorgos Lanthimos delivers absurdity with a straight face. In a world where single people must find a partner or become animals, love becomes a cruel bureaucratic game...',
    author: 'Thompson P.',
    date: '02 June 2026',
  },
  {
    id: 14,
    image: fargoPoster,
    tag: 'Comedy',
    title: 'Fargo: Dark Comedy Perfection in the Frozen Midwest',
    description:
      'The Coen Brothers blend crime and dry humor into something unforgettable. A kidnapping scheme spirals into chaos beneath endless snow and deceptively polite manners...',
    author: 'Thompson P.',
    date: '01 June 2026',
  },
  {
    id: 15,
    image: trainspottingPoster,
    tag: 'Comedy',
    title: 'Trainspotting: A Frenetic, Irreverent Portrait of Youth and Addiction',
    description:
      'Danny Boyle’s cult classic pulses with energy and dark wit. A raw, stylish dive into Edinburgh’s underground scene that is as funny as it is harrowing...',
    author: 'Thompson P.',
    date: '31 May 2026',
  },
  {
    id: 16,
    image: americanPsychoPoster,
    tag: 'Comedy',
    title: 'American Psycho: A Razor-Sharp Satire of 1980s Excess',
    description:
      'Christian Bale is chillingly hilarious as Patrick Bateman. Beneath the violence lies a biting critique of consumerism, status obsession, and hollow ambition...',
    author: 'Thompson P.',
    date: '30 May 2026',
  },
];

export default function LatestArticles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showAll, setShowAll] = useState(false);

  const filteredMovies = moviesData.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Reviews' || movie.tag === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const visibleMovies = showAll ? filteredMovies : filteredMovies.slice(0, 6);
  const hasMoreMovies = !showAll && filteredMovies.length > 6;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setShowAll(false);
  };

  return (
    <section className="articles-section">
      <h2>Latest Movie Reviews</h2>

      <div className="filter-bar filter-bar-desktop">
        <div className="tabs">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'tab active' : 'tab'}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="filter-bar-mobile">
        <div className="search-box mobile-search">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="category-field">
          <label className="category-label" htmlFor="category-select">
            Category
          </label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="articles-grid">
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie) => <BlogCard key={movie.id} {...movie} />)
        ) : (
          <p className="no-results">No movies found. Try a different search or category.</p>
        )}
      </div>

      {hasMoreMovies && (
        <button type="button" className="view-more" onClick={() => setShowAll(true)}>
          View more
        </button>
      )}
    </section>
  );
}
