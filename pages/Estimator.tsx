
import React, { useState, useMemo } from 'react';
// Added missing Link import
import { Link } from 'react-router-dom';
import { 
  Home, LayoutGrid, PlusSquare, Wrench, ArrowRight, ArrowLeft, 
  CheckCircle2, Info, HelpCircle, Download, ShieldCheck, 
  MapPin, ChevronRight, AlertCircle, FileText,
  // Added missing icons: Clock, Zap, PaintBucket
  Clock, Zap, PaintBucket
} from 'lucide-react';

type PathType = 'logement' | 'piece' | 'agrandir' | 'carte';

interface FormData {
  surface: number;
  quality: 'standard' | 'premium';
  city: 'Marrakech' | 'Casablanca' | 'Autre';
  postalCode: string;
}

const Estimator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [path, setPath] = useState<PathType | null>(null);
  const [selection, setSelection] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    surface: 0,
    quality: 'standard',
    city: 'Marrakech',
    postalCode: '',
  });

  const pathOptions = [
    { id: 'logement', title: 'Je rénove mon logement', icon: <Home size={28} />, desc: 'Maison, Appartement, Rénov Énergétique' },
    { id: 'piece', title: 'Je rénove une pièce', icon: <LayoutGrid size={28} />, desc: 'Estimation précise par zone de vie' },
    { id: 'agrandir', title: 'J\'agrandis mon logement', icon: <PlusSquare size={28} />, desc: 'Extension, Surélévation, Combles' },
    { id: 'carte', title: 'Mes travaux à la carte', icon: <Wrench size={28} />, desc: 'Menuiserie, Isolation, Élec, Gros Œuvre' },
  ];

  const subOptions: Record<string, string[]> = {
    logement: ['Appartement', 'Maison', 'Rénovation énergétique', 'Accessibilité - Adaptation'],
    piece: ['Salle de bain', 'Cuisine', 'Salon', 'Combles', 'Toilettes', 'Entrée', 'Chambre', 'Bureau', 'Buanderie'],
    agrandir: ['Extension et surélévation', 'Aménagement de combles'],
    carte: [
      'Rénovation énergétique',
      'Fenêtres - Portes',
      'Chauffage - Climatisation',
      'Terrasse - Extérieur',
      'Isolation',
      'Toiture',
      'Façade',
      'Plomberie',
      'Peinture - Revêtements',
      'Verrière - Mur - Plafond',
      'Gros œuvre',
      'Électricité',
      'Accessibilité - Adaptation'
    ]
  };

  const handlePathSelect = (p: PathType) => {
    setPath(p);
    setStep(2);
  };

  const handleSubSelect = (s: string) => {
    setSelection(s);
    setStep(3);
  };

  const calculation = useMemo(() => {
    if (step !== 4) return null;
    
    // Tarifs indicatifs base (MAD / m2)
    let basePrice = 2000;
    if (path === 'logement') basePrice = 3500;
    if (path === 'piece') basePrice = 4500;
    if (path === 'agrandir') basePrice = 8500;
    if (path === 'carte') basePrice = 1500;

    // Modificateurs
    const qualityMult = formData.quality === 'premium' ? 1.7 : 1;
    const cityMult = formData.city === 'Casablanca' ? 1.15 : 1;
    const surface = formData.surface || 10;
    
    const total = surface * basePrice * qualityMult * cityMult;
    
    return {
      total,
      labor: total * 0.45,
      materials: total * 0.40,
      finishes: total * 0.15,
      duration: Math.ceil(surface / 8) + 3
    };
  }, [step, formData, path]);

  return (
    <div className="pt-24 md:pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Estimateur de travaux en ligne</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                Calculez le coût <br className="hidden md:block"/> <span className="text-gray-300">de votre projet.</span>
              </h1>
              <p className="mt-6 text-gray-500 text-sm md:text-base font-medium leading-relaxed">
                Obtenez une première évaluation des prix des travaux à réaliser pour préparer votre projet en toute sérénité. Un outil simple, gratuit et rapide.
              </p>
            </div>
            {step < 4 && (
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black uppercase text-gray-400">Étape {step}/4</span>
                <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step/4)*100}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 1: Main Path Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            {pathOptions.map((opt) => (
              <button 
                type="button"
                key={opt.id}
                onClick={() => handlePathSelect(opt.id as PathType)}
                className="flex items-center p-8 border-2 border-gray-50 hover:border-primary hover:shadow-xl transition-all group text-left bg-white"
              >
                <div className="w-16 h-16 bg-lightGray rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mr-8 shrink-0" aria-hidden="true">
                  {opt.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">{opt.title}</h3>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">{opt.desc}</p>
                </div>
                <ArrowRight className="ml-auto text-gray-200 group-hover:text-primary transition-colors" aria-hidden="true" />
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Sub-category Selection */}
        {step === 2 && path && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-10 text-gray-400">
              <button type="button" onClick={() => setStep(1)} className="hover:text-primary transition-colors flex items-center text-[10px] font-black uppercase tracking-widest">
                <ArrowLeft size={14} className="mr-2" aria-hidden="true" /> Retour
              </button>
              <span className="mx-4">/</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-darkGray">{pathOptions.find(o => o.id === path)?.title}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subOptions[path].map((item) => (
                <button 
                  type="button"
                  key={item}
                  onClick={() => handleSubSelect(item)}
                  className="p-8 border-2 border-gray-50 hover:border-primary text-left bg-white transition-all group relative overflow-hidden"
                >
                  <h4 className="text-lg font-black uppercase tracking-tight group-hover:text-primary transition-colors pr-8">{item}</h4>
                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-200 group-hover:text-primary transition-colors" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Technical Form */}
        {step === 3 && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="flex items-center mb-10 text-gray-400">
              <button type="button" onClick={() => setStep(2)} className="hover:text-primary transition-colors flex items-center text-[10px] font-black uppercase tracking-widest">
                <ArrowLeft size={14} className="mr-2" aria-hidden="true" /> Retour
              </button>
              <span className="mx-4">/</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-darkGray">{selection}</span>
            </div>
            
            <div className="bg-darkGray p-8 md:p-16 text-white shadow-2xl">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-12">Détails de votre projet</h3>
              
              <div className="space-y-12">
                <div>
                  <label htmlFor="estimate-surface" className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">Surface totale concernée (m²)</label>
                  <input 
                    id="estimate-surface"
                    name="surface"
                    type="number"
                    min={1}
                    className="w-full bg-transparent border-b-2 border-white/20 text-5xl font-black text-white outline-none focus:border-primary transition-all py-4"
                    placeholder="00"
                    onChange={(e) => setFormData({...formData, surface: Number(e.target.value)})}
                  />
                  <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest italic">Aide : 1 m² minimum pour le calcul</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <label htmlFor="estimate-city" className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">Localisation</label>
                    <select 
                      id="estimate-city"
                      name="city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value as any})}
                      className="w-full bg-white/5 border-b border-white/30 p-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary appearance-none cursor-pointer"
                    >
                      <option className="bg-darkGray" value="Marrakech">Marrakech & Région</option>
                      <option className="bg-darkGray" value="Casablanca">Casablanca & Région</option>
                      <option className="bg-darkGray" value="Autre">Autre Ville du Maroc</option>
                    </select>
                  </div>
                  <div>
                    <p id="estimate-quality-label" className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">Gamme de finition</p>
                    <div className="flex space-x-2" role="group" aria-labelledby="estimate-quality-label">
                      {['standard', 'premium'].map((q) => (
                        <button
                          type="button"
                          key={q}
                          onClick={() => setFormData({...formData, quality: q as any})}
                          className={`flex-1 py-4 font-black uppercase tracking-widest text-[10px] border transition-all ${formData.quality === q ? 'bg-primary border-primary text-white' : 'border-white/20 text-gray-400 hover:border-white/40'}`}
                          aria-pressed={formData.quality === q}
                          aria-label={q === 'standard' ? 'Gamme de finition standard' : 'Gamme de finition haut de gamme'}
                        >
                          {q === 'standard' ? 'Standard' : 'Haut de gamme'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setStep(4)}
                  className="w-full bg-primary py-6 font-black uppercase tracking-widest text-xs hover:bg-primaryDark transition-all mt-8"
                >
                  Générer mon estimation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Result View */}
        {step === 4 && calculation && (
          <div className="animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-lightGray p-8 md:p-16 border-l-8 border-primary relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5" aria-hidden="true">
                    <FileText size={160} />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Estimation budgétaire indicative</p>
                  <h4 className="text-xl font-bold uppercase tracking-tight mb-8">{selection}</h4>
                  
                  <div className="text-5xl md:text-8xl font-black text-darkGray tracking-tighter mb-12">
                    {calculation.total.toLocaleString()} <span className="text-xl md:text-2xl text-gray-400">MAD</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-12 pt-12 border-t border-gray-200">
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">Répartition par poste</p>
                      <div className="space-y-6">
                        {[
                          { l: 'Main d\'œuvre & Pose', v: '45%', amount: calculation.labor },
                          { l: 'Matériaux & Fournitures', v: '40%', amount: calculation.materials },
                          { l: 'Finitions & Divers', v: '15%', amount: calculation.finishes },
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                              <span>{item.l}</span>
                              <span className="text-gray-400">{item.amount.toLocaleString()} MAD</span>
                            </div>
                            <div className="h-1 bg-gray-200 w-full rounded-full">
                              <div className="h-full bg-darkGray rounded-full" style={{ width: item.v }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                       <div className="bg-white p-8 border border-gray-100 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Durée estimée</p>
                            <p className="text-2xl font-black text-darkGray uppercase">{calculation.duration} Semaines</p>
                          </div>
                          {/* Clock icon fix */}
                          <Clock className="text-primary" size={32} aria-hidden="true" />
                       </div>
                       <div className="bg-primary/5 p-8 border border-primary/10">
                          <p className="text-[10px] font-black text-primary uppercase mb-2">Note BNI BINA</p>
                          <p className="text-xs text-gray-600 font-medium leading-relaxed italic">
                            Cette estimation est basée sur les prix moyens pratiqués au Maroc en 2024. Un devis définitif nécessite une visite de nos experts.
                          </p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-50 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                  <div className="shrink-0 text-primary" aria-hidden="true"><ShieldCheck size={64} /></div>
                  <div>
                    <h4 className="text-lg font-black uppercase mb-4 tracking-tighter">Votre projet en toute sécurité</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      BNI BINA vous accompagne de l'estimation à la livraison. Nous garantissons le respect des normes, des délais et une transparence totale sur les matériaux utilisés.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar Action */}
              <div className="bg-darkGray text-white p-8 md:p-12 sticky top-32 h-fit shadow-2xl">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Valider mon étude</h3>
                <p className="text-gray-400 text-xs mb-8 uppercase tracking-widest leading-relaxed">
                  Laissez vos coordonnées pour recevoir le détail complet par email et être contacté par un conseiller technique.
                </p>
                <form className="space-y-4 mb-8">
                  <label htmlFor="estimate-final-name" className="sr-only">Nom complet</label>
                  <input id="estimate-final-name" name="fullname" type="text" autoComplete="name" placeholder="NOM COMPLET" className="w-full bg-white/5 border-b border-white/30 p-4 text-[10px] font-black outline-none focus:border-primary text-white" />
                  <label htmlFor="estimate-final-tel" className="sr-only">Numéro de téléphone</label>
                  <input id="estimate-final-tel" name="tel" type="tel" autoComplete="tel" placeholder="NUMÉRO DE TÉLÉPHONE" className="w-full bg-white/5 border-b border-white/30 p-4 text-[10px] font-black outline-none focus:border-primary text-white" />
                  <label htmlFor="estimate-final-email" className="sr-only">Adresse e-mail</label>
                  <input id="estimate-final-email" name="email" type="email" autoComplete="email" placeholder="EMAIL" className="w-full bg-white/5 border-b border-white/30 p-4 text-[10px] font-black outline-none focus:border-primary text-white" />
                </form>
                <button type="button" className="w-full bg-primary text-white py-5 font-black uppercase tracking-widest text-[10px] hover:bg-primaryDark transition-all flex items-center justify-center">
                  <Download className="mr-3" size={16} aria-hidden="true" /> Demander le devis gratuit
                </button>
                <button type="button" onClick={() => setStep(1)} className="w-full mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">
                  Recommencer le chiffrage
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Informative Content Sections */}
        <div className="mt-32 space-y-32">
          {/* How it works */}
          <section className="grid lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">Mode d'emploi</h2>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                  Comment utiliser <br/> <span className="text-gray-300">notre outil ?</span>
                </h3>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <span className="text-4xl font-black text-gray-100 shrink-0">01</span>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Choisissez votre entrée : par pièce (salle de bain, cuisine...) ou par type de travaux (électricité, peinture...).</p>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-4xl font-black text-gray-100 shrink-0">02</span>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Suivez les étapes du questionnaire construites pour définir avec précision le prix de votre future rénovation.</p>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-4xl font-black text-gray-100 shrink-0">03</span>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Accédez directement à une fourchette de tarif fiable concernant votre projet en quelques minutes seulement.</p>
                  </div>
                </div>
             </div>
             <div className="bg-lightGray p-12 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary"></div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-6">Méthode de calcul</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8">
                  L'estimation est basée sur les caractéristiques de votre projet (surface, gamme, options) et sur les prix moyens pratiqués au Maroc. Cette estimation apporte un ordre d'idée sur le budget à consacrer.
                </p>
                <div className="flex items-start gap-4 p-6 bg-white border border-gray-100">
                  <AlertCircle className="text-primary shrink-0" />
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-relaxed">
                    Il ne s'agit pas d'un devis définitif. Une visite sur place est nécessaire pour un chiffrage contractuel précis.
                  </p>
                </div>
             </div>
          </section>

          {/* Guide des prix */}
          <section>
             <div className="text-center mb-20">
                <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">Sourcing & Data</h2>
                <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-8">Guide des prix 2024</h3>
                <div className="w-20 h-1 bg-primary mx-auto"></div>
             </div>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
                {[
                  { label: 'Rafraîchissement', price: '150 - 210', desc: 'Peinture, sols souples, décoration simple' },
                  { label: 'Rénovation partielle', price: '700 - 900', desc: 'Cuisine, salle de bain, réseaux standards' },
                  { label: 'Rénovation lourde', price: '1 000 - 1 200', desc: 'Structure, gros œuvre, isolation thermique' },
                  { label: 'Haut Standing', price: '1 500+', desc: 'Matériaux de luxe, domotique, finitions premium' },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-10 hover:bg-primary group transition-all cursor-default">
                    <p className="text-[10px] font-black text-gray-400 group-hover:text-white/60 mb-4 uppercase tracking-widest">{item.label}</p>
                    <p className="text-3xl font-black text-darkGray group-hover:text-white mb-4">{item.price} <span className="text-xs font-bold">MAD/m²</span></p>
                    <p className="text-xs text-gray-500 group-hover:text-white/80 font-medium leading-relaxed italic">{item.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Expertises detail */}
          <section className="grid md:grid-cols-3 gap-12">
             <div className="space-y-6">
                {/* Zap icon fix */}
                <div className="w-12 h-12 bg-lightGray flex items-center justify-center text-primary"><Zap /></div>
                <h4 className="text-lg font-black uppercase tracking-tight">Eau et Électricité</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">Remise aux normes, création de réseau ou installation complète. La mise aux normes peut représenter une part importante du budget dans l'ancien.</p>
             </div>
             <div className="space-y-6">
                {/* PaintBucket icon fix */}
                <div className="w-12 h-12 bg-lightGray flex items-center justify-center text-primary"><PaintBucket /></div>
                <h4 className="text-lg font-black uppercase tracking-tight">Finitions & Déco</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">Le carrelage, la peinture et les revêtements influencent l'esthétique et le montant global. Nous vous aidons à trouver l'équilibre qualité/budget.</p>
             </div>
             <div className="space-y-6">
                <div className="w-12 h-12 bg-lightGray flex items-center justify-center text-primary"><ShieldCheck /></div>
                <h4 className="text-lg font-black uppercase tracking-tight">Rénovation Énergétique</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">Isolation, fenêtres ou chauffage performant. Ces travaux ouvrent droit à des aides financières et réduisent vos factures long terme.</p>
             </div>
          </section>

          {/* FAQ */}
          <section className="bg-lightGray p-12 md:p-24">
             <div className="flex flex-col md:flex-row gap-20">
                <div className="md:w-1/3">
                   <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 leading-none">Questions <br/> Fréquentes</h3>
                   <p className="text-gray-500 text-sm font-medium leading-relaxed">Trouvez des réponses rapides pour avancer sereinement sur votre projet de construction ou rénovation.</p>
                </div>
                <div className="md:w-2/3 space-y-12">
                   <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center"><HelpCircle size={16} className="mr-2" /> Peut-on estimer soi-même ?</h4>
                      <p className="text-sm text-darkGray font-medium leading-relaxed">Oui, notre simulateur vous donne une première fourchette fiable. Cela ne remplace pas l'avis d'un professionnel, mais offre un excellent aperçu pour démarrer.</p>
                   </div>
                   <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center"><HelpCircle size={16} className="mr-2" /> Quelles aides existent ?</h4>
                      <p className="text-sm text-darkGray font-medium leading-relaxed">Certaines rénovations au Maroc ouvrent droit à des subventions (Daam Sakane) ou des facilités de financement bancaire. Nous vous conseillons sur ces aspects.</p>
                   </div>
                   <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center"><HelpCircle size={16} className="mr-2" /> Quelle est la durée de validité ?</h4>
                      <p className="text-sm text-darkGray font-medium leading-relaxed">Une estimation évolue selon le prix des matériaux. Un devis signé est généralement valable 30 jours au Maroc.</p>
                   </div>
                </div>
             </div>
          </section>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center py-20 border-y border-gray-100">
           <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">Prêt à affiner <span className="text-primary">votre projet ?</span></h3>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              {/* Link fix */}
              <Link to="/contact" className="btn-premium bg-darkGray text-white px-12 py-5 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-primary transition-all">Contacter un expert</Link>
              <button type="button" onClick={() => {window.scrollTo(0,0); setStep(1);}} className="btn-premium border-2 border-darkGray text-darkGray px-12 py-5 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-darkGray hover:text-white transition-all">Refaire une simulation</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Estimator;
