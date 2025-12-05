import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface HeroProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
      {/* Abstract Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        
        {/* Removed Brand/Logo Area */}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          Calculadora de <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Manutenção Automotiva
          </span>
        </h1>
        
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Descubra quanto custa manter qualquer veículo. Estimativas baseadas na média nacional de peças e mão de obra.
        </p>

        {/* Search Box Container */}
        <div className="max-w-xl mx-auto bg-white p-2 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <Search className="absolute left-4 w-6 h-6 text-slate-400" />
            <input
              type="text"
              className="w-full pl-14 pr-4 py-4 bg-transparent text-slate-800 text-lg font-medium placeholder-slate-400 focus:outline-none"
              placeholder="Qual carro você quer consultar?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="hidden md:inline">Calculando...</span>
                </>
              ) : (
                "Calcular"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-sm text-blue-200/60 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>Ex: Honda Civic 2018, Fiat Toro Diesel, Onix 1.0</span>
        </p>
      </div>
    </div>
  );
};

export default Hero;