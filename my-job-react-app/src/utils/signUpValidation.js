const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9._]+$/;

export function validateSignUpForm(values, existingUsers) {
  const errors = {};
  const name = values.name.trim();
  const username = values.username.trim();
  const email = values.email.trim();
  const { password } = values;

  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!username) {
    errors.username = 'Username is required.';
  } else if (username.length < 3) {
    errors.username = 'Username must be at least 3 characters.';
  } else if (!USERNAME_PATTERN.test(username)) {
    errors.username = 'Username can only contain letters, numbers, dots, and underscores.';
  } else if (
    existingUsers.some((user) => user.username.toLowerCase() === username.toLowerCase())
  ) {
    errors.username = 'Username is already taken, Please try another username.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (existingUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    errors.email = 'Email is already taken, Please try another email.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  return errors;
}
