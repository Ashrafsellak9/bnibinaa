
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart, Search } from 'lucide-react';
import logo from '@/BniBinaLogo.png';
import { SHOW_MATERIAUX_IN_PUBLIC_UI } from '../../featureFlags';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Expertise', to: '/' },
    { name: 'Réalisations', to: '/galerie' },
    { name: 'Matériaux', to: '/materiaux' },
    { name: 'Estimation', to: '/estimateur' },
    { name: 'Contact', to: '/contact' },
  ].filter((link) => SHOW_MATERIAUX_IN_PUBLIC_UI || link.name !== 'Matériaux');

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled || isOpen ? 'bg-white py-3 border-b border-gray-100 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center z-[120]">
            <img 
              src={logo}
              alt="BNI BINA — accueil" 
              className={`h-16 md:h-20 w-auto transition-all duration-500 ${!scrolled && !isOpen ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-primary relative group ${scrolled ? 'text-darkGray' : 'text-white'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="hidden sm:flex items-center space-x-6 border-r pr-8 border-gray-200/20">
               <button
                 type="button"
                 className={`transition-colors ${scrolled ? 'text-darkGray' : 'text-white/70 hover:text-white'}`}
                 aria-label="Rechercher sur le site (fonction à venir)"
               >
                  <Search size={20} aria-hidden="true" />
               </button>
            </div>
            <Link
              to="/espace-pro"
              className="hidden sm:block btn-premium bg-primary text-white px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-primaryDark transition-colors"
            >
              Espace Pro
            </Link>
            
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 z-[120] transition-colors ${scrolled || isOpen ? 'text-darkGray' : 'text-white'}`}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Fullscreen Mobile Menu */}
      <div id="mobile-navigation" className={`fixed inset-0 bg-white z-[110] lg:hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} aria-hidden={!isOpen}>
        <div className="flex flex-col h-full px-8 pt-32 pb-12">
          <div className="space-y-6 flex-grow">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                to={link.to}
                className={`block text-4xl font-black uppercase tracking-tighter transition-all duration-500 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-8">
             <div className="flex flex-col space-y-6">
                <Link
                  to="/espace-pro"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center bg-primary text-white py-4 text-[10px] font-black uppercase tracking-widest"
                >
                  Espace Pro
                </Link>
                <a href="tel:0663488900" className="text-primary font-black text-xl flex items-center">
                   <Phone size={20} className="mr-3" /> 06 63 48 89 00
                </a>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Marrakech • Casablanca • Rabat</p>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
