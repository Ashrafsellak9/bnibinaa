
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Package, ClipboardCheck, Paintbrush, HardHat, Ruler, Building2 } from 'lucide-react';
import { SERVICES, CATEGORIES, GALLERY } from '../constants';
import { SHOW_MATERIAUX_IN_PUBLIC_UI } from '../featureFlags';

const Home: React.FC = () => {
  const [quickEstimateStep, setQuickEstimateStep] = useState(1);

  const visibleServices = useMemo(
    () => SERVICES.filter((service) => SHOW_MATERIAUX_IN_PUBLIC_UI || service.title !== 'Matériaux'),
    []
  );

  const servicesLgCols =
    visibleServices.length >= 5
      ? 'lg:grid-cols-5'
      : visibleServices.length === 4
        ? 'lg:grid-cols-4'
        : visibleServices.length === 3
          ? 'lg:grid-cols-3'
          : 'lg:grid-cols-2';

  const getIcon = (name: string) => {
    switch (name) {
      case 'Home': return <Building2 className="text-primary" size={32} />;
      case 'Package': return <Package className="text-primary" size={32} />;
      case 'ClipboardCheck': return <ClipboardCheck className="text-primary" size={32} />;
      case 'Paintbrush': return <Paintbrush className="text-primary" size={32} />;
      case 'Wrench': return <HardHat className="text-primary" size={32} />;
      default: return <Ruler className="text-primary" size={32} />;
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Responsive Typography */}
      <section className="relative h-[90vh] md:h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Immeubles et skyline urbain — BNI BINA, construction et rénovation au Maroc" 
            className="w-full h-full object-cover brightness-[0.35] hero-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 md:via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-3 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-full mb-6 md:mb-8">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">BTP &amp; rénovation au Maroc</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-heading text-white mb-6 md:mb-8 section-title tracking-tight leading-[0.95]">
              Bâtir <br className="hidden sm:block"/> l'Excellence.
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-10 md:mb-12 max-w-2xl leading-relaxed font-light">
              Expertise technique et rigueur opérationnelle pour vos projets de rénovation et construction de prestige.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/estimateur" className="btn-premium bg-primary text-white px-8 md:px-10 py-4 md:py-5 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-primaryDark transition-all flex items-center justify-center">
                Lancer un Projet <ArrowRight className="ml-3" size={18} />
              </Link>
              <Link to="/galerie" className="btn-premium bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 md:px-10 py-4 md:py-5 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center">
                Réalisations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - 2x2 on mobile */}
      <section className="bg-darkGray py-12 md:py-20 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: 'Projets Livrés', val: '10+', sub: 'Maroc' },
              { label: 'Expertise', val: '2 Ans', sub: 'Savoir-faire' },
              { label: 'Matériaux', val: '1.5k', sub: 'Premium' },
              { label: 'Satisfaction', val: '100%', sub: 'Engagement' },
            ]
              .filter((stat) => SHOW_MATERIAUX_IN_PUBLIC_UI || stat.label !== 'Matériaux')
              .map((stat, i) => (
              <div key={i} className="group cursor-default">
                <p className="text-primary text-3xl md:text-5xl font-black mb-1 tracking-tighter transition-transform inline-block">{stat.val}</p>
                <h4 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1">{stat.label}</h4>
                <p className="text-gray-400 text-[10px] font-medium uppercase">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Scrollable or Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 md:mb-24 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Notre Savoir-Faire</h2>
              <h3 className="text-3xl md:text-6xl font-black font-heading text-darkGray section-title uppercase tracking-tighter">
                Expertise <span className="text-gray-300">Technique.</span>
              </h3>
            </div>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${servicesLgCols} gap-px bg-gray-100 border border-gray-100`}>
            {visibleServices.map((service) => (
              <div key={service.id} className="bg-white p-8 md:p-12 hover:bg-primary transition-all group cursor-pointer">
                <div className="mb-6 md:mb-8 group-hover:brightness-0 group-hover:invert transition-all" aria-hidden="true">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-lg font-black mb-3 group-hover:text-white transition-all uppercase tracking-tight">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed group-hover:text-white/80 transition-all font-medium uppercase tracking-wide">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Categories - 2 columns on Mobile */}
      <section className="py-20 md:py-32 bg-darkGray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Domaines d'Expertise</h2>
            <h3 className="text-3xl md:text-6xl font-black font-heading text-white mb-6 uppercase tracking-tighter">Champs d'Intervention</h3>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 border border-white/10">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.id} className="group relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-black">
                <img 
                  src={cat.image} 
                  alt={`${cat.name} — domaine d’expertise BNI BINA`} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between">
                  <span className="text-white/10 font-black text-2xl sm:text-4xl">0{i+1}</span>
                  <div>
                    <h4 className="text-white text-xs sm:text-lg font-black uppercase tracking-tight mb-2 leading-tight">
                      {cat.name}
                    </h4>
                    <div className="w-6 h-[2px] bg-primary group-hover:w-full transition-all"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio - Stacked on mobile */}
      <section className="py-20 md:py-32 bg-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Réalisations</h2>
            <h3 className="text-3xl md:text-6xl font-black font-heading text-darkGray uppercase tracking-tighter">Portfolio Projets.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {GALLERY.map((proj) => (
              <div key={proj.id} className="group relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-darkGray">
                <img 
                  src={proj.afterImg} 
                  alt={`${proj.title} — réalisation BNI BINA, vue après travaux`} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 sm:p-12 flex flex-col justify-end">
                  <span className="text-primary font-black uppercase tracking-widest text-[9px] mb-2">{proj.category}</span>
                  <h4 className="text-white text-xl sm:text-3xl font-black mb-4 uppercase tracking-tighter">{proj.title}</h4>
                  <Link to="/galerie" className="inline-flex items-center text-white font-black text-[10px] uppercase tracking-widest hover:text-primary transition-colors">
                    Dossier Technique <ArrowRight className="ml-2" size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Compact on Mobile */}
      <section className="py-24 md:py-40 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-darkGray text-4xl md:text-8xl font-black font-heading mb-8 md:mb-12 section-title tracking-tighter uppercase">
            Votre <span className="text-primary">Vision,</span> <br/> Notre Rigueur.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <Link to="/contact" className="btn-premium w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-sm text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
              Consultation Gratuite
            </Link>
            <Link to="/estimateur" className="btn-premium w-full sm:w-auto text-darkGray border-2 border-darkGray px-10 py-5 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-darkGray hover:text-white transition-all">
              Simulateur Budget
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
