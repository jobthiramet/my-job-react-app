const STORAGE_KEY = 'blog_registered_users';

export const defaultUsers = [
  {
    name: 'Thompson P.',
    username: 'thompson',
    email: 'thompson@example.com',
    password: 'password123',
  },
  {
    name: 'Moodeng ja',
    username: 'moodeng.cute',
    email: 'moodeng.cute@gmail.com',
    password: 'moodeng123',
  },
];

export function getRegisteredUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore invalid storage data
  }

  return defaultUsers;
}

export function registerUser(user) {
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function authenticateUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  return getRegisteredUsers().find(
    (user) =>
      user.email.toLowerCase() === normalizedEmail && user.password === password,
  );
}
