import { moviesData, categories as movieCategories } from './movies';

const STORAGE_KEY = 'blog_admin_articles';
const CATEGORIES_KEY = 'blog_admin_categories';

export const DEFAULT_CATEGORIES = movieCategories.filter((item) => item !== 'All Reviews');
export const ARTICLE_STATUSES = ['all', 'published', 'draft'];

function formatDisplayDate(value = new Date()) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function seedFromMovies() {
  return moviesData.map((movie) => ({
    id: movie.id,
    title: movie.title,
    category: movie.tag,
    status: 'published',
    description: movie.description,
    thumbnail: movie.image,
    author: movie.author,
    date: movie.date,
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
    content: movie.content,
  }));
}

function readArticles() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore invalid storage
  }

  const seeded = seedFromMovies();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function writeArticles(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

export function getAdminArticles() {
  return readArticles().sort((a, b) => Number(b.id) - Number(a.id));
}

export function getAdminArticleById(id) {
  const numericId = Number(id);
  return getAdminArticles().find((item) => Number(item.id) === numericId) || null;
}

export function getNextArticleId() {
  const articles = getAdminArticles();
  return articles.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
}

export function createAdminArticle({ title, category, description, thumbnail, status, author }) {
  const now = new Date().toISOString();
  const article = {
    id: getNextArticleId(),
    title: title.trim(),
    category,
    status,
    description: description.trim(),
    thumbnail,
    author: author || 'Thompson P.',
    date: formatDisplayDate(now),
    createdAt: now,
    updatedAt: now,
    content: {
      intro: description.trim(),
      sections: [
        {
          heading: '1. Overview',
          paragraphs: [description.trim()],
        },
      ],
    },
  };

  const articles = getAdminArticles();
  articles.unshift(article);
  writeArticles(articles);
  return article;
}

export function updateAdminArticle(id, updates) {
  const articles = getAdminArticles();
  const index = articles.findIndex((item) => Number(item.id) === Number(id));
  if (index === -1) return null;

  const now = new Date().toISOString();
  const next = {
    ...articles[index],
    ...updates,
    title: updates.title?.trim?.() ?? articles[index].title,
    description: updates.description?.trim?.() ?? articles[index].description,
    updatedAt: now,
    date: formatDisplayDate(now),
  };

  if (updates.description) {
    next.content = {
      intro: next.description,
      sections: [
        {
          heading: '1. Overview',
          paragraphs: [next.description],
        },
      ],
    };
  }

  articles[index] = next;
  writeArticles(articles);
  return next;
}

export function deleteAdminArticle(id) {
  const articles = getAdminArticles().filter((item) => Number(item.id) !== Number(id));
  writeArticles(articles);
  return articles;
}

export function articleToPublicPost(article) {
  return {
    id: article.id,
    title: article.title,
    tag: article.category,
    description: article.description,
    image: article.thumbnail,
    author: article.author,
    date: article.date,
    content: article.content || {
      intro: article.description,
      sections: [],
    },
  };
}

export function getPublishedBlogPosts() {
  return getAdminArticles()
    .filter((article) => article.status === 'published')
    .map(articleToPublicPost);
}

export function getPublishedBlogPostById(id) {
  const article = getAdminArticleById(id);
  if (!article || article.status !== 'published') {
    return null;
  }
  return articleToPublicPost(article);
}

export function getPublicBlogCategories() {
  return ['All Reviews', ...getAdminCategories()];
}

export function filterAdminArticles(articles, { search = '', status = 'all', category = 'all' }) {
  const query = search.trim().toLowerCase();

  return articles.filter((article) => {
    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query);
    const matchesStatus = status === 'all' || article.status === status;
    const matchesCategory = category === 'all' || article.category === category;
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

function readCategories() {
  try {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }

  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
  return [...DEFAULT_CATEGORIES];
}

function writeCategories(categories) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function getAdminCategories() {
  return readCategories();
}

/** @deprecated use getAdminCategories */
export const ARTICLE_CATEGORIES = DEFAULT_CATEGORIES;

export function filterAdminCategories(categories, search = '') {
  const query = search.trim().toLowerCase();
  if (!query) return categories;
  return categories.filter((item) => item.toLowerCase().includes(query));
}

export function updateAdminCategory(oldName, newName) {
  const trimmed = newName.trim();
  if (!trimmed) {
    throw new Error('Category name is required.');
  }

  const categories = getAdminCategories();
  if (trimmed !== oldName && categories.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
    throw new Error('Category name already exists.');
  }

  const nextCategories = categories.map((item) => (item === oldName ? trimmed : item));
  writeCategories(nextCategories);

  const articles = getAdminArticles().map((article) =>
    article.category === oldName ? { ...article, category: trimmed } : article,
  );
  writeArticles(articles);

  return nextCategories;
}

export function deleteAdminCategory(name) {
  const nextCategories = getAdminCategories().filter((item) => item !== name);
  writeCategories(nextCategories);

  const fallback = nextCategories[0] || 'Uncategorized';
  const articles = getAdminArticles().map((article) =>
    article.category === name ? { ...article, category: fallback } : article,
  );
  writeArticles(articles);

  return nextCategories;
}

export function createAdminCategory(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error('Category name is required.');
  }

  const categories = getAdminCategories();
  if (categories.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
    throw new Error('Category name already exists.');
  }

  const next = [...categories, trimmed];
  writeCategories(next);
  return next;
}
