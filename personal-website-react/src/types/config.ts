export interface SocialMedia {
  id: string;
  name: string;
  color: string;
  icon: string;
  link: string;
}

export interface SiteKeys {
  google_site_tracking_id: string;
  google_recaptcha_key: string;
}

export interface Config {
  static: boolean;
  formspree_link: string;
  formspree_gold: boolean;
  user: string;
  rss_link: string;
  user_picture: string;
  user_bio: string;
  user_bio_brief: string;
  description: string;
  keywords: string[];
  site_keys: SiteKeys;
  contact_subjects: string[];
  social_medias: SocialMedia[];
}
