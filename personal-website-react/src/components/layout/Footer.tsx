'use client';

import { useConfig } from '@/context/ConfigContext';

export default function Footer() {
  const { config } = useConfig();

  if (!config) return null;

  return (
    <>
      <style>
        {config.social_medias.map((social) => `
          #${social.id}:hover {
            color: ${social.color};
          }
        `).join('\n')}
      </style>
      <footer className="footer">
        <div className="container text-center">
          <div className="social-media-links">
            {config.social_medias.map((social) => (
              <a
                key={social.id}
                id={social.id}
                className="social-media-link"
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
              >
                <i className={`fa ${social.icon}`} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
