
import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { getBlogPosts } from '../services/geminiService';
import { Calendar, Clock, ArrowRight, Tag, Search, X, Newspaper, ExternalLink, Sparkles } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200";

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load blog posts", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_IMAGE;
  };

  const filteredPosts = posts.filter(post => {
    const term = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center animate-fade-in-up">
        <div className="relative inline-block mb-10">
           <div className="w-24 h-24 border-[6px] border-slate-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
           <Newspaper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Radar Automotivo</h3>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest animate-pulse">Cruzando dados dos principais portais do Brasil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-32 animate-fade-in-up">
      
      {/* Search & Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-2xl">
        <div className="text-center lg:text-left">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
              <Sparkles className="w-3 h-3" /> Exclusivo Vistoriador Online
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 leading-none">Radar <span className="text-blue-600">Automotivo</span></h2>
           <p className="text-slate-500 font-medium max-w-md">As notícias que impactam o mercado, selecionadas por Inteligência Artificial em tempo real.</p>
        </div>
        
        <div className="w-full max-w-xl relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <input 
            type="text" 
            placeholder="O que você quer ler hoje?" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-16 py-6 bg-slate-50 border-2 border-transparent rounded-[2rem] shadow-inner text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-xl font-bold"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-slate-200 text-slate-500 hover:text-slate-800 rounded-xl transition-colors active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 animate-fade-in-up">
          <div className="bg-slate-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Search className="w-12 h-12 text-slate-300" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Nenhum resultado</h3>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">Tente buscar por termos mais genéricos como "Carro", "Mercado" ou "2024".</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
          >
            Ver todas as notícias
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post, idx) => (
            <article 
              key={post.id}
              className={`flex flex-col bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-lg hover-lift animate-fade-in-up stagger-${(idx % 3) + 1}`}
            >
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 opacity-70"></div>
                
                <img 
                  src={post.imageUrl || DEFAULT_IMAGE} 
                  alt={post.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                <div className="absolute top-8 left-8 z-20">
                  <span className="bg-blue-600 backdrop-blur-md text-white text-[10px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-[0.2em] shadow-xl border border-white/20">
                    {post.category}
                  </span>
                </div>

                <div className="absolute bottom-8 left-8 right-8 z-20">
                   <div className="flex items-center gap-4 text-[10px] font-black text-white/80 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" /> {post.date}
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-400" /> {post.readTime}
                      </div>
                   </div>
                </div>
              </div>

              <div className="p-10 md:p-12 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight transition-colors line-clamp-3 tracking-tighter hover:text-blue-600">
                  {post.title}
                </h3>

                <p className="text-slate-500 text-lg leading-relaxed mb-10 line-clamp-3 font-medium opacity-80">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-8 border-t border-slate-50">
                   <a 
                    href={post.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full py-6 px-8 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all duration-300 active:scale-95"
                   >
                     <span>Ler no Portal Original</span>
                     <ArrowRight className="w-5 h-5 transition-transform" />
                   </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Subscription / Info Box */}
      <div className="mt-24 p-12 md:p-20 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden shadow-2xl animate-fade-in-up stagger-3">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl -mr-48 -mt-48"></div>
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="text-center lg:text-left">
               <h4 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter leading-none">Mantenha-se <span className="text-blue-400">Informado</span></h4>
               <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">Não perca as atualizações do IPVA 2024, novos lançamentos e dicas de vistoria. O Vistoriador Online é seu parceiro na estrada.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
               <a 
                href="https://www.youtube.com/@Dodonaves" 
                target="_blank" 
                className="flex items-center justify-center gap-3 px-10 py-6 bg-red-600 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-red-500 transition-all shadow-xl active:scale-95 animate-pulse-subtle"
               >
                 Acompanhar no YouTube
               </a>
               <a 
                href="https://www.instagram.com/dodonaves/" 
                target="_blank" 
                className="flex items-center justify-center gap-3 px-10 py-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95"
               >
                 Seguir no Instagram
               </a>
            </div>
         </div>
      </div>

    </div>
  );
};

export default BlogPage;
