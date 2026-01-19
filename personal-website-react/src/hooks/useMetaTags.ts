'use client';

import { useEffect } from 'react';
import { useConfig } from '@/context/ConfigContext';

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const useMetaTags = (pageTitle: string) => {
  const { config } = useConfig();

  useEffect(() => {
    if (!config) return;

    const title = pageTitle === 'Home' ? config.user : `${config.user} - ${pageTitle}`;
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', config.description);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', config.keywords.join(', '));

    // Setup Google Analytics if configured
    if (config.site_keys.google_site_tracking_id) {
      const trackingId = config.site_keys.google_site_tracking_id;

      // Check if script is already loaded
      if (!document.querySelector(`script[src*="googletagmanager"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `;
        document.head.appendChild(inlineScript);
      } else if (window.gtag) {
        // Track page view if gtag is already loaded
        window.gtag('config', trackingId, {
          page_path: window.location.pathname,
        });
      }
    }
  }, [config, pageTitle]);
};
