
import React, { useState } from 'react';
import { analyzeVehicle, getRecommendations, calculateInsurance, getMotivationalMessage, getCarSpecs, analyzeResale, getFipeReport } from './services/geminiService';
import { VehicleReport, CarRecommendation, InsuranceQuote, AppView, TechSpecs, ResaleReport, FipeReport } from './types';
import Hero from './components/Hero';
import CostGrid from './components/CostGrid';
import AnalysisSection from './components/AnalysisSection';
import CommonIssues from './components/CommonIssues';
import CTA from './components/CTA';
import MarketComparison from './components/MarketComparison';
import InsuranceEstimator from './components/InsuranceEstimator';
import MotivationChat from './components/MotivationChat';
import AffiliatePage from './components/AffiliatePage';
import BlogPage from './components/BlogPage';
import FloatingCTA from './components/FloatingCTA';
import TechnicalSpecs from './components/TechnicalSpecs';
import ResaleAnalysis from './components/ResaleAnalysis';
import FipeTable from './components/FipeTable';
import { CheckCircle2, Clock, AlertCircle, Shield, MapPin, Phone, Instagram, Youtube, Mail, Car } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [history, setHistory] = useState<AppView[]>([]);
  const [report, setReport] = useState<VehicleReport | null>(null);
  const [recommendations, setRecommendations] = useState<CarRecommendation[]>([]);
  const [hasComparisonSearched, setHasComparisonSearched] = useState(false);
  const [insuranceQuote, setInsuranceQuote] = useState<InsuranceQuote | null>(null);
  const [techSpecs, setTechSpecs] = useState<TechSpecs | null>(null);
  const [resaleReport, setResaleReport] = useState<ResaleReport | null>(null);
  const [fipeReport, setFipeReport] = useState<FipeReport | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [hasInteractedWithChat, setHasInteractedWithChat] = useState(false);

  const handleServiceError = (err: any) => {
    setError("Ops! Erro na conexão com o sistema de Inteligência. Tente novamente em alguns segundos.");
    console.error(err);
  };

  const handleViewChange = (newView: AppView) => {
    if (newView === currentView) return;
    setHistory(prev => [...prev, currentView]);
    setCurrentView(newView);
    setError(null);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const previousView = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentView(previousView);
    setError(null);
  };

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeVehicle(term);
      setReport(data);
      setCurrentView('calculator');
    } catch (err) {
      handleServiceError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComparisonSearch = async (budget: number, category: 'hatch' | 'sedan' | 'suv') => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecommendations(budget, category);
      setRecommendations(data);
      setHasComparisonSearched(true);
      setCurrentView('comparison');
    } catch (err) {
      handleServiceError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInsuranceSearch = async (model: string, year: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await calculateInsurance(model, year);
      setInsuranceQuote(data);
      setCurrentView('insurance');
    } catch (err) {
      handleServiceError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecsSearch = async (model: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCarSpecs(model);
      setTechSpecs(data);
      setCurrentView('specs');
    } catch (err) {
      handleServiceError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResaleSearch = async (model: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeResale(model);
      setResaleReport(data);
      setCurrentView('resale');
    } catch (err) {
      handleServiceError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFipeSearch = async (model: string, year: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFipeReport(model, year);
      setFipeReport(data);
      setCurrentView('fipe');
    } catch (err) {
      handleServiceError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (message: string) => {
    setLoading(true);
    setError(null);
    setLastUserMessage(message);
    try {
      const response = await getMotivationalMessage(message);
      setChatResponse(response);
      setHasInteractedWithChat(true);
      setCurrentView('conversation');
    } catch (err) {
      handleServiceError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">
      <Hero 
        onSearch={handleSearch} 
        onCompareSearch={handleComparisonSearch}
        onInsuranceSearch={handleInsuranceSearch}
        onSpecsSearch={handleSpecsSearch}
        onResaleSearch={handleResaleSearch}
        onFipeSearch={handleFipeSearch}
        onChatSubmit={handleChatSubmit}
        isLoading={loading} 
        currentView={currentView}
        onViewChange={handleViewChange}
        onBack={handleBack}
        canGoBack={history.length > 0}
      />

      <main className={`flex-grow container mx-auto px-4 relative z-10 pb-16 ${currentView === 'home' ? 'mt-0' : '-mt-10 md:-mt-16'}`}>
        
        {error && (
            <div className="max-w-4xl mx-auto bg-red-50 border border-red-100 text-red-700 px-8 py-5 rounded-2xl mb-8 flex items-center gap-4">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
        )}

        {currentView === 'calculator' && report && (
          <div className="max-w-6xl mx-auto animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col items-center text-center border-t-4 border-blue-600">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">{report.carName}</h1>
              <div className="flex gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Busca Ativa</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-blue-500"/> Atualizado</span>
              </div>
            </div>
            <CostGrid data={report} />
            <CommonIssues issues={report.analysis.commonIssues} />
            <AnalysisSection data={report} />
            <CTA text={report.ctaText} />
          </div>
        )}

        {currentView === 'comparison' && <MarketComparison recommendations={recommendations} hasSearched={hasComparisonSearched} />}
        
        {currentView === 'insurance' && (
          loading ? (
            <div className="max-w-4xl mx-auto py-24 text-center animate-fade-in-up">
              <div className="relative inline-block mb-10">
                 <div className="w-24 h-24 border-[6px] border-slate-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                 <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Processando Cotação Inteligente</h3>
              <div className="flex flex-col gap-3">
                 <p className="text-indigo-600 font-black text-xs uppercase tracking-widest animate-pulse">Cruzando dados de sinistralidade e perfil...</p>
                 <div className="flex justify-center gap-6 mt-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Tabelas Seguralta</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Índice Roubo/Furto</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bônus Regional</span>
                 </div>
                 <p className="text-slate-400 text-xs font-medium mt-6 max-w-sm mx-auto">Nossa IA está analisando mais de 15 variáveis para estimar o melhor custo-benefício para seu veículo.</p>
              </div>
            </div>
          ) : (
            insuranceQuote && <InsuranceEstimator quote={insuranceQuote} />
          )
        )}

        {currentView === 'specs' && techSpecs && <TechnicalSpecs specs={techSpecs} />}
        {currentView === 'resale' && resaleReport && <ResaleAnalysis report={resaleReport} />}
        {currentView === 'fipe' && fipeReport && <FipeTable data={fipeReport} />}
        {currentView === 'conversation' && <MotivationChat userMessage={lastUserMessage} response={chatResponse} hasInteracted={hasInteractedWithChat} />}
        {currentView === 'blog' && <BlogPage />}
        {currentView === 'affiliate' && <AffiliatePage />}
      </main>

      <FloatingCTA />

      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Atendimento</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg"><MapPin className="w-4 h-4 text-blue-500" /></div>
                  <span className="text-sm font-medium">Av. João Pinheiro 3202 - Poços de Caldas - MG</span>
                </div>
                <a href="https://wa.me/5535997170922" target="_blank" className="flex items-center justify-center md:justify-start gap-3 hover:text-emerald-400 transition-colors">
                  <div className="bg-emerald-500/10 p-2 rounded-lg"><Phone className="w-4 h-4 text-emerald-500" /></div>
                  <span className="text-sm font-bold">(35) 99717-0922</span>
                </a>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="bg-slate-700/50 p-2 rounded-lg"><Mail className="w-4 h-4 text-slate-400" /></div>
                  <span className="text-sm font-medium">contato@vistoriadoronline.com.br</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500">Redes Sociais</h4>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://www.instagram.com/dodonaves/" target="_blank" className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-pink-600 hover:text-white transition-all transform hover:-translate-y-1">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.youtube.com/@Dodonaves" target="_blank" className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed max-w-[240px] mx-auto md:mx-0">
                Siga-nos para receber as últimas novidades e dicas do mercado automotivo diretamente no seu feed.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500 rounded-lg text-white"><Car className="w-5 h-5" /></div>
                <div className="text-left leading-none">
                  <span className="text-sm font-black uppercase tracking-tighter">Vistoriador</span>
                  <br />
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Online</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 text-center md:text-right">
                <p>CNPJ: 52.902.617/0001-04</p>
                <p className="mt-1">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
              </div>
              <a href="https://vistoriadoronline.com.br" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white underline underline-offset-4">
                vistoriadoronline.com.br
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
