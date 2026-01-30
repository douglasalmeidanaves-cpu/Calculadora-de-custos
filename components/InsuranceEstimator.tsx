
import React from 'react';
import { Shield, ShieldCheck, AlertTriangle, Info, CheckCircle2, MessageCircle, ArrowRight, DollarSign, UserCheck, XCircle, Globe, ExternalLink } from 'lucide-react';
import { InsuranceQuote } from '../types';
import CTA from './CTA';

interface InsuranceEstimatorProps {
  quote: InsuranceQuote;
}

const InsuranceEstimator: React.FC<InsuranceEstimatorProps> = ({ quote }) => {
  const whatsappUrl = "https://wa.me/5511916668244?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20seguros%20oferecidos%20pela%20Seguralta.%20Pode%20me%20ajudar%3F";

  if (!quote) return null;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up px-2 sm:px-4">
      
      {/* Header Result */}
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-12 mb-6 md:mb-8 border-t-8 border-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
           <Shield className="w-48 h-48 md:w-64 md:h-64 text-indigo-900" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-indigo-50 text-indigo-700 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 md:mb-6 border border-indigo-100 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 md:w-4 h-4" />
            Sua Cotação Estimada (IA)
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
            {quote.carModel} <span className="text-indigo-600/30 font-light block sm:inline">{quote.year}</span>
          </h1>
          
          <div className="flex items-center gap-2 text-slate-500 font-bold bg-slate-50 px-4 py-2.5 md:px-8 md:py-3 rounded-xl md:rounded-2xl border border-slate-100 shadow-inner text-sm md:text-base">
            <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
            Valor FIPE: R$ {(quote.estimatedValue || 0).toLocaleString('pt-BR')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
        
        {/* Pricing Card - Highlighted */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-10 text-white relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 md:mb-10">
            <h3 className="text-lg md:text-xl font-bold flex items-center gap-3 text-indigo-300">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6" />
              Investimento Estimado
            </h3>
            <div className="bg-white/10 px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-tighter border border-white/10">
              Dados Seguralta/Web
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
            <div className="text-center md:text-left">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 md:mb-3">Parcela Média Mensal</span>
              <div className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter">
                <span className="text-2xl md:text-3xl font-normal text-indigo-400 mr-1 md:mr-2">R$</span>
                {(quote.monthlyCostAverage || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <p className="text-slate-500 text-[10px] md:text-xs font-medium mt-3 md:mt-4">
                * Estimativa em 12 parcelas fixas sugeridas.
              </p>
            </div>

            <div className="bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between text-[9px] md:text-xs font-bold mb-4 uppercase tracking-wider text-indigo-200">
                <span>Custo Anual</span>
                <span className="hidden sm:inline">Variação de Perfil</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-center flex-1">
                   <div className="text-lg md:text-2xl font-black text-white">R$ {(quote.annualCostMin || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                   <div className="text-[8px] md:text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1 leading-none">Perfil Sênior</div>
                </div>
                <div className="h-1 flex-grow bg-gradient-to-r from-emerald-500/40 via-indigo-500/40 to-red-500/40 rounded-full hidden sm:block"></div>
                <div className="text-center flex-1">
                   <div className="text-lg md:text-2xl font-black text-white">R$ {(quote.annualCostMax || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                   <div className="text-[8px] md:text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1 leading-none">Perfil Jovem</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk & Coverage Card */}
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-lg p-6 md:p-8 border border-slate-100">
            <h3 className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" />
              Análise de Risco
            </h3>

            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              <span className="text-xs md:text-sm font-bold text-slate-700">Sinistralidade</span>
              <span className={`px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest ${
                quote.riskCategory === 'Alto' ? 'bg-red-100 text-red-600' :
                quote.riskCategory === 'Médio' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-100 text-emerald-600'
              }`}>
                {quote.riskCategory || "Médio"}
              </span>
            </div>

            <div className="space-y-2 md:space-y-3">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Fatores Chave</p>
              {(quote.mainFactors || []).map((factor, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-slate-50/50 rounded-xl text-[10px] md:text-xs text-slate-600 border border-slate-100">
                  <div className="w-1 h-1 bg-indigo-500 rounded-full flex-shrink-0"></div>
                  {factor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Section */}
      <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-lg border border-slate-100 p-6 md:p-8 mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-black text-slate-800 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
          <Shield className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
          Coberturas Base Inclusas
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
           {(quote.coverageDetails || []).map((item, idx) => (
             <div key={idx} className={`p-3 md:p-4 rounded-xl md:rounded-2xl border flex flex-col items-center gap-2 md:gap-3 transition-all ${item.included ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                {item.included ? (
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                ) : (
                  <XCircle className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
                )}
                <span className={`text-[10px] md:text-[11px] font-bold text-center leading-tight ${item.included ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {item.label}
                </span>
             </div>
           ))}
        </div>
      </div>

      {/* Grounding Sources */}
      {quote.sources && quote.sources.length > 0 && (
        <div className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 mb-6 md:mb-8">
           <h4 className="text-[9px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2">
             <Globe className="w-3 h-3 md:w-3.5 md:h-3.5" /> Referências Consultadas
           </h4>
           <div className="flex flex-wrap gap-2 md:gap-3">
              {quote.sources.slice(0, 4).map((source, idx) => (
                <a 
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-slate-200 text-[10px] md:text-xs font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm group overflow-hidden"
                >
                  <span className="truncate max-w-[120px] sm:max-w-[200px]">{source.title}</span>
                  <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3 opacity-50 group-hover:opacity-100" />
                </a>
              ))}
           </div>
        </div>
      )}

      {/* Specialist WhatsApp CTA - Refined for Mobile */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-600 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-14 mb-8 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="text-center lg:text-left text-white max-w-2xl">
               <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8 border border-white/20">
                  <UserCheck className="w-3.5 h-3.5" /> Consultoria Especializada Seguralta
               </div>
               <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight tracking-tight">
                  Valor <span className="text-emerald-200">Exato</span> para Você?
               </h3>
               <p className="text-emerald-50 text-sm md:text-xl opacity-90 leading-relaxed font-medium">
                  Estes valores são estimativas inteligentes. Fale agora com um especialista da <strong>Seguralta</strong> e tenha sua cotação final.
               </p>
            </div>
            
            <a 
               href={whatsappUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-6 md:px-14 md:py-8 rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-2xl flex flex-col items-center gap-2 shadow-xl transition-all hover:scale-[1.03] active:scale-95 w-full lg:w-auto group/btn animate-pulse-subtle"
            >
               <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 md:w-8 md:h-8 fill-emerald-600" />
                  <span>Cotar no WhatsApp</span>
                  <ArrowRight className="w-5 h-5 md:w-7 md:h-7 group-hover/btn:translate-x-1 transition-transform" />
               </div>
               <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Seguralta: Corretora de Seguros</span>
            </a>
         </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-12 shadow-sm">
        <div className="bg-amber-100 p-3 md:p-4 rounded-xl md:rounded-2xl shrink-0">
           <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
        </div>
        <div className="text-amber-900 text-[11px] md:text-sm leading-relaxed">
          <strong className="block font-black text-sm md:text-lg mb-1 md:mb-2 uppercase tracking-tight">Nota Importante</strong>
          O simulador utiliza IA para pesquisar valores públicos aproximados. O custo real depende do seu perfil e bônus junto às seguradoras parceiras da **Seguralta**.
        </div>
      </div>

    </div>
  );
};

export default InsuranceEstimator;
