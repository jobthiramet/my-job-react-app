const STORAGE_KEY = 'blog_registered_users';
const SESSION_KEY = 'blog_current_user';

export const defaultUsers = [
  {
    name: 'Thompson P.',
    username: 'thompson',
    email: 'thompson@example.com',
    password: 'password123',
    role: 'admin',
    createdAt: '2026-06-01T10:00:00.000Z',
    lastLoginAt: null,
  },
  {
    name: 'Moodeng ja',
    username: 'moodeng.cute',
    email: 'moodeng.cute@gmail.com',
    password: 'moodeng123',
    role: 'user',
    createdAt: '2026-06-15T10:00:00.000Z',
    lastLoginAt: null,
  },
];

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function withRole(user) {
  if (!user) return null;

  if (user.role) {
    return user;
  }

  return {
    ...user,
    role: user.email?.toLowerCase() === 'thompson@example.com' ? 'admin' : 'user',
  };
}

function toPublicUser(user) {
  if (!user) return null;

  const normalized = withRole(user);
  const { password, ...publicUser } = normalized;
  return publicUser;
}

export function isAdmin(user) {
  return withRole(user)?.role === 'admin';
}

export function getRegisteredUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored).map(withRole);
    }
  } catch {
    // ignore invalid storage data
  }

  return defaultUsers;
}

export function registerUser(user) {
  const users = getRegisteredUsers();
  const now = new Date().toISOString();
  const newUser = {
    ...user,
    role: 'user',
    createdAt: now,
    lastLoginAt: now,
  };

  users.push(newUser);
  saveUsers(users);

  return toPublicUser(newUser);
}

export function authenticateUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getRegisteredUsers();
  const index = users.findIndex(
    (user) =>
      user.email.toLowerCase() === normalizedEmail && user.password === password,
  );

  if (index === -1) {
    return null;
  }

  const now = new Date().toISOString();
  users[index] = {
    ...withRole(users[index]),
    lastLoginAt: now,
  };
  saveUsers(users);

  return toPublicUser(users[index]);
}

export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      return toPublicUser(JSON.parse(stored));
    }
  } catch {
    // ignore invalid storage data
  }

  return null;
}

export function setCurrentUser(user) {
  const publicUser = toPublicUser(user);
  localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export function clearCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function updateUserProfile(email, updates) {
  const users = getRegisteredUsers();
  const index = users.findIndex(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (index === -1) {
    throw new Error('User not found.');
  }

  const nextUser = {
    ...withRole(users[index]),
    name: updates.name?.trim() || users[index].name,
    username: updates.username?.trim() || users[index].username,
    avatar: updates.avatar !== undefined ? updates.avatar : users[index].avatar,
  };

  users[index] = nextUser;
  saveUsers(users);
  return toPublicUser(nextUser);
}

export function updateUserPassword(email, nextPassword) {
  const users = getRegisteredUsers();
  const index = users.findIndex(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (index === -1) {
    throw new Error('User not found.');
  }

  users[index] = {
    ...withRole(users[index]),
    password: nextPassword,
  };
  saveUsers(users);
  return toPublicUser(users[index]);
}
