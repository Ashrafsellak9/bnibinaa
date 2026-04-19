import { useEffect } from 'react';
import { SITE_ORIGIN, defaultOgImageUrl } from '../seo/siteConfig';
import type { PageSeo } from '../seo/resolvePageSeo';

function setOrCreateMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Met à jour titre, meta description, Open Graph et Twitter Cards (exécuté côté client à chaque route).
 */
export function usePageMeta(seo: PageSeo, pathname: string) {
  useEffect(() => {
    const title = seo.title.includes('BNI BINA') ? seo.title : `${seo.title} | BNI BINA`;
    document.title = title;

    setOrCreateMeta('name', 'description', seo.description);

    const pageUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : `${SITE_ORIGIN}${pathname}`;
    const ogImage =
      seo.image && (seo.image.startsWith('http://') || seo.image.startsWith('https://'))
        ? seo.image
        : seo.image
          ? new URL(seo.image, `${SITE_ORIGIN}/`).href
          : defaultOgImageUrl();

    setOrCreateMeta('property', 'og:title', title);
    setOrCreateMeta('property', 'og:description', seo.description);
    setOrCreateMeta('property', 'og:type', 'website');
    setOrCreateMeta('property', 'og:url', pageUrl);
    setOrCreateMeta('property', 'og:image', ogImage);
    setOrCreateMeta('property', 'og:locale', 'fr_MA');
    setOrCreateMeta('property', 'og:site_name', 'BNI BINA');

    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', title);
    setOrCreateMeta('name', 'twitter:description', seo.description);
    setOrCreateMeta('name', 'twitter:image', ogImage);

    setCanonical(pageUrl);
  }, [seo.title, seo.description, seo.image, pathname]);
}
