'use client';

import { useConfig } from '@/context/ConfigContext';
import { Dropdown } from 'react-bootstrap';

export default function ResumeSection() {
  const { resumes } = useConfig();

  if (!resumes || !resumes.resumes || resumes.resumes.length === 0) {
    return null;
  }

  return (
    <div className="container text-center" style={{ marginTop: '2.5%' }} id="resume_section">
      <h3>Download My Resume</h3>
      {!resumes.hasContactInfo && (
        <p id="has_contact_info">
          Note: Contact information has not been included in the online version for privacy reasons.
        </p>
      )}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="resume_dropdown">
          Select Resume Type
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
    </div>
  );
}
