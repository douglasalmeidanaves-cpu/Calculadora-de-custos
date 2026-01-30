
import React from 'react';
import { SearchCheck, ArrowRight } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  return (
    <a
      href="https://vistoriadoronline.com.br"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group animate-fade-in-up delay-500"
    >
      <div className="bg-slate-900/90 hover:bg-emerald-600 text-white shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.4)] transition-all duration-300 rounded-full pl-5 pr-2 py-2 flex items-center gap-3 border border-white/10 backdrop-blur-md transform hover:-translate-y-1">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-medium leading-none mb-0.5 group-hover:text-emerald-100 uppercase tracking-wider">
            Consulta Completa
          </span>
          <span className="font-bold text-xs md:text-sm leading-none group-hover:text-white">
            Descubra todo histórico pela placa
          </span>
        </div>
        
        <div className="bg-emerald-500 group-hover:bg-white text-white group-hover:text-emerald-600 p-2 rounded-full transition-colors">
          <SearchCheck className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};

export default FloatingCTA;
