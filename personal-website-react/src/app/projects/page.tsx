'use client';

import { useState, useMemo } from 'react';
import { useMetaTags } from '@/hooks/useMetaTags';
import { useConfig } from '@/context/ConfigContext';
import { useGitHub } from '@/hooks/useGitHub';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectGrid from '@/components/projects/ProjectGrid';
import MediaModal from '@/components/projects/MediaModal';
import LoadingSpinner from '@/components/projects/LoadingSpinner';
import type { Project, MediaUrl, GitHubRepo } from '@/types/project';

export default function ProjectsPage() {
  useMetaTags('Projects');
  const { projects: projectsConfig, loading: configLoading } = useConfig();
  const { repos, loading: githubLoading } = useGitHub(projectsConfig?.github_username);

  const [showModal, setShowModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaUrl[]>([]);
  const [selectedProject, setSelectedProject] = useState('');

  // Merge GitHub repos with manual projects
  const allProjects = useMemo(() => {
    if (!projectsConfig) return [];

    const manualProjects = projectsConfig.projects || [];

    // Convert GitHub repos to Project format
    const githubProjects: Project[] = repos.map((repo: GitHubRepo) => ({
      name: repo.name,
      description: repo.description || 'No description available',
      language: repo.language || 'Unknown',
      repo_url: repo.html_url,
      updated_at: repo.updated_at,
      demo_url: repo.homepage ? { title: 'Demo', url: repo.homepage } : undefined,
    }));

    // Combine and sort by updated_at
    const combined = [...manualProjects, ...githubProjects];
    combined.sort((a, b) => {
      const dateA = new Date(a.updated_at || 0).getTime();
      const dateB = new Date(b.updated_at || 0).getTime();
      return dateB - dateA;
    });

    return combined;
  }, [projectsConfig, repos]);

  const handleMediaClick = (mediaUrls: MediaUrl[], projectName: string) => {
    setSelectedMedia(mediaUrls);
    setSelectedProject(projectName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (configLoading || githubLoading) {
    return (
      <>
        <Header />
        <main role="main" style={{ paddingTop: '3.0rem', marginBottom: '5%' }}>
          <LoadingSpinner />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main role="main" className="container" style={{ padding: '3.5rem 0.95rem', marginBottom: '10%' }}>
        <h1 className="text-center center-block" style={{ marginTop: '2%' }}>Projects</h1>

        <ProjectGrid projects={allProjects} onMediaClick={handleMediaClick} />

        <MediaModal
          show={showModal}
          onHide={handleCloseModal}
          mediaUrls={selectedMedia}
          projectName={selectedProject}
        />
      </main>
      <Footer />
    </>
  );
}
