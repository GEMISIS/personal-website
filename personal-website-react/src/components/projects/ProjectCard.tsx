'use client';

import { getLanguageInfo } from '@/utils/languageColors';
import type { Project, MediaUrl } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onMediaClick: (mediaUrls: MediaUrl[], projectName: string) => void;
}

export default function ProjectCard({ project, onMediaClick }: ProjectCardProps) {
  const languageInfo = getLanguageInfo(project.language);

  // Combine media_url and media_urls into single array
  const mediaUrls: MediaUrl[] = [];
  if (project.media_url) {
    mediaUrls.push(project.media_url);
  }
  if (project.media_urls) {
    mediaUrls.push(...project.media_urls);
  }

  const handleMediaClick = () => {
    if (mediaUrls.length > 0) {
      onMediaClick(mediaUrls, project.name);
    }
  };

  return (
    <div className="col-md-3 mb-4">
      <div className={`project project-radius project-${languageInfo.className}`}>
        {project.language && project.language !== 'None' && (
          <div className="shape">
            <div
              className="shape-text"
              dangerouslySetInnerHTML={{ __html: languageInfo.displayText }}
            />
          </div>
        )}

        <div className="project-content">
          <h3 className="lead">{project.name}</h3>

          {mediaUrls.length > 0 && (
            <button
              className="btn btn-link"
              onClick={handleMediaClick}
              style={{ padding: 0 }}
            >
              <i className="fa fa-film" aria-hidden="true"></i> Media
            </button>
          )}

          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-link"
            >
              <i className="fa fa-github" aria-hidden="true"></i> Repo
            </a>
          )}

          {project.download_url && (
            <a
              href={project.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-link"
            >
              <i className="fa fa-download" aria-hidden="true"></i> Download
            </a>
          )}

          {project.demo_url && (
            <a
              href={project.demo_url.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-link"
            >
              <i className="fa fa-play-circle" aria-hidden="true"></i> Demo
            </a>
          )}

          <hr />

          <p dangerouslySetInnerHTML={{ __html: project.description }} />
        </div>
      </div>
    </div>
  );
}
