export interface MediaInfo {
  type: 'youtube' | 'vimeo' | 'nativeVideo' | 'image' | 'unknown';
  id: string;
  url: string;
}

export const detectMediaType = (url: string): MediaInfo => {
  // YouTube detection
  const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[2].length === 11) {
    return {
      type: 'youtube',
      id: youtubeMatch[2],
      url: url,
    };
  }

  // Vimeo detection
  const vimeoRegex = /^.*(vimeo.com\/|video\/)([^#\&\?]*).*/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      id: vimeoMatch[2],
      url: url,
    };
  }

  // Native video detection
  const videoExtensions = ['.mp4', '.ogg', '.webm'];
  const lowerUrl = url.toLowerCase();
  if (videoExtensions.some(ext => lowerUrl.endsWith(ext))) {
    return {
      type: 'nativeVideo',
      id: url,
      url: url,
    };
  }

  // Image detection
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg'];
  if (imageExtensions.some(ext => lowerUrl.endsWith(ext))) {
    return {
      type: 'image',
      id: url,
      url: url,
    };
  }

  return {
    type: 'unknown',
    id: url,
    url: url,
  };
};
