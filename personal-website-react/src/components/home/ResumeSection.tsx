'use client';

import { useConfig } from '@/context/ConfigContext';
import { Dropdown } from 'react-bootstrap';

export default function ResumeSection() {
  const { resumes } = useConfig();

  if (!resumes || !resumes.resumes || resumes.resumes.length === 0) {
    return null;
  }

  return (
    <div id="resume_section">
      <hr />
      <p className="lead text-muted">Want a copy of my resume? Select a version to download!</p>
      <Dropdown className="show">
        <Dropdown.Toggle variant="secondary" id="resume_default_item">
          Select Resume
        </Dropdown.Toggle>
        <Dropdown.Menu id="resume_menu">
          {resumes.resumes.map((resume, index) => (
            <Dropdown.Item
              key={index}
              href={resume.file}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resume.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
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
