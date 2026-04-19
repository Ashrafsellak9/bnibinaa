import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Building2,
  Truck,
  FileCheck,
  ArrowRight,
  CheckCircle,
  Mail,
} from 'lucide-react';
import { SHOW_MATERIAUX_IN_PUBLIC_UI } from '../featureFlags';

const ProSpace: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const phoneNumber = '06 63 48 89 00';
  const phoneNumberRaw = '0663488900';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16 lg:mb-24">
          <div className="max-w-3xl">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">
              Partenaires &amp; chantiers
            </h2>
            <h1 className="text-5xl md:text-7xl font-black font-heading text-darkGray section-title uppercase tracking-tighter">
              Espace <br /> <span className="text-gray-300">Pro.</span>
            </h1>
            <p className="mt-8 text-gray-500 font-medium leading-relaxed max-w-2xl">
              Un guichet unique pour les entreprises, architectes et maîtres d&apos;ouvrage : devis
              volume, planning chantier et accompagnement technique. Réponse prioritaire sous 24h
              ouvrées.
            </p>
          </div>
          <a
            href={`tel:${phoneNumberRaw}`}
            className="shrink-0 flex items-center gap-3 bg-darkGray text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors"
            aria-label={`Appeler BNI BINA au ${phoneNumber}`}
          >
            <Phone size={18} aria-hidden="true" />
            {phoneNumber}
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="space-y-12">
            <div>
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-8">
                Avantages pro
              </h3>
              <ul className="space-y-8">
                {[
                  {
                    icon: <Building2 size={28} />,
                    title: 'Conditions dédiées',
                    text: 'Tarification et délais adaptés aux lots, appels d’offres et répétition de chantiers.',
                  },
                  {
                    icon: <Truck size={28} />,
                    title: 'Logistique chantier',
                    text: 'Livraison coordonnée sur vos sites au Maroc (Marrakech, Casablanca, Rabat et périphérie).',
                  },
                  {
                    icon: <FileCheck size={28} />,
                    title: 'Support technique',
                    text: 'Conseil sur les gammes, conformité et choix des matériaux pour vos dossiers.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-lightGray flex items-center justify-center text-primary" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-black text-darkGray uppercase tracking-tight text-sm mb-2">
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-100 pt-12">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                Accès rapides
              </h3>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link
                  to="/estimateur"
                  className="inline-flex items-center justify-center border-2 border-darkGray text-darkGray px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-darkGray hover:text-white transition-all"
                >
                  Estimateur <ArrowRight className="ml-2" size={16} />
                </Link>
                {SHOW_MATERIAUX_IN_PUBLIC_UI && (
                  <Link
                    to="/materiaux"
                    className="inline-flex items-center justify-center border-2 border-darkGray text-darkGray px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-darkGray hover:text-white transition-all"
                  >
                    Catalogue matériaux <ArrowRight className="ml-2" size={16} />
                  </Link>
                )}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-primaryDark transition-all"
                >
                  Contact général <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4 text-sm text-gray-500">
              <Mail className="text-primary shrink-0 mt-0.5" size={20} aria-hidden="true" />
              <p>
                Écrivez-nous aussi sur{' '}
                <a href="mailto:contact@bnibina.ma" className="font-bold text-darkGray hover:text-primary">
                  contact@bnibina.ma
                </a>{' '}
                en précisant « Espace Pro » dans l’objet.
              </p>
            </div>
          </div>

          <div className="bg-darkGray p-10 md:p-16 shadow-2xl relative overflow-hidden">
            {isSubmitted ? (
              <div className="py-16 text-center animate-fade-in">
                <CheckCircle className="text-primary mx-auto mb-8" size={72} aria-hidden="true" />
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                  Demande enregistrée
                </h3>
                <p className="text-gray-400 font-medium max-w-sm mx-auto mb-10 uppercase tracking-widest text-[10px] leading-loose">
                  Notre équipe commerciale B2B vous recontacte sous 24h ouvrées avec une proposition
                  adaptée.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                >
                  Nouvelle demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                  Demande partenaire / devis volume
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3 md:col-span-2">
                    <label htmlFor="pro-company" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      Raison sociale
                    </label>
                    <input
                      id="pro-company"
                      name="company"
                      required
                      type="text"
                      autoComplete="organization"
                      className="w-full bg-transparent border-b border-white/30 py-3 text-white text-sm font-bold outline-none focus:border-primary transition-all"
                      placeholder="Société ou bureau d’études"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="pro-ice" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      ICE / RC (optionnel)
                    </label>
                    <input
                      id="pro-ice"
                      name="ice"
                      type="text"
                      className="w-full bg-transparent border-b border-white/30 py-3 text-white text-sm font-bold outline-none focus:border-primary transition-all"
                      placeholder="Identifiant"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="pro-contact-name" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      Nom du contact
                    </label>
                    <input
                      id="pro-contact-name"
                      name="contactName"
                      required
                      type="text"
                      autoComplete="name"
                      className="w-full bg-transparent border-b border-white/30 py-3 text-white text-sm font-bold outline-none focus:border-primary transition-all"
                      placeholder="Prénom Nom"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="pro-email" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      Email professionnel
                    </label>
                    <input
                      id="pro-email"
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      className="w-full bg-transparent border-b border-white/30 py-3 text-white text-sm font-bold outline-none focus:border-primary transition-all"
                      placeholder="contact@societe.ma"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="pro-phone" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      Téléphone
                    </label>
                    <input
                      id="pro-phone"
                      name="tel"
                      required
                      type="tel"
                      autoComplete="tel"
                      className="w-full bg-transparent border-b border-white/30 py-3 text-white text-sm font-bold outline-none focus:border-primary transition-all"
                      placeholder="+212 6…"
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label htmlFor="pro-need-type" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      Type de besoin
                    </label>
                    <select id="pro-need-type" name="needType" className="w-full bg-transparent border-b border-white/30 py-3 text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                      <option className="bg-darkGray">Lots matériaux / sourcing</option>
                      <option className="bg-darkGray">Chantier clé en main</option>
                      <option className="bg-darkGray">Co-traitance / sous-traitance</option>
                      <option className="bg-darkGray">Autre</option>
                    </select>
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label htmlFor="pro-message" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      Détail du projet &amp; volumes estimés
                    </label>
                    <textarea
                      id="pro-message"
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-transparent border-b border-white/30 py-3 text-white text-sm font-bold outline-none focus:border-primary transition-all resize-none"
                      placeholder="Nature des travaux, surfaces, calendrier, références produits…"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-5 font-black uppercase tracking-widest text-xs hover:bg-primaryDark transition-all flex items-center justify-center shadow-xl shadow-primary/20 group"
                >
                  Envoyer la demande <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProSpace;
