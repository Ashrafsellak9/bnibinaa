import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="pt-40 pb-32 bg-lightGray min-h-[70vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full text-center">
        <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8">Erreur 404</p>
        <h1 className="text-7xl sm:text-9xl font-black font-heading text-darkGray section-title uppercase tracking-tighter mb-4">
          404
        </h1>
        <p className="text-xl md:text-2xl font-bold text-darkGray uppercase tracking-tight mb-4 max-w-xl mx-auto">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <p className="text-gray-500 font-medium max-w-md mx-auto mb-12">
          Vérifiez l&apos;adresse ou revenez à l&apos;accueil pour poursuivre votre navigation.
        </p>
        <Link
          to="/"
          className="inline-flex items-center btn-premium bg-primary text-white px-10 py-5 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-primaryDark transition-all"
        >
          <Home size={18} className="mr-3" aria-hidden="true" />
          Retour à l&apos;accueil
          <ArrowRight size={18} className="ml-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
