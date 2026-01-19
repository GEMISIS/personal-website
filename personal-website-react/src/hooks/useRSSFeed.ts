'use client';

import { useState, useEffect } from 'react';

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  thumbnail: string;
}

export interface RSSFeed {
  url: string;
  title: string;
  link: string;
  description: string;
}

export interface RSSData {
  feed: RSSFeed;
  items: RSSItem[];
}

export const useRSSFeed = (rssUrl: string | undefined) => {
  const [data, setData] = useState<RSSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!rssUrl) {
      setLoading(false);
      return;
    }

    const fetchRSS = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch RSS feed');
        }

        const rssData = await response.json();
        setData(rssData);
        setLoading(false);
      } catch (err) {
        console.error('Error getting RSS feed!', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchRSS();
  }, [rssUrl]);

  return { data, loading, error };
};
