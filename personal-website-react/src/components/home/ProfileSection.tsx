'use client';

import { useConfig } from '@/context/ConfigContext';
import Image from 'next/image';

export default function ProfileSection() {
  const { config } = useConfig();

  if (!config) return null;

  // Handle possessive form for welcome text
  const possessiveForm = config.user.endsWith('s') ? "'" : "'s";

  return (
    <div className="container" style={{ marginTop: '2.5%' }}>
      <div className="jumbotron text-center">
        <div id="picture_frame" className="text-center">
          <img
            src={config.user_picture}
            alt={config.user}
            className="rounded-circle img-fluid"
            style={{ maxWidth: '85%' }}
          />
        </div>
        <h1 className="display-5" id="welcome_text">
          Welcome to {config.user}{possessiveForm} website!
        </h1>
        <p
          className="lead"
          id="description_text"
          dangerouslySetInnerHTML={{ __html: config.user_bio_brief }}
        />
      </div>
    </div>
  );
}
