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
    <div className="row">
      <div className="col-xl-15">
        {settings.description && (
          <p
            id="timeline_description"
            dangerouslySetInnerHTML={{ __html: settings.description }}
          />
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
    </div>
  );
}
