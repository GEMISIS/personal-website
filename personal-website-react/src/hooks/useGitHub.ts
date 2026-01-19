'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { GitHubRepo } from '@/types/project';

export const useGitHub = (username?: string) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [cachedRepos, setCachedRepos] = useLocalStorage<GitHubRepo[]>('github_repos', []);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!response.ok) {
          // If we get a rate limit or error, use cached data
          console.warn('GitHub API request failed, using cached data');
          setRepos(cachedRepos);
          setLoading(false);
          return;
        }

        const data: GitHubRepo[] = await response.json();

        // Filter out forked repos
        const nonForkedRepos = data.filter(repo => !repo.fork);

        setRepos(nonForkedRepos);
        setCachedRepos(nonForkedRepos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        // Use cached data on error
        setRepos(cachedRepos);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]); // Removed cachedRepos and setCachedRepos from deps to prevent infinite loop

  return { repos, loading, error };
};
