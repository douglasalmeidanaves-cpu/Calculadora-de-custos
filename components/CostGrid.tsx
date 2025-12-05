import React from 'react';
import { VehicleReport } from '../types';
import { 
  Droplets, 
  Disc, 
  Activity, 
  CircleDashed, 
  Settings, 
  Zap, 
  Flame, 
  Crosshair, 
  CalendarCheck, 
  TrendingUp 
} from 'lucide-react';

interface CostGridProps {
  data: VehicleReport;
}

const CostGrid: React.FC<CostGridProps> = ({ data }) => {
  const { costs } = data;

  const items = [
    { icon: Droplets, title: "Troca de Óleo + Filtro", ...costs.oil, color: "text-amber-600", bg: "bg-amber-100" },
    { icon: Disc, title: "Pastilhas de Freio", ...costs.brakes, color: "text-red-600", bg: "bg-red-100" },
    { icon: Activity, title: "Amortecedores (Jogo)", ...costs.shocks, color: "text-blue-600", bg: "bg-blue-100" },
    { icon: CircleDashed, title: "Pneus (Jogo)", ...costs.tires, color: "text-slate-700", bg: "bg-slate-200" },
    { 
      icon: Settings, 
      title: "Distribuição", 
      value: costs.transmission.value, 
      details: costs.transmission.details,
      color: "text-purple-600", 
      bg: "bg-purple-100" 
    },
    { icon: Zap, title: "Bateria", ...costs.battery, color: "text-yellow-600", bg: "bg-yellow-100" },
    { icon: Flame, title: "Velas (Jogo)", ...costs.plugs, color: "text-orange-600", bg: "bg-orange-100" },
    { icon: Crosshair, title: "Alinhamento + Balanc.", ...costs.alignment, color: "text-emerald-600", bg: "bg-emerald-100" },
    { icon: CalendarCheck, title: "Revisão Anual Média", ...costs.annualService, color: "text-indigo-600", bg: "bg-indigo-100", highlight: true },
    { icon: TrendingUp, title: "Custo por 10.000km", ...costs.costPer10k, color: "text-cyan-600", bg: "bg-cyan-100", highlight: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {items.map((item, index) => {
        const Icon = item.icon;
        // Fix TS error: Property 'highlight' does not exist on some union members.
        const isHighlighted = (item as any).highlight;
        
        return (
          <div 
            key={index} 
            className={`
              relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg
              ${isHighlighted ? 'bg-white border-blue-200 shadow-md col-span-1 md:col-span-1 lg:col-span-1 ring-1 ring-blue-100' : 'bg-white border-slate-100'}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${item.bg}`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
            </div>
            
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              {item.title}
            </h3>
            
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-800">{item.value}</span>
            </div>

            {item.details && (
              <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded bg-slate-100 text-slate-600">
                {item.details}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CostGrid;