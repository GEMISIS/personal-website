export interface ExperienceSettings {
  chronological: boolean;
  description: string;
}

export interface DefaultIcons {
  education: string;
  career: string;
  promo: string;
  experiment: string;
  achievement: string;
}

export interface ExperienceItem {
  date: string;
  time: 'start' | 'mid' | 'end';
  title: string;
  subtitle: string;
  type: 'education' | 'career' | 'promo' | 'experiment' | 'achievement';
  image?: string;
  description: string;
}

export interface ExperienceConfig {
  settings: ExperienceSettings;
  default_icons: DefaultIcons;
  items: ExperienceItem[];
}
