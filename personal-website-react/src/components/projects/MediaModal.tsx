'use client';

import { useState, useEffect } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import { detectMediaType } from '@/utils/mediaDetector';
import type { MediaUrl } from '@/types/project';

interface MediaModalProps {
  show: boolean;
  onHide: () => void;
  mediaUrls: MediaUrl[];
  projectName: string;
}

export default function MediaModal({ show, onHide, mediaUrls, projectName }: MediaModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [previousProject, setPreviousProject] = useState('');

  // Reset to first tab when project changes
  useEffect(() => {
    if (projectName !== previousProject) {
      setActiveTab(0);
      setPreviousProject(projectName);
    }
  }, [projectName, previousProject]);

  const renderMedia = (mediaUrl: MediaUrl) => {
    const mediaInfo = detectMediaType(mediaUrl.url);

    switch (mediaInfo.type) {
      case 'youtube':
        return (
          <iframe
            id="modalVideo"
            src={`https://www.youtube.com/embed/${mediaInfo.id}`}
            frameBorder="0"
            className="modal-video d-block mx-auto"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ width: '100%', height: '500px' }}
          />
        );

      case 'vimeo':
        return (
          <iframe
            id="modalVideo"
            src={`https://player.vimeo.com/video/${mediaInfo.id}`}
            frameBorder="0"
            className="modal-video d-block mx-auto"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ width: '100%', height: '500px' }}
          />
        );

      case 'nativeVideo':
        return (
          <video
            id="modalVideo"
            className="modal-video d-block mx-auto"
            controls
            style={{ width: '100%', maxHeight: '500px' }}
          >
            <source src={mediaInfo.url} />
            Your browser does not support the video tag.
          </video>
        );

      case 'image':
        return (
          <img
            id="modalImage"
            src={mediaInfo.url}
            alt={mediaUrl.title}
            className="modal-image d-block mx-auto img-fluid"
            style={{ maxWidth: '100%' }}
          />
        );

      default:
        return (
          <iframe
            id="modalDemo"
            src={mediaInfo.url}
            frameBorder="0"
            className="modal-demo d-block mx-auto"
            style={{ width: '100%', height: '500px' }}
          />
        );
    }
  };

  if (mediaUrls.length === 0) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{projectName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mediaUrls.length > 1 && (
          <Nav variant="tabs" className="mb-3">
            {mediaUrls.map((media, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  active={activeTab === index}
                  onClick={() => setActiveTab(index)}
                >
                  {media.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        )}

        <div className="tab-content">
          {renderMedia(mediaUrls[activeTab])}
        </div>
      </Modal.Body>
    </Modal>
  );
}
