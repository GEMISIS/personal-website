'use client';

import TimelineItem from './TimelineItem';
import type { ExperienceConfig } from '@/types/experience';

interface TimelineProps {
  experienceConfig: ExperienceConfig;
}

export default function Timeline({ experienceConfig }: TimelineProps) {
  if (!experienceConfig) return null;

  const { items, settings, default_icons } = experienceConfig;

  // Sort items based on chronological setting
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return settings.chronological ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="container">
      {settings.description && (
        <div className="text-center mb-4">
          <p
            id="timeline_description"
            dangerouslySetInnerHTML={{ __html: settings.description }}
          />
        </div>
      )}

      <ul className="timeline" id="timeline_items">
        {sortedItems.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            defaultIcons={default_icons}
            inverted={index % 2 === 1}
            showLine={index < sortedItems.length - 1}
          />
        ))}
      </ul>
    </div>
  );
}
