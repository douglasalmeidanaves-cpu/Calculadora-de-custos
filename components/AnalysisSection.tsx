
import React from 'react';
import { VehicleReport } from '../types';
import { ThumbsUp, ThumbsDown, Wrench, Info, ExternalLink, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AnalysisSectionProps {
  data: VehicleReport;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ data }) => {
  const { analysis, costs, sources } = data;

  const chartConfig: Array<{
    key: keyof typeof costs;
    label: string;
    transform?: (val: number) => number;
  }> = [
    { key: 'oil', label: 'Óleo' },
    { key: 'brakes', label: 'Freios' },
    { key: 'tires', label: 'Pneus', transform: (val: number) => val / 4 }, 
    { key: 'annualService', label: 'Revisão' },
    { key: 'costPer10k', label: '10k km' },
  ];

  const maintenanceChartData = chartConfig.map(item => {
    const costItem = (costs as any)[item.key];
    const rawValue = costItem ? costItem.rawAmount : 0;
    
    return {
      name: item.label,
      amount: item.transform ? Math.round(item.transform(rawValue)) : rawValue
    };
  });

  return (
    <div className="space-y-8 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Análise do Especialista
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              {analysis?.summary || "Resumo não disponível."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                 <h4 className="font-semibold text-green-700 flex items-center text-sm uppercase tracking-wide">
                   <ThumbsUp className="w-4 h-4 mr-2" /> Pontos Fortes
                 </h4>
                 <ul className="space-y-2">
                   {(analysis?.pros || []).map((pro, idx) => (
                     <li key={idx} className="flex items-start text-sm text-slate-600">
                       <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                       {pro}
                     </li>
                   ))}
                   {(!analysis?.pros || analysis.pros.length === 0) && <li className="text-xs text-slate-400 italic">Nenhum dado encontrado.</li>}
                 </ul>
              </div>
              <div className="space-y-3">
                 <h4 className="font-semibold text-red-700 flex items-center text-sm uppercase tracking-wide">
                   <ThumbsDown className="w-4 h-4 mr-2" /> Pontos de Atenção
                 </h4>
                 <ul className="space-y-2">
                   {(analysis?.cons || []).map((con, idx) => (
                     <li key={idx} className="flex items-start text-sm text-slate-600">
                       <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                       {con}
                     </li>
                   ))}
                   {(!analysis?.cons || analysis.cons.length === 0) && <li className="text-xs text-slate-400 italic">Nenhum dado encontrado.</li>}
                 </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex-1 w-full">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Nível de Manutenção</h4>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${analysis?.maintenanceLevel === 'Caro' ? 'bg-red-500 w-full' : analysis?.maintenanceLevel === 'Moderado' ? 'bg-yellow-500 w-2/3' : 'bg-green-500 w-1/3'}`}
                  ></div>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-800">{analysis?.maintenanceLevel || "N/A"}</p>
             </div>
             
             <div className="flex-1 w-full">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Disponibilidade de Peças</h4>
                <div className="flex items-center gap-2">
                   <Wrench className="w-5 h-5 text-slate-400" />
                   <span className="text-slate-800 font-medium">{analysis?.partsAvailability || "N/A"}</span>
                </div>
             </div>
          </div>

          {/* Grounding Sources */}
          {sources && sources.length > 0 && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Globe className="w-3.5 h-3.5" /> Fontes de Pesquisa (Internet)
               </h4>
               <div className="flex flex-wrap gap-2">
                  {sources.slice(0, 5).map((source, idx) => (
                    <a 
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group"
                    >
                      <span className="truncate max-w-[150px]">{source.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
               </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Comparativo de Custos</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value}`, 'Custo Estimado']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {maintenanceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? '#0891b2' : '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed">
              * Valores médios estimados via busca ativa em portais de autopeças e serviços.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;
