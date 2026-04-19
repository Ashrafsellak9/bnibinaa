
import React, { useState } from 'react';
import { GALLERY } from '../constants';
import { Maximize2, X, Info, ArrowRight, MapPin, Calendar, Ruler } from 'lucide-react';

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<typeof GALLERY[0] | null>(null);

  const filters = ['Tous', 'Villa', 'Appartement', 'Bureau', 'Commerce'];
  const filteredGallery = GALLERY.filter(p => activeFilter === 'Tous' || p.category === activeFilter);

  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">Études de Cas</h2>
            <h1 className="text-5xl md:text-7xl font-black font-heading text-darkGray section-title uppercase tracking-tighter">
              Patrimoine <br/> <span className="text-gray-300">Réalisé.</span>
            </h1>
          </div>
          <div className="flex space-x-2 pb-2 overflow-x-auto no-scrollbar max-w-full">
             {filters.map(f => (
               <button
                 key={f}
                 onClick={() => setActiveFilter(f)}
                 className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-primary text-white' : 'bg-lightGray text-gray-400 hover:text-darkGray'}`}
               >
                 {f}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           {filteredGallery.map((proj) => (
             <div 
               key={proj.id} 
               onClick={() => setSelectedProject(proj)}
               className="group relative cursor-pointer overflow-hidden bg-darkGray aspect-[16/10]"
             >
                <img src={proj.afterImg} alt={`${proj.title} — réalisation BNI BINA, aperçu`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                   <div className="translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                      <span className="text-primary font-black uppercase tracking-widest text-[10px] mb-4 block">{proj.category} • {proj.style}</span>
                      <h3 className="text-white text-4xl font-black uppercase tracking-tighter mb-8">{proj.title}</h3>
                      <button className="flex items-center text-white text-[10px] font-black uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-darkGray transition-all">
                        Consulter le Dossier <ArrowRight className="ml-3" size={16} />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Modal Dossier Technique */}
      {selectedProject && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-10">
           <div className="absolute inset-0 bg-darkGray/95" onClick={() => setSelectedProject(null)}></div>
           <div className="relative w-full h-full max-w-7xl bg-white animate-fade-in flex flex-col md:flex-row overflow-y-auto no-scrollbar">
              <button type="button" onClick={() => setSelectedProject(null)} className="absolute top-10 right-10 z-[130] text-darkGray hover:text-primary transition-colors" aria-label="Fermer la fiche projet"><X size={40} aria-hidden="true" /></button>
              
              <div className="w-full md:w-3/5 bg-gray-100 relative">
                 <div className="h-full flex flex-col">
                    <div className="flex-1 relative overflow-hidden group">
                       <img src={selectedProject.afterImg} className="w-full h-full object-cover" alt={`${selectedProject.title} — état après travaux`} />
                       <div className="absolute top-10 left-10 bg-primary text-white px-6 py-3 font-black text-[10px] uppercase tracking-widest">LIVRÉ EN 2024</div>
                    </div>
                    <div className="flex-1 relative overflow-hidden group">
                       <img src={selectedProject.beforeImg} className="w-full h-full object-cover grayscale opacity-50" alt={`${selectedProject.title} — état initial avant travaux`} />
                       <div className="absolute top-10 left-10 bg-darkGray text-white px-6 py-3 font-black text-[10px] uppercase tracking-widest">ÉTAT INITIAL</div>
                    </div>
                 </div>
              </div>

              <div className="w-full md:w-2/5 p-16 md:p-24 flex flex-col">
                 <div className="mb-20">
                    <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">{selectedProject.category}</p>
                    <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-10">{selectedProject.title}</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                       Réhabilitation structurelle et optimisation du second œuvre. Ce projet illustre notre capacité à intégrer des standards de confort modernes dans des structures architecturales complexes.
                    </p>
                 </div>

                 <div className="space-y-12 mb-20">
                    <div className="grid grid-cols-2 gap-8">
                       <div className="border-b border-gray-100 pb-6">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Localisation</p>
                          <div className="flex items-center text-darkGray font-bold uppercase tracking-tight"><MapPin size={14} className="mr-2 text-primary" /> Marrakech</div>
                       </div>
                       <div className="border-b border-gray-100 pb-6">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Période</p>
                          <div className="flex items-center text-darkGray font-bold uppercase tracking-tight"><Calendar size={14} className="mr-2 text-primary" /> 14 Semaines</div>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="border-b border-gray-100 pb-6">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Surface</p>
                          <div className="flex items-center text-darkGray font-bold uppercase tracking-tight"><Ruler size={14} className="mr-2 text-primary" /> 450 m²</div>
                       </div>
                       <div className="border-b border-gray-100 pb-6">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Enveloppe</p>
                          <div className="flex items-center text-darkGray font-bold uppercase tracking-tight">{selectedProject.budget}</div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-auto">
                    <div className="bg-lightGray p-8 mb-12">
                       <div className="flex items-center space-x-4 mb-4">
                          <Info className="text-primary" size={24} />
                          <h4 className="text-xs font-black uppercase tracking-widest">Note Technique</h4>
                       </div>
                       <p className="text-xs text-gray-500 leading-relaxed font-medium">
                          Mise en œuvre d'un système d'étanchéité multicouche haute performance avec garantie décennale.
                       </p>
                    </div>
                    <button className="w-full bg-primary text-white py-6 font-black uppercase tracking-widest text-xs hover:bg-primaryDark transition-all">
                       VOTRE PROJET SIMILAIRE
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
