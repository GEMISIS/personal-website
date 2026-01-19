'use client';

import { useConfig } from '@/context/ConfigContext';
import ResumeSection from './ResumeSection';

export default function ProfileSection() {
  const { config } = useConfig();

  if (!config) return null;

  // Handle possessive form for welcome text
  const possessiveForm = config.user.endsWith('s') ? "'" : "'s";

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="row">
          <div id="picture_frame" className="col-md-4 text-center">
            <img
              src={config.user_picture}
              alt={config.user}
              className="rounded-circle img-fluid"
              style={{ maxWidth: '85%' }}
            />
          </div>
          <div className="col-md-8">
            <h1 id="welcome_text" className="jumbotron-heading">
              Welcome to {config.user}{possessiveForm} website!
            </h1>
            <p
              className="lead text-muted"
              id="description_text"
              dangerouslySetInnerHTML={{ __html: config.user_bio_brief }}
            />
            <ResumeSection />
          </div>
        </div>
      </div>
    </div>
  );
}
