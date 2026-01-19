'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Config } from '@/types/config';
import type { ProjectsConfig } from '@/types/project';
import type { ExperienceConfig } from '@/types/experience';
import type { ResumeConfig } from '@/types/resume';

interface ConfigContextValue {
  config: Config | null;
  projects: ProjectsConfig | null;
  experience: ExperienceConfig | null;
  resumes: ResumeConfig | null;
  loading: boolean;
  error: Error | null;
}

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
};

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config | null>(null);
  const [projects, setProjects] = useState<ProjectsConfig | null>(null);
  const [experience, setExperience] = useState<ExperienceConfig | null>(null);
  const [resumes, setResumes] = useState<ResumeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const [configRes, projectsRes, experienceRes, resumesRes] = await Promise.all([
          fetch('/configs/config.json'),
          fetch('/configs/projects.json'),
          fetch('/configs/experience.json'),
          fetch('/configs/resumes.json'),
        ]);

        if (!configRes.ok || !projectsRes.ok || !experienceRes.ok || !resumesRes.ok) {
          throw new Error('Failed to fetch configuration files');
        }

        const [configData, projectsData, experienceData, resumesData] = await Promise.all([
          configRes.json(),
          projectsRes.json(),
          experienceRes.json(),
          resumesRes.json(),
        ]);

        setConfig(configData);
        setProjects(projectsData);
        setExperience(experienceData);
        setResumes(resumesData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchConfigs();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, projects, experience, resumes, loading, error }}>
      {children}
    </ConfigContext.Provider>
  );
};
