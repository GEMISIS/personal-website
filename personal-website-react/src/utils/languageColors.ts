export interface LanguageInfo {
  className: string;
  displayText: string;
}

export const getLanguageInfo = (language: string): LanguageInfo => {
  switch (language) {
    case 'C#':
      return {
        className: 'csharp',
        displayText: '\u00A0\u00A0C#', // Non-breaking spaces
      };
    case 'Unity':
      return {
        className: 'csharp',
        displayText: 'Unity',
      };
    case 'Unreal':
      return {
        className: 'cpp',
        displayText: 'Unreal',
      };
    case 'HTML':
      return {
        className: 'html',
        displayText: 'HTML',
      };
    case 'JavaScript':
      return {
        className: 'html',
        displayText: 'JS',
      };
    case 'Java':
      return {
        className: 'java',
        displayText: 'Java',
      };
    case 'Android':
      return {
        className: 'java',
        displayText: 'Andr.',
      };
    case 'C':
      return {
        className: 'cpp',
        displayText: '\u00A0\u00A0\u00A0C', // Non-breaking spaces
      };
    case 'C++':
      return {
        className: 'cpp',
        displayText: '\u00A0\u00A0C++', // Non-breaking spaces
      };
    case 'Assembly':
      return {
        className: 'assembly',
        displayText: 'Asm.',
      };
    case 'Python':
      return {
        className: 'python',
        displayText: 'Pyt.',
      };
    default:
      return {
        className: 'default',
        displayText: language.substring(0, 3) + '.',
      };
  }
};
