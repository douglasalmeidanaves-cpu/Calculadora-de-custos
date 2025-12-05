import React from 'react';
import { VehicleReport } from '../types';
import { ThumbsUp, ThumbsDown, Wrench, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AnalysisSectionProps {
  data: VehicleReport;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ data }) => {
  const { analysis, costs } = data;

  // Prepare data for chart
  const chartData = [
    { name: 'Óleo', amount: costs.oil.rawAmount },
    { name: 'Freios', amount: costs.brakes.rawAmount },
    { name: 'Pneus', amount: costs.tires.rawAmount / 4 }, // Cost per tire roughly for scale
    { name: 'Revisão', amount: costs.annualService.rawAmount },
    { name: '10k km', amount: costs.costPer10k.rawAmount },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Text Analysis */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            Análise do Especialista
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            {analysis.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
               <h4 className="font-semibold text-green-700 flex items-center text-sm uppercase tracking-wide">
                 <ThumbsUp className="w-4 h-4 mr-2" /> Pontos Fortes
               </h4>
               <ul className="space-y-2">
                 {analysis.pros.map((pro, idx) => (
                   <li key={idx} className="flex items-start text-sm text-slate-600">
                     <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                     {pro}
                   </li>
                 ))}
               </ul>
            </div>
            <div className="space-y-3">
               <h4 className="font-semibold text-red-700 flex items-center text-sm uppercase tracking-wide">
                 <ThumbsDown className="w-4 h-4 mr-2" /> Pontos de Atenção
               </h4>
               <ul className="space-y-2">
                 {analysis.cons.map((con, idx) => (
                   <li key={idx} className="flex items-start text-sm text-slate-600">
                     <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                     {con}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>

        {/* Maintenance Profile */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex-1 w-full">
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Nível de Manutenção</h4>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${analysis.maintenanceLevel === 'Caro' ? 'bg-red-500 w-full' : analysis.maintenanceLevel === 'Moderado' ? 'bg-yellow-500 w-2/3' : 'bg-green-500 w-1/3'}`}
                ></div>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-800">{analysis.maintenanceLevel}</p>
           </div>
           
           <div className="flex-1 w-full">
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Disponibilidade de Peças</h4>
              <div className="flex items-center gap-2">
                 <Wrench className="w-5 h-5 text-slate-400" />
                 <span className="text-slate-800 font-medium">{analysis.partsAvailability}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Chart */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Comparativo de Custos</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value}`, 'Custo Estimado']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#0891b2' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-400 mt-4">
            * Pneu refere-se ao valor unitário médio para escala visual.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;
