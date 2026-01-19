'use client';

import { useConfig } from '@/context/ConfigContext';

export default function BioSection() {
  const { config } = useConfig();

  if (!config) return null;

  return (
    <>
      <img
        id="bio_pic"
        src={config.user_picture}
        alt={config.user}
        className="col-md-7"
        style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', borderRadius: '15%' }}
      />
      <h1 id="bio_name">About {config.user}</h1>
      <span id="bio_text" dangerouslySetInnerHTML={{ __html: config.user_bio }} />
    </>
  );
}
