import React, { useState } from 'react';
import BlogCard from './BlogCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { categories, moviesData } from '../data/movies';

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
