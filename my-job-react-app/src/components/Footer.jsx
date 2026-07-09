import React from 'react';

function SocialIcon({ href, label, children }) {
  return (
    <a href={href} className="social-link" aria-label={label} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bar">
        <div className="footer-left">
          <span className="footer-label">Get in touch</span>
          <div className="social-icons">
            <SocialIcon href="https://linkedin.com" label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.5 8.5h3v9h-3v-9zm1.5-4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zm4 4.5h2.9v1.2h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v4.76h-3v-4.22c0-1.01-.02-2.3-1.4-2.3-1.42 0-1.64 1.1-1.64 2.24v4.28h-3v-9z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://github.com" label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.12-1.46-1.12-1.46-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.55 2.36 1.1 2.94.84.09-.66.35-1.1.64-1.35-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://google.com" label="Google">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.2 14.2h-1.6v-4.8H8.4V9.6h2.2V8.1c0-2 1.2-3.1 3-3.1.86 0 1.76.15 1.76.15v1.94h-.99c-.98 0-1.29.61-1.29 1.23v1.48h2.2l-.35 2.8h-1.85v4.8z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        <a href="#" className="footer-home">Home page</a>
      </div>
    </footer>
  );
}
