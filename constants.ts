import { Service, ProjectCategory, Product, BlogPost, Testimonial, GalleryProject } from './types';
import { loadMaterials } from './utils/materialsLoader';

import imgConstructionBatiments from './images/Construction_Batiment.jpeg';
import imgTravauxDeConstruction from './images/Travaux_de_construction.png';
import imgPlomberieChauffage from './images/plomberie_chauffage.jpg';
import imgClimatisation from './images/Climatisation.jpeg';
import imgPoseDalles from './images/pose-dalles.jpg';
import imgMaconnerieAmenagement from './images/maconnerie_amenagement.jpg';
import imgPeinture from './images/Peinture.jpeg';
import imgMenuiserie from './images/Menuiserie.jpg';
import imgIsolation from './images/isolation.jpg';

export const SERVICES: Service[] = [
  { id: '1', title: 'Rénovation', description: 'Rénovation complète avec accompagnement sur mesure.', icon: 'Home' },
  { id: '2', title: 'Matériaux', description: 'Large gamme de matériaux de construction de qualité.', icon: 'Package' },
  { id: '3', title: 'Consultation', description: 'Conseil expert et expertise technique.', icon: 'ClipboardCheck' },
  { id: '4', title: 'Finitions', description: 'Travaux de peinture et revêtements haut de gamme.', icon: 'Paintbrush' },
  { id: '5', title: 'Maintenance', description: 'Services de maintenance et réparation rapide.', icon: 'Wrench' },
];

export const CATEGORIES: ProjectCategory[] = [
  { id: '1', name: 'Construction Bâtiments', image: imgConstructionBatiments },
  { id: '2', name: 'Travaux de construction', image: imgTravauxDeConstruction },
  { id: '3', name: 'Revêtement de sol et de mur', image: imgPoseDalles },
  {
    id: '4',
    name: 'Électricité',
    image:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80&auto=format&fit=crop',
  },
  { id: '5', name: 'Plomberie et chauffage', image: imgPlomberieChauffage },
  { id: '6', name: 'Climatisation', image: imgClimatisation },
  { id: '7', name: 'Maçonnerie et aménagement', image: imgMaconnerieAmenagement },
  { id: '8', name: 'Peinture', image: imgPeinture },
  { id: '9', name: 'Menuiserie', image: imgMenuiserie },
  { id: '10', name: 'Isolation / Étanchéité', image: imgIsolation },
];

// Charger automatiquement tous les matériaux depuis les dossiers
export const PRODUCTS: Product[] = loadMaterials();

export const BLOG_POSTS: BlogPost[] = [
  { id: 'b1', title: '5 Tendances Rénovation en 2024', excerpt: 'Découvrez les styles qui vont marquer l\'année pour vos intérieurs au Maroc.', date: '12 Mars 2024', readTime: '5 min', author: 'Ahmed R.', category: 'Design', image: 'https://picsum.photos/seed/blog1/800/600' },
  { id: 'b2', title: 'Bien choisir son carrelage extérieur', excerpt: 'Nos conseils pour allier esthétique et durabilité face au climat marocain.', date: '05 Mars 2024', readTime: '4 min', author: 'Sara M.', category: 'Matériaux', image: 'https://picsum.photos/seed/blog2/800/600' },
  { id: 'b3', title: 'Optimiser l\'isolation thermique', excerpt: 'Comment réduire votre facture énergétique grâce à une bonne étanchéité.', date: '28 Fév 2024', readTime: '7 min', author: 'Karim L.', category: 'Technique', image: 'https://picsum.photos/seed/blog3/800/600' },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Mme Benjelloun', role: 'Propriétaire Appartement', content: 'Une rénovation impeccable à Marrakech. L\'équipe de BNI BINA a respecté les délais et le budget.', avatar: 'https://i.pravatar.cc/150?u=t1' },
  { id: 't2', name: 'Mr El Fassi', role: 'Architecte', content: 'Je recommande BNI BINA pour la qualité de leurs matériaux et leur expertise technique sur le gros œuvre.', avatar: 'https://i.pravatar.cc/150?u=t2' },
];

export const GALLERY: GalleryProject[] = [
  { id: 'g1', title: 'Rénovation Villa Gueliz', category: 'Villa', budget: 'Élevé', style: 'Moderne', beforeImg: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop', afterImg: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop' },
  { id: 'g2', title: 'Cuisine Loft Casablanca', category: 'Appartement', budget: 'Moyen', style: 'Industriel', beforeImg: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e8?q=80&w=2070&auto=format&fit=crop', afterImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop' },
];
