export const CONTACT_NAME = 'Леся Афанасьева';
export const CONTACT_NAME_DE = 'Lesya Afanasyeva';
export const CONTACT_ADDRESS = 'Ferbornstraße 1A, 35619 Braunfels';
export const CONTACT_PHONE_DISPLAY = '+49 1517 4402744';
export const CONTACT_PHONE_RAW = '4915174402744';
export const CONTACT_EMAIL = 'lesiaafanasjew@gmail.com';

const whatsappMessage = 'Здравствуйте, хочу записаться на консультацию.';
const telegramMessage = 'Здравствуйте, хочу записаться на консультацию.';

export const WHATSAPP_LINK = `https://wa.me/${CONTACT_PHONE_RAW}?text=${encodeURIComponent(whatsappMessage)}`;
export const TELEGRAM_LINK = `https://t.me/+${CONTACT_PHONE_RAW}?text=${encodeURIComponent(telegramMessage)}`;

export type LegalPageKey = 'agb' | 'datenschutz' | 'impressum';

export const LEGAL_PAGE_TITLES: Record<LegalPageKey, string> = {
  agb: 'AGB',
  datenschutz: 'Datenschutzerklärung',
  impressum: 'Impressum',
};

export const getLegalHref = (page: LegalPageKey) => {
  const baseUrl = import.meta.env.BASE_URL;
  return `${baseUrl}?page=${page}`;
};

export const getHomeHref = (hash?: string) => {
  const baseUrl = import.meta.env.BASE_URL;
  return hash ? `${baseUrl}${hash}` : baseUrl;
};
