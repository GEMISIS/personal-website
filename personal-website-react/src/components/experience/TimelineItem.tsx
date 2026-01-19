'use client';

import { formatDate } from '@/utils/dateFormatter';
import type { ExperienceItem, DefaultIcons } from '@/types/experience';

interface TimelineItemProps {
  item: ExperienceItem;
  defaultIcons: DefaultIcons;
  inverted: boolean;
  showLine: boolean;
}

export default function TimelineItem({ item, defaultIcons, inverted, showLine }: TimelineItemProps) {
  // Determine border color based on time type
  const getBorderColor = () => {
    switch (item.time) {
      case 'end':
        return '#983b72'; // Purple for end
      case 'start':
      default:
        return '#3b5998'; // Blue for start/default
    }
  };

  const borderColor = getBorderColor();

  return (
    <li className={inverted ? 'timeline-inverted' : ''}>
      <div
        className="timeline-image"
        style={{
          borderColor: borderColor,
          backgroundColor: borderColor,
        }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="rounded-circle img-fluid"
          />
        ) : (
          <svg className="img-fluid svg-icon" viewBox="0 0 256 256">
            <object
              data={defaultIcons[item.type]}
              type="image/svg+xml"
              width="100%"
              height="100%"
              aria-label={item.title}
            />
          </svg>
        )}
      </div>

      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4>{formatDate(item.date)}</h4>
          <h3 className="heading">{item.title}</h3>
          <h4 className="subheading">{item.subtitle}</h4>
        </div>
        <div className="timeline-body">
          <p
            className="text-muted"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      </div>

      {showLine && <div className="line"></div>}
    </li>
  );
}
