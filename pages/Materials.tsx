
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Leaf, Star, Truck, MapPin, ChevronRight, LayoutGrid, List, ArrowRight, X, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { getCategories } from '../utils/materialsLoader';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';

const Materials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtres avancés
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyEco, setOnlyEco] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const categories = useMemo(() => getCategories(), []);

  // Extraire toutes les marques uniques
  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    PRODUCTS.forEach(p => brands.add(p.brand));
    return Array.from(brands).sort();
  }, []);

  // Calculer les prix min/max réels
  const priceRange = useMemo(() => {
    const prices = PRODUCTS.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, []);

  // Initialiser les prix avec les valeurs réelles
  React.useEffect(() => {
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
  }, [priceRange.min, priceRange.max]);

  // Filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Tous' || p.category === activeCategory;
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchesAvailable = !onlyAvailable || p.available;
      const matchesEco = !onlyEco || p.isEco;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesAvailable && matchesEco && matchesBrand;
    });

    // Trier les produits
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, activeCategory, minPrice, maxPrice, onlyAvailable, onlyEco, selectedBrands, sortBy]);

  // Réinitialiser les filtres
  const resetFilters = () => {
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setOnlyAvailable(false);
    setOnlyEco(false);
    setSelectedBrands([]);
    setSortBy('default');
    setSearchTerm('');
    setActiveCategory('Tous');
  };

  // Toggle une marque dans la sélection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Compter les filtres actifs
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (minPrice !== priceRange.min || maxPrice !== priceRange.max) count++;
    if (onlyAvailable) count++;
    if (onlyEco) count++;
    if (selectedBrands.length > 0) count++;
    if (sortBy !== 'default') count++;
    return count;
  }, [minPrice, maxPrice, onlyAvailable, onlyEco, selectedBrands.length, sortBy, priceRange]);

  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">Sourcing & Logistique</h2>
            <h1 className="text-5xl md:text-7xl font-black font-heading text-darkGray section-title uppercase tracking-tighter">
              Catalogue <br/> <span className="text-gray-300">Technique.</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative group">
                <label htmlFor="materials-catalog-search" className="sr-only">Rechercher dans le catalogue par nom ou marque</label>
                <input 
                  id="materials-catalog-search"
                  type="search" 
                  placeholder="RECHERCHE RÉFÉRENCE..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-lightGray border-none p-6 pl-14 text-[10px] font-black uppercase tracking-widest w-80 max-w-full outline-none focus:ring-2 ring-primary/20 transition-all"
                  autoComplete="off"
                />
                <Search className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary" size={18} aria-hidden="true" />
             </div>
             <button
               type="button"
               onClick={() => setShowFilters(!showFilters)}
               className={`relative bg-lightGray p-6 transition-all hover:bg-gray-200 ${showFilters ? 'bg-primary text-white' : ''}`}
               aria-label="Ouvrir ou fermer les filtres du catalogue"
               aria-expanded={showFilters}
             >
               <SlidersHorizontal size={18} aria-hidden="true" />
               {activeFiltersCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                   {activeFiltersCount}
                 </span>
               )}
             </button>
             <div className="hidden sm:flex border border-gray-100 rounded-sm" role="group" aria-label="Mode d’affichage du catalogue">
                <button type="button" onClick={() => setViewMode('grid')} className={`p-4 ${viewMode === 'grid' ? 'bg-darkGray text-white' : 'text-gray-400 hover:text-darkGray'}`} aria-pressed={viewMode === 'grid'} aria-label="Affichage en grille"><LayoutGrid size={20} aria-hidden="true"/></button>
                <button type="button" onClick={() => setViewMode('list')} className={`p-4 ${viewMode === 'list' ? 'bg-darkGray text-white' : 'text-gray-400 hover:text-darkGray'}`} aria-pressed={viewMode === 'list'} aria-label="Affichage en liste"><List size={20} aria-hidden="true"/></button>
             </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex overflow-x-auto no-scrollbar space-x-px bg-gray-100 border border-gray-100 flex-1">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-10 py-6 text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white text-gray-500 hover:text-darkGray'}`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-6 flex items-center space-x-4">
            <label htmlFor="materials-sort" className="sr-only">Trier les résultats du catalogue</label>
            <select
              id="materials-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-lightGray border-none p-4 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 ring-primary/20"
            >
              <option value="default">Trier par</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name-asc">Nom A-Z</option>
              <option value="name-desc">Nom Z-A</option>
              <option value="rating-desc">Meilleure note</option>
            </select>
            <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest" role="status" aria-live="polite">
              {filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Panneau de filtres latéral */}
        <div className={`fixed inset-0 z-50 transition-all duration-300 ${showFilters ? 'visible' : 'invisible'}`}>
          <div 
            className={`absolute inset-0 bg-black/50 transition-opacity ${showFilters ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setShowFilters(false)}
          />
          <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${showFilters ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight">Filtres</h2>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Fermer les filtres"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              {/* Prix */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h3 id="materials-filters-price" className="text-sm font-black uppercase tracking-widest text-gray-600 mb-6">Prix (MAD)</h3>
                <div className="space-y-4" aria-labelledby="materials-filters-price">
                  <div className="flex items-center space-x-4">
                    <label htmlFor="materials-price-min" className="sr-only">Prix minimum en MAD</label>
                    <input
                      id="materials-price-min"
                      type="number"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Math.max(priceRange.min, Math.min(Number(e.target.value), maxPrice)))}
                      className="flex-1 bg-lightGray border-none p-4 text-sm font-bold outline-none focus:ring-2 ring-primary/20"
                      placeholder="Min"
                    />
                    <span className="text-gray-500 font-bold" aria-hidden="true">-</span>
                    <label htmlFor="materials-price-max" className="sr-only">Prix maximum en MAD</label>
                    <input
                      id="materials-price-max"
                      type="number"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Math.min(priceRange.max, Math.max(Number(e.target.value), minPrice)))}
                      className="flex-1 bg-lightGray border-none p-4 text-sm font-bold outline-none focus:ring-2 ring-primary/20"
                      placeholder="Max"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="materials-range-min" className="sr-only">Curseur prix minimum</label>
                    <input
                      id="materials-range-min"
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      aria-label="Ajuster le prix minimum du catalogue"
                    />
                    <label htmlFor="materials-range-max" className="sr-only">Curseur prix maximum</label>
                    <input
                      id="materials-range-max"
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-2"
                      aria-label="Ajuster le prix maximum du catalogue"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 font-bold">
                    <span>{priceRange.min} MAD</span>
                    <span>{priceRange.max} MAD</span>
                  </div>
                </div>
              </div>

              {/* Disponibilité */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-600 mb-4">Disponibilité</h3>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onlyAvailable}
                    onChange={(e) => setOnlyAvailable(e.target.checked)}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  <span className="text-sm font-bold text-darkGray group-hover:text-primary transition-colors">
                    Uniquement disponible
                  </span>
                </label>
              </div>

              {/* Éco-friendly */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-600 mb-4">Caractéristiques</h3>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onlyEco}
                    onChange={(e) => setOnlyEco(e.target.checked)}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  <div className="flex items-center space-x-2">
                    <Leaf className="text-success" size={18} aria-hidden="true" />
                    <span className="text-sm font-bold text-darkGray group-hover:text-primary transition-colors">
                      Éco-responsable uniquement
                    </span>
                  </div>
                </label>
              </div>

              {/* Marques */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-600 mb-4">Marques</h3>
                <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                  {allBrands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center space-x-3 cursor-pointer group py-2 hover:bg-gray-50 px-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-5 h-5 accent-primary cursor-pointer"
                      />
                      <span className="text-sm font-bold text-darkGray group-hover:text-primary transition-colors flex-1">
                        {brand}
                      </span>
                      {selectedBrands.includes(brand) && (
                        <CheckCircle2 className="text-primary" size={18} aria-hidden="true" />
                      )}
                    </label>
                  ))}
                </div>
                {selectedBrands.length > 0 && (
                  <button
                    onClick={() => setSelectedBrands([])}
                    className="mt-4 text-xs text-primary font-bold uppercase tracking-widest hover:underline"
                  >
                    Effacer la sélection ({selectedBrands.length})
                  </button>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full bg-gray-100 text-darkGray py-4 text-sm font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                  Réinitialiser
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-primary text-white py-4 text-sm font-black uppercase tracking-widest hover:bg-primaryDark transition-all"
                >
                  Appliquer les filtres
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 shadow-xl" : "space-y-4"}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-12 group hover:bg-gray-50 transition-all flex flex-col relative overflow-hidden">
              <div className="absolute top-8 left-8 z-10">
                 {product.isEco && <Leaf className="text-success" size={20} />}
              </div>
              
              <Link to={`/materiaux/${product.id}`} className="block aspect-square mb-12 overflow-hidden bg-gray-50 flex items-center justify-center p-8">
                <img src={product.image} alt={`${product.name} — ${product.brand}, catalogue BNI BINA`} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
              </Link>
              
              <div className="mt-auto">
                 <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{product.brand}</p>
                    <div className="flex items-center text-warning">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-black ml-1">{product.rating}</span>
                    </div>
                 </div>
                 <h3 className="text-xl font-black uppercase tracking-tight mb-8 group-hover:text-primary transition-colors">{product.name}</h3>
                 
                 <div className="flex items-end justify-between border-t border-gray-100 pt-8">
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Prix Unitaire</p>
                       <p className="text-3xl font-black text-darkGray">{product.price} <span className="text-sm font-bold text-gray-300">MAD</span></p>
                    </div>
                    <Link 
                      to={`/materiaux/${product.id}`}
                      className="bg-darkGray text-white p-4 group-hover:bg-primary transition-all"
                    >
                      <ArrowRight size={20} />
                    </Link>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-gray-100">
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Aucune référence disponible</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Materials;
