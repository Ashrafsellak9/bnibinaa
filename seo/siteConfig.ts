/** Réseaux officiels (profils publics). */
export const INSTAGRAM_URL = 'https://www.instagram.com/bni.bina/';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/anass-fathallah-2100b62a5/';

/** URL publique du site (sans slash final). À définir dans `.env` : `VITE_PUBLIC_SITE_URL=https://votredomaine.ma` */
export const SITE_ORIGIN: string = (() => {
  const raw =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_PUBLIC_SITE_URL
      ? String(import.meta.env.VITE_PUBLIC_SITE_URL).trim()
      : '';
  return (raw.replace(/\/$/, '') || 'https://bnibina.ma') as string;
})();

/** Image Open Graph absolue (min. ~1200×630 recommandé pour LinkedIn). Optionnel : `VITE_PUBLIC_OG_IMAGE` */
export function defaultOgImageUrl(): string {
  const custom =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_PUBLIC_OG_IMAGE
      ? String(import.meta.env.VITE_PUBLIC_OG_IMAGE).trim()
      : '';
  if (custom) return custom;
  return `${SITE_ORIGIN}/og-default.svg`;
}
