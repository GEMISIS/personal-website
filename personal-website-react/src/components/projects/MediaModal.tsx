'use client';

import { useState, useEffect } from 'react';
import { Modal, Nav, Button } from 'react-bootstrap';
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

  const renderMedia = (mediaUrl: MediaUrl, isActive: boolean) => {
    const mediaInfo = detectMediaType(mediaUrl.url);
    let tabClass = 'tab-pane fade';
    let containerClass = '';

    if (isActive) {
      tabClass += ' show active';
    }

    switch (mediaInfo.type) {
      case 'youtube':
        containerClass = 'video-tab';
        return (
          <div className={tabClass} role="tabpanel">
            <div className={containerClass}>
              <iframe
                id="modalVideo"
                src={`https://www.youtube.com/embed/${mediaInfo.id}`}
                frameBorder="0"
                className="modal-video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        );

      case 'vimeo':
        containerClass = 'video-tab';
        return (
          <div className={tabClass} role="tabpanel">
            <div className={containerClass}>
              <iframe
                id="modalVideo"
                src={`https://player.vimeo.com/video/${mediaInfo.id}`}
                frameBorder="0"
                className="modal-video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        );

      case 'nativeVideo':
        containerClass = 'video-tab';
        return (
          <div className={tabClass} role="tabpanel">
            <div className={containerClass}>
              <video
                id="modalVideo"
                className="modal-video"
                controls
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              >
                <source src={mediaInfo.url} />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        );

      case 'image':
        containerClass = 'image-tab';
        return (
          <div className={tabClass} role="tabpanel">
            <div className={containerClass}>
              <img
                id="modalImage"
                src={mediaInfo.url}
                alt={mediaUrl.title}
                className="modal-image d-block mx-auto"
              />
            </div>
          </div>
        );

      default:
        containerClass = 'video-tab';
        return (
          <div className={tabClass} role="tabpanel">
            <div className={containerClass}>
              <iframe
                id="modalDemo"
                src={mediaInfo.url}
                frameBorder="0"
                className="modal-demo"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        );
    }
  };

  if (mediaUrls.length === 0) return null;

  // Determine if current media is image to set appropriate height
  const currentMedia = mediaUrls[activeTab];
  const currentMediaInfo = detectMediaType(currentMedia?.url || '');
  const isImage = currentMediaInfo.type === 'image';
  const modalBodyHeight = isImage ? 'auto' : '500px';
  const modalBodyMinHeight = isImage ? '300px' : '500px';

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="modalTitle">{projectName} Media</Modal.Title>
      </Modal.Header>
      {mediaUrls.length > 1 && (
        <Nav variant="tabs" id="mediaModalTabs" role="tablist">
          {mediaUrls.map((media, index) => (
            <Nav.Item key={index}>
              <Nav.Link
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
                role="tab"
                aria-selected={activeTab === index}
              >
                {media.title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      )}
      <Modal.Body
        className="tab-content"
        id="mediaModalBody"
        style={{
          position: 'relative',
          width: '100%',
          height: modalBodyHeight,
          minHeight: modalBodyMinHeight
        }}
      >
        {mediaUrls.map((media, index) => (
          <div
            key={index}
            style={{
              display: activeTab === index ? 'block' : 'none',
              width: '100%',
              height: '100%'
            }}
          >
            {renderMedia(media, activeTab === index)}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
