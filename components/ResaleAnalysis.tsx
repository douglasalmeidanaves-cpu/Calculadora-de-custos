
import React from 'react';
import { ResaleReport } from '../types';
import { TrendingUp, Clock, Percent, DollarSign, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle2, BarChart3 } from 'lucide-react';
import CTA from './CTA';

interface ResaleAnalysisProps {
  report: ResaleReport;
}

const ResaleAnalysis: React.FC<ResaleAnalysisProps> = ({ report }) => {
  
  if (!report) return null;

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-500';
    if (score >= 6) return 'text-blue-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-emerald-500';
    if (score >= 6) return 'bg-blue-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLiquidityIcon = (status: string) => {
    if (status === 'Excelente' || status === 'Boa') return <DollarSign className="w-8 h-8 text-white" />;
    if (status === 'Média') return <BarChart3 className="w-8 h-8 text-white" />;
    return <AlertTriangle className="w-8 h-8 text-white" />;
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      
      {/* Header with Score */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-slate-100">
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <h2 className="text-white text-lg font-medium opacity-80 mb-2">Análise de Mercado (Busca Ativa)</h2>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6">{report.modelName}</h1>
          
          {/* Gauge / Score */}
          <div className="flex flex-col items-center justify-center">
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center border-4 border-white/20 mb-3 ${getScoreBg(report.score || 0)} shadow-[0_0_20px_rgba(255,255,255,0.3)]`}>
               {getLiquidityIcon(report.liquidityStatus || "Média")}
            </div>
            <div className={`px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold uppercase tracking-wider text-sm`}>
               Liquidez {report.liquidityStatus || "N/A"}
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
           <div className="p-6 text-center hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase mb-2">
                 <Clock className="w-4 h-4" /> Tempo Médio de Venda
              </div>
              <p className="text-xl font-black text-slate-800">{report.avgTimeToSell || "N/A"}</p>
           </div>
           
           <div className="p-6 text-center hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase mb-2">
                 <Percent className="w-4 h-4" /> Desvalorização (Anual)
              </div>
              <p className={`text-xl font-black ${report.score < 5 ? 'text-red-500' : 'text-slate-800'}`}>
                {report.depreciation1Year || "N/A"}
              </p>
           </div>

           <div className="p-6 text-center hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase mb-2">
                 <TrendingUp className="w-4 h-4" /> Nota de Revenda
              </div>
              <p className={`text-xl font-black ${getScoreColor(report.score || 0)}`}>
                {report.score || 0}/10
              </p>
           </div>
        </div>
      </div>

      {/* Verdict Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
               <CheckCircle2 className="w-6 h-6 text-emerald-500" />
               Veredito do Mercado
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg italic">
               "{report.marketVerdict || "Análise resumida não disponível."}"
            </p>
         </div>

         <div className="md:col-span-1 flex flex-col gap-4">
            <div className="bg-green-50 rounded-xl p-5 border border-green-100 flex-1">
               <h4 className="font-bold text-green-800 flex items-center gap-2 mb-3 text-sm uppercase">
                  <ThumbsUp className="w-4 h-4" /> Pontos Fortes
               </h4>
               <ul className="space-y-2">
                  {(report.positivePoints || []).map((p, i) => (
                     <li key={i} className="text-sm text-green-700/80 flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {p}
                     </li>
                  ))}
               </ul>
            </div>
            
            <div className="bg-red-50 rounded-xl p-5 border border-red-100 flex-1">
               <h4 className="font-bold text-red-800 flex items-center gap-2 mb-3 text-sm uppercase">
                  <ThumbsDown className="w-4 h-4" /> Pontos Fracos
               </h4>
               <ul className="space-y-2">
                  {(report.negativePoints || []).map((p, i) => (
                     <li key={i} className="text-sm text-red-700/80 flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {p}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex items-start gap-4">
         <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
         <div>
            <h4 className="font-bold text-amber-800 mb-1 leading-tight">Dica de Especialista: O Carro "Casamento"</h4>
            <p className="text-amber-700/80 text-sm leading-relaxed mt-2">
               Carros com baixa liquidez (os famosos "casamentos") exigem uma vistoria ainda mais rigorosa. Muitas vezes o baixo preço de revenda esconde um histórico de manutenção negligenciada.
            </p>
         </div>
      </div>

      <div className="mb-12">
         <CTA text="Vai fechar negócio? Verifique se o veículo tem restrições de venda ou dívidas ativas pela placa." />
      </div>

    </div>
  );
};

export default ResaleAnalysis;
