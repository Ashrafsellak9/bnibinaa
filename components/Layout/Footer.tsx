
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import logo from '@/BniBinaLogo.png';
import { SHOW_MATERIAUX_IN_PUBLIC_UI } from '../../featureFlags';

const Footer: React.FC = () => {
  const phoneNumber = "06 63 48 89 00";
  const phoneNumberRaw = "0663488900";

  return (
    <footer className="bg-darkGray text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand Info */}
          <div className="space-y-8">
            <Link to="/" className="inline-block">
              <img 
                src={logo} 
                alt="BNI BINA — retour à l’accueil" 
                className="h-24 w-auto brightness-0 invert object-contain" // Logo en blanc pour le footer sombre
              />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Expert marocain en rénovation haut de gamme et distribution de matériaux de construction. Nous bâtissons vos rêves avec rigueur et passion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/5 p-3 rounded-xl hover:bg-primary transition-all group" aria-label="Instagram BNI BINA">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-xl hover:bg-primary transition-all group" aria-label="LinkedIn BNI BINA">
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-xl hover:bg-primary transition-all group" aria-label="Facebook BNI BINA">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-primary">Navigation</h4>
            <ul className="space-y-4 text-gray-400 font-medium text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/estimateur" className="hover:text-white transition-colors">Estimateur de projet</Link></li>
              <li><Link to="/espace-pro" className="hover:text-white transition-colors">Espace Pro</Link></li>
              {SHOW_MATERIAUX_IN_PUBLIC_UI && (
                <li><Link to="/materiaux" className="hover:text-white transition-colors">Catalogue Matériaux</Link></li>
              )}
              <li><Link to="/galerie" className="hover:text-white transition-colors">Galerie Réalisations</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Conseils & Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-primary">Expertises</h4>
            <ul className="space-y-4 text-gray-400 font-medium text-sm">
              <li>Rénovation Résidentielle</li>
              <li>Gros Œuvre & Extension</li>
              <li>Second Œuvre (Élec/Plomb)</li>
              <li>Revêtements & Peinture</li>
              <li>Étanchéité Technique</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-primary">Contact</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-start space-x-4">
                <div className="bg-white/5 p-2 rounded-lg text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <span className="text-sm">Apprt N7 immeuble 186 Ibn Tachfine-Azli, Marrakech, Maroc</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-white/5 p-2 rounded-lg text-primary shrink-0">
                  <Phone size={20} />
                </div>
                <a href={`tel:${phoneNumberRaw}`} className="font-bold text-white hover:text-primary transition-colors">{phoneNumber}</a>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-white/5 p-2 rounded-lg text-primary shrink-0">
                  <Mail size={20} />
                </div>
                <a href="mailto:contact@bnibina.ma" className="text-sm font-bold text-white hover:text-primary transition-colors">contact@bnibina.ma</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 text-center">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} BNI BINA MAROC. TOUS DROITS RÉSERVÉS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
