const STORAGE_KEY = 'blog_registered_users';
const SESSION_KEY = 'blog_current_user';

export const ROLES = {
  USER: 'user',
  ADMIN_IT: 'admin_it',
  ADMIN_BLOG: 'admin_blog',
};

export const ROLE_LABELS = {
  [ROLES.USER]: 'User',
  [ROLES.ADMIN_IT]: 'AdminIT',
  [ROLES.ADMIN_BLOG]: 'AdminBlog',
};

export const ASSIGNABLE_ROLES = [ROLES.USER, ROLES.ADMIN_IT, ROLES.ADMIN_BLOG];

export const defaultUsers = [
  {
    name: 'Thompson P.',
    username: 'thompson',
    email: 'thompson@example.com',
    password: 'password123',
    role: ROLES.ADMIN_BLOG,
    createdAt: '2026-06-01T10:00:00.000Z',
    lastLoginAt: null,
  },
  {
    name: 'Admin IT',
    username: 'admin.it',
    email: 'admin.it@example.com',
    password: 'password123',
    role: ROLES.ADMIN_IT,
    createdAt: '2026-06-01T10:00:00.000Z',
    lastLoginAt: null,
  },
  {
    name: 'Moodeng ja',
    username: 'moodeng.cute',
    email: 'moodeng.cute@gmail.com',
    password: 'moodeng123',
    role: ROLES.USER,
    createdAt: '2026-06-15T10:00:00.000Z',
    lastLoginAt: null,
  },
];

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function normalizeRole(role) {
  if (role === 'admin') return ROLES.ADMIN_BLOG;
  if (role === ROLES.ADMIN_IT || role === ROLES.ADMIN_BLOG || role === ROLES.USER) {
    return role;
  }
  return ROLES.USER;
}

function withRole(user) {
  if (!user) return null;

  if (user.role) {
    return {
      ...user,
      role: normalizeRole(user.role),
    };
  }

  const email = user.email?.toLowerCase();
  let role = ROLES.USER;
  if (email === 'thompson@example.com') role = ROLES.ADMIN_BLOG;
  if (email === 'admin.it@example.com') role = ROLES.ADMIN_IT;

  return {
    ...user,
    role,
  };
}

function toPublicUser(user) {
  if (!user) return null;

  const normalized = withRole(user);
  const { password, ...publicUser } = normalized;
  return publicUser;
}

export function getRoleLabel(role) {
  return ROLE_LABELS[normalizeRole(role)] || ROLE_LABELS[ROLES.USER];
}

export function isAdminIT(user) {
  return withRole(user)?.role === ROLES.ADMIN_IT;
}

export function isAdminBlog(user) {
  return withRole(user)?.role === ROLES.ADMIN_BLOG;
}

/** Either AdminIT or AdminBlog can open the admin panel. */
export function isAdmin(user) {
  const role = withRole(user)?.role;
  return role === ROLES.ADMIN_IT || role === ROLES.ADMIN_BLOG;
}

export function canManageUsers(user) {
  return isAdminIT(user);
}

export function canManageBlog(user) {
  return isAdminBlog(user);
}

/** Both admin roles can delete comments and blog content. */
export function canModerateContent(user) {
  return isAdmin(user);
}

export function getRegisteredUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const users = JSON.parse(stored).map(withRole);
      const emails = new Set(users.map((user) => user.email.toLowerCase()));
      let changed = false;

      defaultUsers.forEach((seed) => {
        if (!emails.has(seed.email.toLowerCase())) {
          users.push(withRole(seed));
          changed = true;
        }
      });

      const migrated = users.map((user) => {
        const nextRole = normalizeRole(user.role);
        if (nextRole !== user.role) {
          changed = true;
          return { ...user, role: nextRole };
        }
        return user;
      });

      if (changed) {
        saveUsers(migrated);
      }

      return migrated;
    }
  } catch {
    // ignore invalid storage data
  }

  return defaultUsers.map(withRole);
}

export function getPublicUsers() {
  return getRegisteredUsers().map(toPublicUser);
}

export function registerUser(user) {
  const users = getRegisteredUsers();
  const now = new Date().toISOString();
  const newUser = {
    ...user,
    role: ROLES.USER,
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

export function updateManagedUser(email, updates, actorEmail) {
  const users = getRegisteredUsers();
  const index = users.findIndex(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (index === -1) {
    throw new Error('User not found.');
  }

  const target = withRole(users[index]);
  const nextRole = updates.role !== undefined ? normalizeRole(updates.role) : target.role;
  const nextName = updates.name !== undefined ? updates.name.trim() : target.name;

  if (!nextName) {
    throw new Error('Name is required.');
  }

  if (!ASSIGNABLE_ROLES.includes(nextRole)) {
    throw new Error('Invalid role.');
  }

  if (
    actorEmail &&
    target.email.toLowerCase() === actorEmail.trim().toLowerCase() &&
    nextRole !== ROLES.ADMIN_IT
  ) {
    throw new Error('You cannot remove your own AdminIT role.');
  }

  users[index] = {
    ...target,
    name: nextName,
    role: nextRole,
  };
  saveUsers(users);

  return toPublicUser(users[index]);
}

export function deleteManagedUser(email, actorEmail) {
  const normalizedEmail = email.trim().toLowerCase();
  const actor = actorEmail?.trim().toLowerCase();

  if (actor && normalizedEmail === actor) {
    throw new Error('You cannot delete your own account.');
  }

  const users = getRegisteredUsers();
  const next = users.filter((user) => user.email.toLowerCase() !== normalizedEmail);

  if (next.length === users.length) {
    throw new Error('User not found.');
  }

  saveUsers(next);
  return next.map(toPublicUser);
}
