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
    <div className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16 px-4 md:px-8 shadow-xl rounded-b-[2.5rem]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-full mb-4 ring-1 ring-blue-400/30 backdrop-blur-sm">
          <Search className="w-8 h-8 text-blue-300 mr-2" />
          <span className="font-bold text-blue-100 tracking-wide text-lg uppercase">Vistoriador Online</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Quanto custa manter seu <span className="text-blue-400">veículo?</span>
        </h1>
        
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
          Digite o <strong>modelo e ano</strong> do carro e descubra os custos reais de manutenção: óleo, pneus, freios e revisões.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative flex bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="flex items-center pl-4">
               <Search className="text-gray-400 w-6 h-6" />
            </div>

            <input
              type="text"
              className="flex-grow py-4 px-4 text-gray-800 focus:outline-none text-lg placeholder-gray-400 font-medium"
              placeholder="Ex: Honda Civic 2018, Fiat Toro Diesel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
            
            <button 
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
              className="px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Calcular"
              )}
            </button>
          </div>
        </form>
        
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mt-4">
          <AlertCircle className="w-4 h-4" />
          <span>Calculadora baseada na média de mercado nacional</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;