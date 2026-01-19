export interface Resume {
  file: string;
  title: string;
}

export interface ResumeConfig {
  hasContactInfo: boolean;
  resumes: Resume[];
}
