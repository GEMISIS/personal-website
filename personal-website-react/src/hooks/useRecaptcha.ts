'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement | string, options: {
        sitekey: string;
        callback: (token: string) => void;
        size?: 'invisible' | 'compact' | 'normal';
      }) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

export const useRecaptcha = (siteKey: string, callback: (token: string) => void) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!siteKey || scriptLoadedRef.current) return;

    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    scriptLoadedRef.current = true;

    script.onload = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.ready(() => {
          if (recaptchaRef.current && window.grecaptcha) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: siteKey,
              callback: callback,
              size: 'normal',
            });
          }
        });
      }
    };

    return () => {
      // Cleanup if needed
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, [siteKey, callback]);

  return recaptchaRef;
};
