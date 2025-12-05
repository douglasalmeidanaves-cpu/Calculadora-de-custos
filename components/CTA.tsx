import React from 'react';
import { ShieldCheck, SearchCheck } from 'lucide-react';

interface CTAProps {
  text: string;
}

const CTA: React.FC<CTAProps> = ({ text }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-5 text-white shadow-xl relative overflow-hidden transform hover:-translate-y-1 transition duration-300 ring-4 ring-white/50">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-black opacity-10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mb-2">
            <ShieldCheck className="w-3 h-3" />
            Segurança Total
          </div>
          {/* Brand Name Removed */}
          <p className="text-blue-50 text-sm font-medium leading-snug drop-shadow-sm opacity-95 mt-1">
            {text}
          </p>
        </div>
        
        <div className="flex-shrink-0 mt-2 md:mt-0">
          <a 
            href="https://vistoriadoronline.com.br" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 bg-white text-emerald-700 px-6 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg hover:shadow-xl text-sm whitespace-nowrap uppercase tracking-wide"
          >
            Consultar Placa Agora
            <SearchCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTA;