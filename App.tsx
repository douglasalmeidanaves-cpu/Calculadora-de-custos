import React, { useState } from 'react';
import { analyzeVehicle } from './services/geminiService';
import { VehicleReport } from './types';
import Hero from './components/Hero';
import CostGrid from './components/CostGrid';
import AnalysisSection from './components/AnalysisSection';
import CTA from './components/CTA';
import { CheckCircle2, Clock } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Hero onSearch={handleSearch} isLoading={loading} />

      <main className="flex-grow container mx-auto px-4 -mt-10 relative z-10 pb-16">
        {error && (
          <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 shadow-sm">
            <p className="font-medium">Ocorreu um erro</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {report && (
          <div className="max-w-6xl mx-auto animate-fade-in-up">
            
            {/* Header Card - Centered and Clean */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 flex flex-col items-center text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
               
               <h2 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                 Relatório de Custos
               </h2>
               
               <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
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

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Vistoriador Online. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;