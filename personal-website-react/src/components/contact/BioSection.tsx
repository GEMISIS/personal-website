'use client';

import { useConfig } from '@/context/ConfigContext';

export default function BioSection() {
  const { config } = useConfig();

  if (!config) return null;

  return (
    <div className="mt-4">
      <h3>About Me</h3>
      <div className="text-center mb-3">
        <img
          src={config.user_picture}
          alt={config.user}
          className="rounded-circle img-fluid"
          style={{ maxWidth: '200px' }}
        />
      </div>
      <p dangerouslySetInnerHTML={{ __html: config.user_bio }} />
    </div>
  );
}
