export type SiteLang = 'ru' | 'uk';

export const getSiteLang = (): SiteLang => {
  const lang = new URLSearchParams(window.location.search).get('lang');
  return lang === 'uk' ? 'uk' : 'ru';
};

export const isUk = (): boolean => getSiteLang() === 'uk';
