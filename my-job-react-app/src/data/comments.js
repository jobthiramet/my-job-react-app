const STORAGE_KEY = 'blog_post_comments';
const LIKES_STORAGE_KEY = 'blog_post_likes';
const GUEST_ID_KEY = 'blog_guest_id';
const DEFAULT_LIKE_COUNT = 321;

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80';

const defaultCommentsByPost = {
  default: [
    {
      id: 'c1',
      name: 'Jacob Lash',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      createdAt: '2024-09-12T18:30:00.000Z',
      text: 'I loved this article! It really explains why my favorite films stay with me for days. The pacing section was super interesting.',
    },
    {
      id: 'c2',
      name: 'Ahri',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      createdAt: '2024-09-12T18:45:00.000Z',
      text: "Such a great read! I've always wondered how directors build tension so quietly—now I understand it better.",
    },
    {
      id: 'c3',
      name: 'Mimi mama',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80',
      createdAt: '2024-09-13T09:12:00.000Z',
      text: 'This article perfectly captures why cinema feels so personal. Fascinating stuff!',
    },
  ],
};

function readStore() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore invalid storage
  }

  return {};
}

function writeStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function readLikesStore() {
  try {
    const stored = localStorage.getItem(LIKES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore invalid storage
  }

  return {};
}

function writeLikesStore(store) {
  localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(store));
}

export function getGuestId() {
  try {
    const existing = localStorage.getItem(GUEST_ID_KEY);
    if (existing) {
      return existing;
    }

    const nextId = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(GUEST_ID_KEY, nextId);
    return nextId;
  } catch {
    return 'guest-local';
  }
}

export function getLikeState(postId, userKey) {
  const store = readLikesStore();
  const key = String(postId);
  const entry = store[key] || { extraLikes: 0, likedBy: [] };
  const likedBy = entry.likedBy || [];
  const liked = Boolean(userKey && likedBy.includes(userKey));

  return {
    count: DEFAULT_LIKE_COUNT + (entry.extraLikes || 0),
    liked,
  };
}

export function togglePostLike(postId, userKey) {
  if (!userKey) {
    return getLikeState(postId, userKey);
  }

  const store = readLikesStore();
  const key = String(postId);
  const entry = store[key] || { extraLikes: 0, likedBy: [] };
  const likedBy = [...(entry.likedBy || [])];
  const alreadyLiked = likedBy.includes(userKey);

  if (alreadyLiked) {
    store[key] = {
      extraLikes: Math.max(0, (entry.extraLikes || 0) - 1),
      likedBy: likedBy.filter((id) => id !== userKey),
    };
  } else {
    store[key] = {
      extraLikes: (entry.extraLikes || 0) + 1,
      likedBy: [...likedBy, userKey],
    };
  }

  writeLikesStore(store);
  return getLikeState(postId, userKey);
}

export function getCommentsForPost(postId) {
  const store = readStore();
  const key = String(postId);

  if (store[key]) {
    return store[key];
  }

  return defaultCommentsByPost.default;
}

export function addCommentToPost(postId, comment) {
  const store = readStore();
  const key = String(postId);
  const existing = store[key] || defaultCommentsByPost.default;
  const nextComment = {
    id: `c-${Date.now()}`,
    name: comment.name,
    avatar: comment.avatar || DEFAULT_AVATAR,
    createdAt: new Date().toISOString(),
    text: comment.text.trim(),
  };

  const nextList = [nextComment, ...existing];
  store[key] = nextList;
  writeStore(store);

  return nextList;
}

export function formatCommentDate(value) {
  return new Date(value).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', ' at');
}
