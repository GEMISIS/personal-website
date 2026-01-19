'use client';

import { useConfig } from '@/context/ConfigContext';

export default function ResumeSection() {
  const { resumes } = useConfig();

  if (!resumes || !resumes.resumes || resumes.resumes.length === 0) {
    return null;
  }

  return (
    <div id="resume_section">
      <hr />
      <p className="lead text-muted">Want a copy of my resume? Select a version to download!</p>
      <div className="dropdown show">
        <a
          id="resume_default_item"
          className="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={(e) => e.preventDefault()}
        >
          Select Resume
        </a>
        <div id="resume_menu" className="dropdown-menu" aria-labelledby="dropdownMenuLink">
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
