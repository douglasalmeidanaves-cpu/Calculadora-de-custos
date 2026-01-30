
import React from 'react';
import { FipeReport } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Calendar, DollarSign, BarChart2, ShoppingCart, Tag } from 'lucide-react';
import CTA from './CTA';

interface FipeTableProps {
  data: FipeReport;
}

const FipeTable: React.FC<FipeTableProps> = ({ data }) => {
  
  const getVariationIcon = () => {
    if (data.variationCode === 1) return <TrendingUp className="w-5 h-5 text-emerald-500" />;
    if (data.variationCode === -1) return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-slate-400" />;
  };

  const getMarketStatus = () => {
    const diff = data.marketAverage - data.fipePrice;
    if (diff > data.fipePrice * 0.02) return { text: "Acima da Tabela", color: "text-red-500", bg: "bg-red-50" };
    if (diff < -data.fipePrice * 0.02) return { text: "Abaixo da Tabela", color: "text-green-600", bg: "bg-green-50" };
    return { text: "Na Tabela", color: "text-blue-600", bg: "bg-blue-50" };
  };

  const marketStatus = getMarketStatus();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-slate-100">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
             <div>
                <h2 className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">Análise de Preço</h2>
                <h1 className="text-3xl font-black text-white">{data.model}</h1>
                <span className="inline-block bg-white/10 text-white px-3 py-1 rounded-lg text-sm font-bold mt-2">Ano {data.year}</span>
             </div>
             <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="text-xs text-white/60 font-bold uppercase mb-1">Mês de Referência</div>
                <div className="flex items-center gap-2 text-white font-medium">
                   <Calendar className="w-4 h-4" /> {data.referenceMonth}
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
             {/* Card Fipe */}
             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:bg-white/10 transition-colors">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                   <Tag className="w-12 h-12 text-white" />
                </div>
                <div className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">Tabela Fipe (Oficial)</div>
                <div className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                   R$ {data.fipePrice.toLocaleString('pt-BR')}
                </div>
                <div className={`inline-flex items-center gap-1.5 mt-3 text-sm font-bold ${data.variationCode === 1 ? 'text-emerald-400' : data.variationCode === -1 ? 'text-red-400' : 'text-slate-300'}`}>
                   {getVariationIcon()}
                   {data.variationValue} este mês
                </div>
             </div>

             {/* Card Mercado */}
             <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                   <ShoppingCart className="w-12 h-12 text-emerald-300" />
                </div>
                <div className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">Preço Médio de Mercado</div>
                <div className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                   R$ {data.marketAverage.toLocaleString('pt-BR')}
                </div>
                <div className="flex items-center gap-2 mt-3">
                   <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide bg-black/30 ${marketStatus.color === 'text-red-500' ? 'text-red-300' : marketStatus.color === 'text-green-600' ? 'text-green-300' : 'text-blue-300'}`}>
                      {marketStatus.text}
                   </span>
                   <span className="text-xs text-white/60">
                      R$ {data.marketMin.toLocaleString('pt-BR')} - {data.marketMax.toLocaleString('pt-BR')}
                   </span>
                </div>
             </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
           <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                 <BarChart2 className="w-5 h-5 text-blue-500" />
                 Tendência da Fipe (6 Meses)
              </h3>
           </div>

           <div className="h-64 w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.history}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}} 
                    dy={10}
                  />
                  <YAxis 
                    hide={true} 
                    domain={['dataMin - 1000', 'dataMax + 1000']}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Preço Fipe']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
               <DollarSign className="w-5 h-5 text-emerald-500" />
               Fipe vs Mercado
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
               A <strong>Tabela Fipe</strong> é apenas uma referência. O <strong>Preço de Mercado</strong> é o valor real que lojas e particulares estão pedindo. Carros populares ou SUVs a diesel costumam ser vendidos acima da Fipe (Ágio), enquanto carros de luxo antigos ou micos de mercado são vendidos abaixo (Deságio).
            </p>
         </div>

         <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
               <TrendingUp className="w-5 h-5" />
               Dica de Negociação
            </h3>
            <p className="text-sm text-blue-700/80 leading-relaxed">
               {marketStatus.text === "Acima da Tabela" 
                 ? "Este carro é muito procurado e valorizado. Dificilmente você encontrará ofertas boas muito abaixo da Fipe. Cuidado com golpes."
                 : marketStatus.text === "Abaixo da Tabela"
                 ? "Este carro sofre alta depreciação. Use isso a seu favor para negociar descontos agressivos na compra."
                 : "O mercado para este carro é equilibrado. Ofertas próximas da Fipe são justas se o carro estiver em bom estado."}
            </p>
         </div>
      </div>

      <div className="mb-12">
         <CTA text="Preço bom ou golpe? Consulte o histórico completo do veículo pela placa antes de transferir o Pix." />
      </div>

    </div>
  );
};

export default FipeTable;
