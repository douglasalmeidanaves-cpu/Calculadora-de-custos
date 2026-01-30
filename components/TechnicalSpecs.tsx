
import React from 'react';
import { TechSpecs } from '../types';
import { Zap, Settings, Gauge, Move, Droplets, Database, Scale, Box, Component, Disc, Ruler, Anchor, Globe, ExternalLink } from 'lucide-react';
import CTA from './CTA';

interface TechnicalSpecsProps {
  specs: TechSpecs;
}

const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ specs }) => {
  if (!specs) return null;

  // Destructuring with defaults to prevent "reading properties of undefined"
  const { 
    engine = {} as any, 
    transmission = {} as any, 
    performance = {} as any, 
    dimensions = {} as any, 
    consumption = {} as any, 
    chassis = {} as any,
    sources = []
  } = specs;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-cyan-600 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-100">
            <Database className="w-3 h-3" />
            Ficha Técnica Completa
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-2 tracking-tight">
            {specs.modelName || "Modelo não identificado"}
          </h1>
          <p className="text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-lg inline-block mt-2">
            Ano Referência: {specs.yearRef || "N/A"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Motorização */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-3">
             <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
               <Zap className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-slate-800">Motor & Performance</h3>
          </div>
          <div className="p-6 space-y-4">
             <SpecRow label="Motorização" value={engine.type || "N/A"} />
             <SpecRow label="Cilindrada" value={engine.displacement || "N/A"} />
             <SpecRow label="Aspiração" value={engine.aspiration || "N/A"} highlight />
             <SpecRow label="Válvulas" value={engine.valves || "N/A"} />
             <SpecRow label="Potência Máx." value={engine.power || "N/A"} />
             <SpecRow label="Torque Máx." value={engine.torque || "N/A"} />
             <div className="border-t border-slate-50 my-2"></div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl text-center">
                   <span className="text-xs text-slate-400 font-bold uppercase block mb-1">0 a 100 km/h</span>
                   <span className="text-lg font-black text-slate-800">{performance.zeroToHundred || "N/A"}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-center">
                   <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Velocidade Máx.</span>
                   <span className="text-lg font-black text-slate-800">{performance.maxSpeed || "N/A"}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           {/* Transmissão */}
           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-3">
                 <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                   <Settings className="w-5 h-5" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-800">Transmissão</h3>
              </div>
              <div className="p-6 space-y-3">
                 <SpecRow label="Câmbio" value={transmission.type || "N/A"} />
                 <SpecRow label="Marchas" value={transmission.gears || "N/A"} />
                 <SpecRow label="Tração" value={transmission.traction || "N/A"} />
              </div>
           </div>

           {/* Consumo */}
           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-3">
                 <div className="bg-green-100 p-2 rounded-lg text-green-600">
                   <Droplets className="w-5 h-5" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-800">Consumo (Inmetro)</h3>
              </div>
              <div className="p-6">
                 <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Etanol (Cidade)</span>
                        <span className="font-bold text-slate-800 text-lg">{consumption.cityEthanol || "N/A"}</span>
                    </div>
                    <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Gasolina (Cidade)</span>
                        <span className="font-bold text-slate-800 text-lg">{consumption.cityGas || "N/A"}</span>
                    </div>
                    <div className="col-span-2 h-px bg-slate-100"></div>
                    <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Etanol (Estrada)</span>
                        <span className="font-bold text-slate-800 text-lg">{consumption.roadEthanol || "N/A"}</span>
                    </div>
                    <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Gasolina (Estrada)</span>
                        <span className="font-bold text-slate-800 text-lg">{consumption.roadGas || "N/A"}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Mecânica e Rodas */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-3">
             <div className="bg-slate-200 p-2 rounded-lg text-slate-600">
               <Component className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-slate-800">Suspensão, Freios e Pneus</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-4">
                 <SpecRow label="Suspensão Dianteira" value={chassis.frontSuspension || "N/A"} />
                 <SpecRow label="Suspensão Traseira" value={chassis.rearSuspension || "N/A"} />
                 <SpecRow label="Direção" value={chassis.steering || "N/A"} />
              </div>
              <div className="space-y-4">
                 <SpecRow label="Freios Dianteiros" value={chassis.frontBrakes || "N/A"} />
                 <SpecRow label="Freios Traseiros" value={chassis.rearBrakes || "N/A"} />
                 <div className="flex justify-between items-center py-1 bg-slate-50 px-3 rounded-lg border border-slate-100">
                    <span className="text-sm text-slate-500 font-medium flex items-center gap-2"><Disc className="w-4 h-4"/> Pneus</span>
                    <span className="text-sm font-bold text-slate-800">{chassis.tires || "N/A"}</span>
                 </div>
              </div>
          </div>
      </div>

      {/* Dimensões Full Width */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-3">
             <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
               <Move className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-slate-800">Dimensões</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
               <DimensionBox icon={Scale} label="Peso" value={dimensions.weight || "N/A"} />
               <DimensionBox icon={Box} label="Porta-Malas" value={dimensions.trunk || "N/A"} />
               <DimensionBox icon={Gauge} label="Tanque" value={dimensions.tank || "N/A"} />
               <DimensionBox icon={Anchor} label="Vão Livre" value={dimensions.groundClearance || "N/A"} />
            </div>
            
            <div className="relative pt-6 border-t border-slate-100">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-xs uppercase font-bold mb-1">
                       <Ruler className="w-3 h-3 rotate-90" /> Comprimento
                    </div>
                    <span className="text-xl font-bold text-slate-700">{dimensions.length || "N/A"}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-xs uppercase font-bold mb-1">
                       <Ruler className="w-3 h-3" /> Largura
                    </div>
                    <span className="text-xl font-bold text-slate-700">{dimensions.width || "N/A"}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-xs uppercase font-bold mb-1">
                       <Move className="w-3 h-3" /> Entre-eixos
                    </div>
                    <span className="text-xl font-bold text-slate-700">{dimensions.wheelbase || "N/A"}</span>
                  </div>
               </div>
            </div>
          </div>
      </div>

      {/* Sources */}
      {sources && sources.length > 0 && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
           <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
             <Globe className="w-3.5 h-3.5" /> Fontes Consultadas
           </h4>
           <div className="flex flex-wrap gap-2">
              {sources.slice(0, 5).map((source, idx) => (
                <a 
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:text-cyan-600 hover:border-cyan-200 transition-all shadow-sm group"
                >
                  <span className="truncate max-w-[150px]">{source.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
           </div>
        </div>
      )}

      <div className="mb-8">
        <CTA text="Vai comprar este carro? Consulte a placa para verificar se o motor ou câmbio já foram trocados." />
      </div>

    </div>
  );
};

const SpecRow: React.FC<{label: string, value: string, highlight?: boolean}> = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
    <span className="text-sm text-slate-500 font-medium">{label}</span>
    <span className={`text-sm font-bold ${highlight ? 'text-cyan-600' : 'text-slate-800'}`}>{value}</span>
  </div>
);

const DimensionBox: React.FC<{icon: any, label: string, value: string}> = ({ icon: Icon, label, value }) => (
   <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100">
      <div className="text-slate-400 mb-2">
         <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs text-slate-500 font-bold uppercase mb-1">{label}</span>
      <span className="font-black text-slate-800 text-lg">{value}</span>
   </div>
);

export default TechnicalSpecs;
