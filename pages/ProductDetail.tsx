
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ShoppingCart, Truck, ShieldCheck, MapPin, Star, ArrowLeft, Leaf, ChevronRight } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  return (
    <div className="pt-32 pb-20 bg-lightGray min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
           <Link to="/materiaux" className="hover:text-primary">Catalogue</Link>
           <ChevronRight size={14} aria-hidden="true" />
           <span className="text-gray-600 font-medium">{product.category}</span>
           <ChevronRight size={14} aria-hidden="true" />
           <span className="text-darkGray font-bold">{product.name}</span>
        </div>

        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden">
           <div className="grid lg:grid-cols-2">
              {/* Image Gallery */}
              <div className="bg-gray-50 p-12 flex items-center justify-center">
                 <div className="relative group">
                    <img src={product.image} alt={`${product.name} — ${product.brand}, photographie produit catalogue BNI BINA`} className="max-w-full h-auto rounded-3xl shadow-2xl transition-transform group-hover:scale-105" />
                    {product.isEco && (
                       <div className="absolute top-4 left-4 bg-success text-white p-3 rounded-full shadow-lg" title="Produit éco-responsable" aria-label="Produit éco-responsable">
                          <Leaf size={24} aria-hidden="true" />
                       </div>
                    )}
                 </div>
              </div>

              {/* Product Info */}
              <div className="p-12 lg:p-20">
                 <div className="flex justify-between items-start mb-4">
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{product.brand}</span>
                    <div className="flex items-center text-warning">
                       <Star size={18} fill="currentColor" />
                       <span className="ml-2 font-bold text-darkGray">{product.rating}</span>
                       <span className="ml-1 text-gray-400 text-sm">(24 avis)</span>
                    </div>
                 </div>

                 <h1 className="text-4xl lg:text-5xl font-black mb-6">{product.name}</h1>
                 
                 <div className="mb-8">
                    <span className="text-5xl font-black text-primary">{product.price}</span>
                    <span className="text-xl font-bold text-gray-400 ml-2">DH / unité</span>
                 </div>

                 <p className="text-gray-500 leading-relaxed text-lg mb-10">
                    Ce produit de haute qualité, sélectionné par nos experts BNI BINA, garantit une résistance optimale et une finition impeccable pour vos travaux. Conforme aux normes de construction marocaines.
                 </p>

                 <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                       <Truck className="text-primary" />
                       <span>Livraison sous 48h</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                       <ShieldCheck className="text-primary" />
                       <span>Garantie 2 ans</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                       <MapPin className="text-primary" />
                       <span>Dispo à Marrakech & Casa</span>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center border-2 border-gray-100 rounded-2xl">
                       <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-4 font-bold">-</button>
                       <span className="px-5 py-4 font-bold text-lg">{quantity}</span>
                       <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-4 font-bold">+</button>
                    </div>
                    <button className="flex-1 bg-primary text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center hover:bg-primaryDark transition-all shadow-xl shadow-primary/20">
                       <ShoppingCart className="mr-3" /> Ajouter au Panier
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Technical Specs */}
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white p-10 rounded-[40px] shadow-lg">
              <h2 className="text-2xl font-bold mb-8">Caractéristiques Techniques</h2>
              <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                 {[
                   { label: 'Matériau', value: 'Composite Premium' },
                   { label: 'Poids', value: '25kg / sac' },
                   { label: 'Consommation', value: '1.2 kg / m²' },
                   { label: 'Origine', value: 'Maroc' },
                   { label: 'Usage', value: 'Intérieur / Extérieur' },
                   { label: 'Certification', value: 'ISO 9001' },
                 ].map((spec, i) => (
                   <div key={i} className="flex justify-between border-b border-gray-50 pb-4">
                      <span className="text-gray-400 font-medium">{spec.label}</span>
                      <span className="text-darkGray font-bold">{spec.value}</span>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bg-darkGray p-10 rounded-[40px] text-white">
              <h3 className="text-xl font-bold mb-6">Conseil d'Expert</h3>
              <p className="text-gray-400 mb-8 leading-relaxed italic">
                "Pour une application optimale de ce produit, nous recommandons de préparer le support 24h à l'avance. N'hésitez pas à nous appeler pour un conseil technique gratuit."
              </p>
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold">AR</div>
                 <div>
                    <p className="font-bold">Ahmed R.</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Chef de Chantier</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
