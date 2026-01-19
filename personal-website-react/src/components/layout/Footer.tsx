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
        <div id="social_media_links" className="text-center center-block">
          {config.social_medias.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
            >
              <i
                id={social.id}
                className={`fa fa-3x social ${social.icon}`}
                aria-hidden="true"
              ></i>
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
