'use client';

import { useConfig } from '@/context/ConfigContext';

export default function ResumeSection() {
  const { resumes } = useConfig();

  // Don't show anything if no resumes, but don't return null to avoid layout shift
  if (!resumes || !resumes.resumes || resumes.resumes.length === 0) {
    return <div id="resume_section" style={{ display: 'none' }} />;
  }

  return (
    <div id="resume_section">
      <hr />
      <p className="lead text-muted">Want a copy of my resume? Select a version to download!</p>
      <div className="dropdown">
        <a
          id="resume_default_item"
          className="btn btn-secondary dropdown-toggle"
          href="javascript:void(0)"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Select Resume
        </a>
        <div id="resume_menu" className="dropdown-menu" aria-labelledby="resume_default_item">
          {resumes.resumes.map((resume, index) => (
            <a
              key={index}
              className="dropdown-item"
              href={resume.file}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resume.title}
            </a>
          ))}
        </div>
      </div>
      {!resumes.hasContactInfo && (
        <div id="has_contact_info">
          <p className="text-info">
            <b>Note: </b>Resumes do not contain contact info for privacy reasons.<br />
            Use the <a href="/contact">contact form</a> to request a version with it.
          </p>
        </div>
      )}
    </div>
  );
}
