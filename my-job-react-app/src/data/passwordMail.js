/**
 * Sends the account password to the user's real inbox via FormSubmit.
 * First request to a new address may only send an activation email —
 * after the user confirms, the next request delivers the password.
 */
export async function sendPasswordToEmail(user) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(user.email)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: 'hh. Blog',
        subject: 'Your hh. account password',
        message: [
          `Hi ${user.name},`,
          '',
          'You requested a password reminder for your hh. account.',
          '',
          `Password: ${user.password}`,
          '',
          'You can now log in with this password.',
          '',
          'If you did not request this, you can ignore this email.',
        ].join('\n'),
        _template: 'box',
        _captcha: false,
      }),
    },
  );

  let data = {};
  try {
    data = await response.json();
  } catch {
    // FormSubmit occasionally returns non-JSON on edge cases
  }

  if (!response.ok || data.success === false || data.success === 'false') {
    throw new Error(
      data.message ||
        'Unable to send the password email. Please try again in a moment.',
    );
  }

  return {
    to: user.email,
    subject: 'Your hh. account password',
    providerMessage: typeof data.message === 'string' ? data.message : '',
  };
}
