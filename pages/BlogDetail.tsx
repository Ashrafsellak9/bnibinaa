
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Clock, User, ArrowLeft, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const post = BLOG_POSTS.find(b => b.id === id) || BLOG_POSTS[0];

  return (
    <div className="pt-32 pb-20 bg-lightGray min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center text-primary font-bold mb-8 hover:-translate-x-2 transition-transform">
           <ArrowLeft size={20} className="mr-2" /> Retour au Blog
        </Link>

        <article className="bg-white rounded-[40px] shadow-xl overflow-hidden">
           <div className="h-[400px] relative">
              <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
              <div className="absolute top-6 left-6 bg-primary text-white px-5 py-2 rounded-xl font-bold shadow-lg">
                 {post.category}
              </div>
           </div>

           <div className="p-10 lg:p-16">
              <div className="flex items-center space-x-6 text-sm text-gray-400 mb-8 font-bold uppercase tracking-widest">
                 <span className="flex items-center"><Clock size={16} className="mr-2" /> {post.readTime}</span>
                 <span className="flex items-center"><User size={16} className="mr-2" /> {post.author}</span>
                 <span className="hidden sm:inline">{post.date}</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-black mb-10 leading-tight">{post.title}</h1>
              
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                 <p className="text-xl text-darkGray font-medium leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                    {post.excerpt}
                 </p>
                 <p>
                    La rénovation au Maroc demande une attention particulière aux matériaux et au climat. Que vous soyez à Marrakech avec ses températures élevées ou sur la côte, les choix techniques diffèrent. Dans cet article, nous explorons les solutions concrètes pour optimiser votre projet.
                 </p>
                 <h2 className="text-2xl font-bold text-darkGray mt-12 mb-4">1. La planification budgétaire</h2>
                 <p>
                    Un projet réussi commence par une estimation juste. Ne négligez pas la marge de sécurité de 10% pour les imprévus, fréquents dans la rénovation de bâtiments anciens.
                 </p>
                 <h2 className="text-2xl font-bold text-darkGray mt-12 mb-4">2. Le choix des artisans</h2>
                 <p>
                    L'expertise locale est irremplaçable. Chez BNI BINA, nous privilégions des équipes formées aux dernières techniques tout en respectant l'artisanat traditionnel marocain.
                 </p>
              </div>

              <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                 <div className="flex items-center space-x-4">
                    <span className="font-bold text-darkGray">Partager l'article :</span>
                    <div className="flex space-x-2">
                       <button className="p-3 bg-gray-50 rounded-full hover:bg-primary hover:text-white transition-all"><Facebook size={20}/></button>
                       <button className="p-3 bg-gray-50 rounded-full hover:bg-primary hover:text-white transition-all"><Linkedin size={20}/></button>
                       <button className="p-3 bg-gray-50 rounded-full hover:bg-primary hover:text-white transition-all"><Twitter size={20}/></button>
                    </div>
                 </div>
                 <button className="flex items-center text-primary font-bold">
                    <Share2 size={20} className="mr-2" /> Copier le lien
                 </button>
              </div>
           </div>
        </article>

        <div className="mt-16">
           <h3 className="text-3xl font-black mb-8">Articles Similaires</h3>
           <div className="grid md:grid-cols-2 gap-8">
              {BLOG_POSTS.slice(0, 2).map(p => (
                 <Link key={p.id} to={`/blog/${p.id}`} className="bg-white p-6 rounded-3xl shadow-lg flex items-center space-x-6 hover:translate-y-[-4px] transition-transform">
                    <img src={p.image} className="w-24 h-24 rounded-2xl object-cover" alt={p.title} />
                    <div>
                       <h4 className="font-bold text-lg mb-1 leading-tight">{p.title}</h4>
                       <span className="text-primary text-sm font-bold">Lire l'article</span>
                    </div>
                 </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
