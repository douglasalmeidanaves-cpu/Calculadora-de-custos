import React, { useState } from 'react';
import { analyzeVehicle } from './services/geminiService';
import { VehicleReport } from './types';
import Hero from './components/Hero';
import CostGrid from './components/CostGrid';
import AnalysisSection from './components/AnalysisSection';
import CTA from './components/CTA';
import { CheckCircle2, Clock, Car } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<VehicleReport | null>(null);

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    setReport(null); // Clear previous result while loading

    try {
      const data = await analyzeVehicle(term);
      setReport(data);
    } catch (err) {
      setError("Não foi possível realizar a análise. Verifique sua conexão e tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Hero onSearch={handleSearch} isLoading={loading} />

      <main className="flex-grow container mx-auto px-4 -mt-10 md:-mt-16 relative z-10 pb-16">
        {error && (
          <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 shadow-sm">
            <p className="font-medium">Ocorreu um erro</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {report && (
          <div className="max-w-6xl mx-auto animate-fade-in-up">
            
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 flex flex-col items-center text-center relative overflow-hidden border-t-4 border-blue-600">
               <h2 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                 Relatório de Custos
               </h2>
               
               <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
                 {report.carName}
               </h1>
               
               <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-slate-500 text-sm font-medium">
                  <span className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500"/> 
                    Cálculo Média Brasil
                  </span>
                  <span className="hidden md:inline text-slate-300">•</span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-blue-500"/> 
                    Atualizado recentemente
                  </span>
               </div>
            </div>

            <CostGrid data={report} />
            
            <AnalysisSection data={report} />
            
            <div className="sticky bottom-6 z-50">
               <CTA text={report.ctaText} />
            </div>

            <p className="text-center text-xs text-slate-400 mt-12 max-w-2xl mx-auto">
              * Os valores apresentados são estimativas médias de mercado para peças de boa qualidade (primeira linha) e mão de obra convencional. Podem variar conforme região, estado de conservação do veículo e oficina escolhida. Este aplicativo utiliza Inteligência Artificial para projeções e não substitui orçamento técnico.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm border-t border-slate-800">
        <div className="container mx-auto px-4">
           <div className="flex justify-center items-center gap-2 mb-4 opacity-75">
             <Car className="w-6 h-6 text-slate-500" />
             <div className="font-bold text-lg text-white">Calculadora Automotiva</div>
           </div>
           <p className="mb-2">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
           <p className="text-xs text-slate-500">Política de Privacidade | Termos de Uso</p>
        </div>
      </footer>
    </div>
  );
};

export default App;