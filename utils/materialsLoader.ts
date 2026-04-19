import { Product } from '../types';

// Mapping des noms de dossiers vers les catégories affichées
const categoryMapping: Record<string, string> = {
  'BOSCH': 'Outillage',
  'COLLE': 'Gros Œuvre',
  'ELEC': 'Électricité',
  'ETANCHITET': 'Isolation',
  'FER': 'Gros Œuvre',
  'ISOLATION': 'Isolation',
  'machine': 'Outillage',
  'MATERIAUX DE SECURITE': 'Sécurité',
  'mp': 'Gros Œuvre',
  'OUTILLAGE BOSCH': 'Outillage',
  'OUTILLAGE': 'Outillage',
  'PEINTURE': 'Peinture',
  'PLOMBRIE': 'Plomberie',
  'QUINCAILLERIE': 'Quincaillerie',
  'SABLE': 'Gros Œuvre',
  'SANITAIRE GLORY': 'Plomberie',
};

// Fonction pour extraire le nom de catégorie depuis le chemin
function getCategoryFromPath(path: string): string {
  // Le chemin est comme: materiaux/PEINTURE-20260115T195348Z-3-001/PEINTURE/image.png
  const parts = path.split('/');
  if (parts.length >= 2) {
    const folderName = parts[1];
    // Extraire le nom avant le timestamp (ex: PEINTURE-20260115T195348Z-3-001 -> PEINTURE)
    const categoryName = folderName.split('-')[0];
    return categoryMapping[categoryName] || categoryName;
  }
  return 'Autre';
}

// Fonction pour générer un nom de produit depuis le nom de fichier
function generateProductName(filename: string): string {
  // Enlever l'extension
  let name = filename.replace(/\.(webp|jpg|jpeg|png|avif|avif)$/i, '');
  
  // Enlever les patterns communs (dimensions, etc.)
  name = name.replace(/[-_]?\d+x\d+/gi, ''); // Enlever 430x430, etc.
  name = name.replace(/[-_]?\d+$/g, ''); // Enlever les numéros à la fin
  name = name.replace(/^[-_\d]+/g, ''); // Enlever les numéros au début
  
  // Remplacer les underscores et tirets multiples par des espaces
  name = name.replace(/[_-]+/g, ' ');
  
  // Capitaliser la première lettre de chaque mot
  name = name.split(' ')
    .filter(word => word.length > 0)
    .map(word => {
      // Préserver les acronymes en majuscules
      if (word === word.toUpperCase() && word.length <= 5) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ')
    .trim();
  
  // Nettoyer les numéros seuls ou patterns communs
  if (!name || /^\d+$/.test(name)) {
    // Essayer d'extraire quelque chose d'utile du nom de fichier original
    const original = filename.replace(/\.(webp|jpg|jpeg|png|avif)$/i, '');
    if (original.length > 0) {
      return original.split(/[-_]/).slice(0, 3).join(' ').trim() || 'Produit';
    }
    return 'Produit';
  }
  
  return name;
}

// Charger toutes les images du dossier materiaux
const materialImages = import.meta.glob('/materiaux/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  as: 'url'
}) as Record<string, string>;

// Générer les produits à partir des images
export function loadMaterials(): Product[] {
  const products: Product[] = [];
  let productId = 1;

  // Grouper les images par catégorie
  const imagesByCategory: Record<string, Array<{ path: string; url: string; filename: string }>> = {};

  for (const [path, url] of Object.entries(materialImages)) {
    // Ignorer les fichiers .url
    if (path.endsWith('.url')) continue;

    const category = getCategoryFromPath(path);
    const filename = path.split('/').pop() || 'image';
    
    if (!imagesByCategory[category]) {
      imagesByCategory[category] = [];
    }
    
    imagesByCategory[category].push({ path, url: url as string, filename });
  }

  // Créer un produit pour chaque image
  for (const [category, images] of Object.entries(imagesByCategory)) {
    for (const image of images) {
      const productName = generateProductName(image.filename);
      
      products.push({
        id: `mat-${productId++}`,
        name: productName,
        brand: category,
        category: category,
        price: Math.floor(Math.random() * 1000) + 50, // Prix aléatoire entre 50 et 1050 MAD
        rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // Rating entre 3.5 et 5.0
        image: image.url,
        isEco: Math.random() > 0.7, // 30% de chance d'être éco
        available: true,
      });
    }
  }

  return products;
}

// Obtenir toutes les catégories uniques
export function getCategories(): string[] {
  const categories = new Set<string>();
  for (const [path] of Object.entries(materialImages)) {
    if (path.endsWith('.url')) continue;
    const category = getCategoryFromPath(path);
    categories.add(category);
  }
  return ['Tous', ...Array.from(categories).sort()];
}
