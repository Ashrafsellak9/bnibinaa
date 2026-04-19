
import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Clock, User, ArrowRight, Search, Layout } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">Expertise & Innovation</h2>
            <h1 className="text-5xl md:text-7xl font-black font-heading text-darkGray section-title uppercase tracking-tighter">
              Dossiers <br/> <span className="text-gray-300">Techniques.</span>
            </h1>
          </div>
          <div className="relative w-80">
             <label htmlFor="blog-search" className="sr-only">Rechercher un article par mot-clé</label>
             <input id="blog-search" type="search" placeholder="RECHERCHE PAR MOT-CLÉ..." className="w-full bg-lightGray border-none p-6 pr-14 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 ring-primary transition-all" aria-label="Rechercher un article par mot-clé" />
             <Search size={18} className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="group cursor-pointer">
               <Link to={`/blog/${post.id}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100 mb-8">
                  <img src={post.image} alt={`Visuel de l’article : ${post.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </div>
               </Link>
               
               <div className="space-y-6">
                  <div className="flex items-center space-x-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center"><Clock size={14} className="mr-2 text-primary" /> {post.readTime}</span>
                    <span className="flex items-center"><User size={14} className="mr-2 text-primary" /> {post.author}</span>
                  </div>
                  
                  <Link to={`/blog/${post.id}`} className="block text-3xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors leading-[0.9]">
                    {post.title}
                  </Link>
                  
                  <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center text-darkGray text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1 group-hover:border-darkGray transition-all">
                    Lire l'analyse complète <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={16} />
                  </Link>
               </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
