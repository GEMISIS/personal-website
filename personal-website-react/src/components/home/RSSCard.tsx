'use client';

import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import type { RSSItem, RSSFeed } from '@/hooks/useRSSFeed';

interface RSSCardProps {
  item: RSSItem;
  feed: RSSFeed;
}

export default function RSSCard({ item, feed }: RSSCardProps) {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Determine default image based on feed URL
    let defaultImage = '';
    const feedUrl = feed.url.toLowerCase();

    if (feedUrl.indexOf('medium.com') > -1) {
      defaultImage = '/images/png/medium-white.png';
    } else if (feedUrl.indexOf('blogspot.com') > -1) {
      defaultImage = '/images/png/blogger.png';
    } else if (feedUrl.indexOf('wordpress.com') > -1) {
      defaultImage = '/images/png/wordpress.png';
    } else {
      // Default placeholder
      const width = 505;
      const height = 300;
      const text = 'No Image Found';
      defaultImage = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22${width}%22%20height%3D%22${height}%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20${width}%20${height}%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_166b7013b46%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A25pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_166b7013b46%22%3E%3Crect%20width%3D%22${width}%22%20height%3D%22${height}%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2222125.56666564941406%22%20y%3D%2222160.19999961853027%22%3E${text}%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`;
    }

    setImageSrc(defaultImage);

    // Try to load the thumbnail
    if (item.thumbnail) {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth > 100 || img.naturalHeight > 100) {
          setImageSrc(item.thumbnail);
        }
      };
      img.src = item.thumbnail;
    }
  }, [item.thumbnail, feed.url]);

  // Extract plain text from HTML description
  const getPlainText = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const description = getPlainText(item.description).substring(0, 200);
  const descriptionWithEllipsis = description + (description.length >= 200 ? '...' : '');

  return (
    <Card style={{ width: '100%', marginBottom: '20px' }}>
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <Card.Img
          variant="top"
          src={imageSrc}
          alt={item.title}
          style={{ width: '100%', height: '207px', objectFit: 'cover' }}
        />
      </a>
      <Card.Body style={{ minHeight: '200px', maxHeight: '200px', overflow: 'hidden' }}>
        <Card.Title>{getPlainText(item.title)}</Card.Title>
        <Card.Text style={{ display: 'flex', overflow: 'hidden' }}>
          {descriptionWithEllipsis}
        </Card.Text>
      </Card.Body>
      <Card.Body style={{ marginTop: '2.5%' }}>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Click to Read
        </a>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Published: {item.pubDate.split(' ')[0]}
        </small>
      </Card.Footer>
    </Card>
  );
}
