import { PRODUCTS, BLOG_POSTS } from '../constants';

export type PageSeo = {
  title: string;
  description: string;
  /** Image OG absolue (URL complète) */
  image?: string;
};

const DEFAULT_HOME: PageSeo = {
  title: 'BNI BINA — Rénovation & construction haut de gamme au Maroc',
  description:
    'Expert BTP au Maroc : rénovation résidentielle et tertiaire, second œuvre, matériaux et accompagnement technique. Marrakech, Casablanca, Rabat.',
};

const STATIC: Record<string, PageSeo> = {
  '/': DEFAULT_HOME,
  '/estimateur': {
    title: 'Estimateur de projet — BNI BINA',
    description:
      'Estimez en quelques minutes le budget indicatif de votre rénovation ou travaux au Maroc. Outil gratuit BNI BINA.',
  },
  '/materiaux': {
    title: 'Catalogue matériaux — BNI BINA',
    description:
      'Catalogue technique de matériaux de construction et finitions : sourcing, références et conseils BNI BINA.',
  },
  '/galerie': {
    title: 'Réalisations & galerie chantiers — BNI BINA',
    description:
      'Découvrez nos rénovations et chantiers au Maroc : avant/après, villas, appartements et projets clés en main.',
  },
  '/blog': {
    title: 'Blog & conseils rénovation — BNI BINA',
    description:
      'Articles techniques et conseils : rénovation, matériaux, isolation et tendances pour vos projets au Maroc.',
  },
  '/contact': {
    title: 'Contact — BNI BINA',
    description:
      'Contactez BNI BINA pour un devis, une visite technique ou une question sur votre projet de rénovation au Maroc.',
  },
  '/espace-pro': {
    title: 'Espace Pro — partenaires & devis volume — BNI BINA',
    description:
      'Espace dédié aux professionnels : devis volume, logistique chantier, sourcing matériaux et support technique BNI BINA.',
  },
};

export function resolvePageSeo(pathname: string, productId?: string, blogId?: string): PageSeo {
  if (blogId) {
    const post = BLOG_POSTS.find((b) => b.id === blogId);
    if (post) {
      return {
        title: `${post.title} — BNI BINA`,
        description: post.excerpt,
        image: post.image.startsWith('http') ? post.image : undefined,
      };
    }
    return STATIC['/blog'];
  }
  if (productId && pathname.startsWith('/materiaux')) {
    const p = PRODUCTS.find((x) => x.id === productId);
    if (p) {
      return {
        title: `${p.name} (${p.brand}) — Catalogue BNI BINA`,
        description: `Référence catalogue : ${p.name}, marque ${p.brand}, catégorie ${p.category}. Prix indicatif ${p.price} MAD. BNI BINA Maroc.`,
        image: p.image.startsWith('http') ? p.image : undefined,
      };
    }
    return STATIC['/materiaux'];
  }
  return STATIC[pathname] ?? STATIC['/'];
}
