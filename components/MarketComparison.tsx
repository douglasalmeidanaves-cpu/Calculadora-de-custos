
import React from 'react';
import { CheckCircle, AlertTriangle, DollarSign, Award, ArrowRight, Check, AlertCircle, Sparkles, Globe, ExternalLink } from 'lucide-react';
import { CarRecommendation } from '../types';
import CTA from './CTA';

interface MarketComparisonProps {
  recommendations: CarRecommendation[];
  hasSearched: boolean;
}

const MarketComparison: React.FC<MarketComparisonProps> = ({ recommendations, hasSearched }) => {

  if (!hasSearched) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in-up">
        <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-100 hover-lift">
           <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <Award className="w-10 h-10 text-blue-500" />
           </div>
           <h2 className="text-2xl font-bold text-slate-800 mb-4">Pronto para encontrar seu próximo carro?</h2>
           <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
             Nossa IA realiza buscas em tempo real em portais de classificados (Webmotors, iCarros, OLX) para encontrar as melhores oportunidades para você.
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-10 text-center relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-24 h-24 text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">Melhores Opções Encontradas</h2>
          <div className="flex items-center justify-center gap-2 text-blue-200/70 font-bold uppercase text-[10px] tracking-widest">
            <Globe className="w-3.5 h-3.5" /> Resultados baseados em pesquisa web ativa e confiável
          </div>
        </div>

        <div className="p-6 md:p-10 bg-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {(recommendations || []).map((car, idx) => (
              <div key={idx} className={`bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60 hover-lift transition-all duration-300 flex flex-col h-full relative overflow-hidden group stagger-${(idx % 3) + 1}`}>
                
                <div className={`absolute top-0 right-0 px-5 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}>
                  {idx === 0 ? '🏆 Melhor Escolha' : `#${idx + 1} Opção`}
                </div>

                <div className="mb-6 mt-4">
                  <h3 className="text-2xl font-black text-slate-800 mb-2 transition-colors tracking-tight group-hover:text-blue-600">{car.model}</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center text-emerald-600 font-black bg-emerald-50 px-3 py-1 rounded-xl text-sm border border-emerald-100">
                      <DollarSign className="w-3.5 h-3.5 mr-1" />
                      R$ {car.avgPrice?.toLocaleString('pt-BR') || "Sob Consulta"}
                    </div>
                    <div className="inline-flex items-center text-slate-500 bg-slate-100 px-3 py-1 rounded-xl text-xs font-bold border border-slate-200/50">
                      {car.yearRange}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 flex-grow">
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">O Veredito</h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                      "{car.verdict}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                     <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <span className="block text-slate-400 font-bold uppercase tracking-tighter mb-1">Manutenção</span>
                        <span className={`font-black uppercase tracking-wide ${car.maintenanceScore === 'Baixo' ? 'text-emerald-500' : car.maintenanceScore === 'Médio' ? 'text-amber-500' : 'text-red-500'}`}>
                          {car.maintenanceScore}
                        </span>
                     </div>
                     <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <span className="block text-slate-400 font-bold uppercase tracking-tighter mb-1">Revenda</span>
                        <span className={`font-black uppercase tracking-wide ${car.liquidityScore === 'Alta' ? 'text-emerald-500' : car.liquidityScore === 'Média' ? 'text-amber-500' : 'text-red-500'}`}>
                          {car.liquidityScore}
                        </span>
                     </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                       <CheckCircle className="w-4 h-4 text-emerald-500" />
                       <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Pontos Fortes</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(car.pros || []).map((p, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-100/50 hover:bg-emerald-100 transition-colors">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {car.sources && car.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">Referências de Preço</span>
                       <div className="flex flex-wrap gap-1">
                         {car.sources.slice(0, 2).map((s, si) => (
                           <a 
                             key={si}
                             href={s.uri}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-[10px] text-blue-500 font-bold hover:underline flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded transition-all active:scale-95"
                           >
                             <ExternalLink className="w-2.5 h-2.5" />
                             {s.title.substring(0, 15)}...
                           </a>
                         ))}
                       </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-10">
            <CTA text="Antes de fechar negócio, faça a consulta completa da placa para evitar carros com leilão ou sinistros." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketComparison;
