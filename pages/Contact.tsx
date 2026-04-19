
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, Send, CheckCircle, ArrowRight } from 'lucide-react';
import imgChantier from '../images/Construction_Batiment.jpeg';
import { INSTAGRAM_URL, LINKEDIN_URL } from '../seo/siteConfig';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const phoneNumber = "06 63 48 89 00";
  const phoneNumberRaw = "0663488900";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">Direction Commerciale</h2>
            <h1 className="text-5xl md:text-7xl font-black font-heading text-darkGray section-title uppercase tracking-tighter">
              Nous <br/> <span className="text-gray-300">Contacter.</span>
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Institution Info */}
          <div className="space-y-20">
            <div>
               <h3 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-12">Informations Siège</h3>
               <div className="space-y-12">
                  <div className="flex items-start space-x-10 group cursor-default">
                    <div className="w-16 h-16 bg-lightGray flex items-center justify-center text-darkGray group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Adresse Bureaux</p>
                      <p className="text-xl font-bold text-darkGray leading-tight uppercase tracking-tight">Apprt N7 immeuble 186 Ibn Tachfine-Azli, Marrakech, Maroc</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-10 group cursor-default">
                    <div className="w-16 h-16 bg-lightGray flex items-center justify-center text-darkGray group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Phone size={24} />
                    </div>
                    <div className="flex flex-col space-y-4">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Ligne Directe</p>
                        <a href={`tel:${phoneNumberRaw}`} className="text-3xl font-black text-darkGray hover:text-primary transition-colors">{phoneNumber}</a>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Standard Marrakech</p>
                        <p className="text-xl font-bold text-darkGray">05 22 12 34 56</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-10 group cursor-default">
                    <div className="w-16 h-16 bg-lightGray flex items-center justify-center text-darkGray group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Email de contact</p>
                      <p className="text-xl font-bold text-darkGray uppercase tracking-tight">contact@bnibina.ma</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="pt-20 border-t border-gray-100">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-10">Réseaux Sociaux</h3>
               <div className="flex space-x-4">
                  {[
                    { icon: <Instagram />, label: 'Instagram', href: INSTAGRAM_URL },
                    { icon: <Linkedin />, label: 'LinkedIn', href: LINKEDIN_URL },
                    { icon: <Facebook />, label: 'Facebook', href: '#' },
                  ].map((soc, i) => (
                    <a
                      key={i}
                      href={soc.href}
                      {...(soc.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="w-14 h-14 bg-white border border-gray-100 flex items-center justify-center text-darkGray hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                      aria-label={soc.href.startsWith('http') ? `${soc.label} (nouvel onglet)` : soc.label}
                    >
                      <span aria-hidden="true">{soc.icon}</span>
                    </a>
                  ))}
               </div>
            </div>
          </div>

          {/* Business Inquiry Form */}
          <div className="bg-darkGray p-16 shadow-2xl relative overflow-hidden">
             {isSubmitted ? (
                <div className="py-24 text-center animate-fade-in">
                   <CheckCircle className="text-primary mx-auto mb-10" size={80} aria-hidden="true" />
                   <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-6">Demande Reçue</h3>
                   <p className="text-gray-400 font-medium max-w-sm mx-auto mb-12 uppercase tracking-widest text-[10px] leading-loose">
                     Nos départements techniques analysent votre requête. Un expert reviendra vers vous sous 24h ouvrées.
                   </p>
                   <button type="button" onClick={() => setIsSubmitted(false)} className="text-primary font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors">
                     Nouvelle Demande
                   </button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                   <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                         <label htmlFor="contact-fullname" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Identité Complète</label>
                         <input id="contact-fullname" name="fullname" required type="text" autoComplete="name" className="w-full bg-transparent border-b border-white/30 py-4 text-white text-sm font-bold outline-none focus:border-primary transition-all" placeholder="Nom Prénom" />
                      </div>
                      <div className="space-y-4">
                         <label htmlFor="contact-email" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Email Corporatif</label>
                         <input id="contact-email" name="email" required type="email" autoComplete="email" className="w-full bg-transparent border-b border-white/30 py-4 text-white text-sm font-bold outline-none focus:border-primary transition-all" placeholder="votre@compagnie.ma" />
                      </div>
                   </div>
                   <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                         <label htmlFor="contact-phone" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Ligne Directe</label>
                         <input id="contact-phone" name="tel" required type="tel" autoComplete="tel" className="w-full bg-transparent border-b border-white/30 py-4 text-white text-sm font-bold outline-none focus:border-primary transition-all" placeholder="+212 6..." />
                      </div>
                      <div className="space-y-4">
                         <label htmlFor="contact-unit" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Unité d&apos;Affaire</label>
                         <select id="contact-unit" name="unit" className="w-full bg-transparent border-b border-white/30 py-4 text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                            <option className="bg-darkGray">Rénovation Second Œuvre</option>
                            <option className="bg-darkGray">Gros Œuvre & Infrastructure</option>
                            <option className="bg-darkGray">Sourcing Matériaux</option>
                            <option className="bg-darkGray">Maintenance Industrielle</option>
                         </select>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label htmlFor="contact-message" className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Nature du Projet</label>
                      <textarea id="contact-message" name="message" required rows={4} className="w-full bg-transparent border-b border-white/30 py-4 text-white text-sm font-bold outline-none focus:border-primary transition-all resize-none" placeholder="Spécifications techniques..."></textarea>
                   </div>
                   
                   <button type="submit" className="w-full bg-primary text-white py-6 font-black uppercase tracking-widest text-xs hover:bg-primaryDark transition-all flex items-center justify-center shadow-xl shadow-primary/20 group">
                      SOUMETTRE MON DOSSIER <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                   </button>
                </form>
             )}
          </div>
        </div>

        {/* Global Network Image */}
        <div className="mt-32 h-[500px] overflow-hidden group">
           <img src={imgChantier} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110" alt="Chantier de construction au Maroc — BNI BINA rénovation et BTP" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
