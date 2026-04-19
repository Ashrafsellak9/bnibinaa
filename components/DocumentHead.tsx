import React from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { resolvePageSeo } from '../seo/resolvePageSeo';

/**
 * Synchronise titre, meta description et balises Open Graph / Twitter à chaque navigation.
 */
const DocumentHead: React.FC = () => {
  const { pathname } = useLocation();
  const productMatch = useMatch('/materiaux/:id');
  const blogMatch = useMatch('/blog/:id');

  const is404 =
    pathname !== '/' &&
    !['/estimateur', '/materiaux', '/galerie', '/blog', '/contact', '/espace-pro'].includes(pathname) &&
    !pathname.startsWith('/materiaux/') &&
    !pathname.startsWith('/blog/');

  const seo = is404
    ? {
        title: 'Page introuvable (404)',
        description: 'La page demandée n’existe pas ou a été déplacée. Retournez à l’accueil BNI BINA.',
      }
    : resolvePageSeo(pathname, productMatch?.params.id, blogMatch?.params.id);

  usePageMeta(seo, pathname);
  return null;
};

export default DocumentHead;
