'use client';

import ProjectCard from './ProjectCard';
import type { Project, MediaUrl } from '@/types/project';

interface ProjectGridProps {
  projects: Project[];
  onMediaClick: (mediaUrls: MediaUrl[], projectName: string) => void;
}

export default function ProjectGrid({ projects, onMediaClick }: ProjectGridProps) {
  return (
    <div className="row" id="project_cards">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          onMediaClick={onMediaClick}
        />
      ))}
    </div>
  );
}
