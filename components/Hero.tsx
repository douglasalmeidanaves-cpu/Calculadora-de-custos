
import React, { useState, useEffect, useRef } from 'react';
import { Search, Calculator, TrendingUp, DollarSign, Car, Shield, MessageCircleHeart, Home, ArrowRight, ArrowLeft, Users, Check, ChevronLeft, Newspaper, Menu, X, FileText, Repeat, Key, Zap, Info, Sparkles, Loader2 } from 'lucide-react';
import { AppView } from '../types';
import TestimonialsMarquee from './TestimonialsMarquee';
import VideoResources from './VideoResources';

interface HeroProps {
  onSearch: (term: string) => void;
  onCompareSearch: (budget: number, category: 'hatch' | 'sedan' | 'suv') => void;
  onInsuranceSearch: (model: string, year: number) => void;
  onSpecsSearch: (model: string) => void;
  onResaleSearch: (model: string) => void;
  onFipeSearch: (model: string, year: number) => void;
  onChatSubmit: (message: string) => void;
  isLoading: boolean;
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onBack: () => void;
  canGoBack: boolean;
  needsApiKey: boolean;
  onSelectKey: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  onSearch, 
  onCompareSearch, 
  onInsuranceSearch, 
  onSpecsSearch, 
  onResaleSearch, 
  onFipeSearch,
  onChatSubmit, 
  isLoading, 
  currentView, 
  onViewChange, 
  onBack, 
  canGoBack,
  needsApiKey,
  onSelectKey
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState<'hatch' | 'sedan' | 'suv'>('hatch');
  const [insuranceModel, setInsuranceModel] = useState('');
  const [insuranceYear, setInsuranceYear] = useState('');
  const [specsModel, setSpecsModel] = useState('');
  const [resaleModel, setResaleModel] = useState('');
  const [fipeModel, setFipeModel] = useState('');
  const [fipeYear, setFipeYear] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    const activeTab = document.getElementById(`nav-tab-${currentView}`);
    if (activeTab && navScrollRef.current) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentView]);

  const handleCalculatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) onSearch(searchTerm);
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    const amount = parseFloat(numericValue) / 100;
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleComparisonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetNum = parseFloat(budget.replace(/\D/g, '')) / 100;
    if (!isNaN(budgetNum) && budgetNum > 0) onCompareSearch(budgetNum, category);
  };

  const handleInsuranceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const yearNum = parseInt(insuranceYear);
    if (insuranceModel.trim() && !isNaN(yearNum)) onInsuranceSearch(insuranceModel, yearNum);
  };

  const handleSpecsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (specsModel.trim()) onSpecsSearch(specsModel);
  };

  const handleResaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resaleModel.trim()) onResaleSearch(resaleModel);
  };

  const handleFipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const yearNum = parseInt(fipeYear);
    if (fipeModel.trim() && !isNaN(yearNum)) onFipeSearch(fipeModel, yearNum);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      onChatSubmit(chatMessage);
      setChatMessage('');
    }
  };

  const NAV_ITEMS = [
    { id: 'home', label: 'Início', icon: Home, description: 'Painel Central' },
    { id: 'calculator', label: 'Custo Manut.', icon: Calculator, description: 'Peças e Serviços' },
    { id: 'comparison', label: 'Melhores Opções', icon: TrendingUp, description: 'Custo-Benefício' },
    { id: 'fipe', label: 'Tabela Fipe', icon: DollarSign, description: 'Preços de Mercado' },
    { id: 'resale', label: 'Revenda', icon: Repeat, description: 'Liquidez do Modelo' },
    { id: 'specs', label: 'Ficha Técnica', icon: FileText, description: 'Dados de Fábrica' },
    { id: 'blog', label: 'Radar Blog', icon: Newspaper, description: 'Notícias do Setor' },
    { id: 'insurance', label: 'Seguro', icon: Shield, description: 'Cotação Seguralta' },
    { id: 'conversation', label: 'Motivação', icon: MessageCircleHeart, description: 'Apoio Diário' },
  ];

  return (
    <div className={`bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden transition-all duration-500 ${currentView === 'home' ? 'min-h-screen py-8' : 'py-16 md:py-24'}`}>
      
      {/* Enhanced Master Header with Integrated Tab Bar */}
      <div className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between h-14 md:h-16">
              {/* Logo Section */}
              <div className="flex items-center gap-3">
                <a href="https://vistoriadoronline.com.br" className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all transform hover:rotate-6">
                  <Car className="w-5 h-5" />
                </a>
                <div className="flex flex-col leading-none">
                  <span className="text-xs md:text-sm font-black uppercase tracking-tighter">Vistoriador</span>
                  <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Online</span>
                </div>
              </div>

              {/* Action Buttons (IA & Menu) */}
              <div className="flex items-center gap-2 md:gap-3">
                <button 
                  onClick={onSelectKey}
                  className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all shadow-lg border hover:brightness-110 active:scale-95 ${
                    needsApiKey 
                    ? 'bg-blue-600 text-white border-blue-400 animate-pulse-subtle' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}
                >
                  {needsApiKey ? <Key className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                  <span className="text-[9px] font-black uppercase hidden sm:inline">{needsApiKey ? 'Ativar IA' : 'IA Ativa'}</span>
                </button>
                
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="lg:hidden p-2 bg-white/5 rounded-xl text-slate-300 active:scale-90 transition-transform"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Sub-Header persistent Tab Bar - Visible on all devices */}
            <div className="pb-3 px-2">
              <nav ref={navScrollRef} className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {NAV_ITEMS.map((item) => (
                  <button 
                    key={item.id}
                    id={`nav-tab-${item.id}`}
                    onClick={() => onViewChange(item.id as AppView)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap border active:scale-95 ${
                      currentView === item.id 
                      ? 'text-white bg-blue-600 border-blue-500 shadow-lg shadow-blue-900/40 scale-105' 
                      : 'text-slate-400 bg-white/5 border-white/5 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className={`w-3.5 h-3.5 ${currentView === item.id ? 'text-white' : ''}`} />
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-tight">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Style Menu (Optional detailed view) */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
           <div className="flex flex-col p-6 gap-3 overflow-y-auto max-h-[80vh]">
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => onViewChange(item.id as AppView)}
                  className={`flex items-center gap-5 p-5 rounded-2xl transition-all border active:scale-95 ${
                    currentView === item.id 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                    : 'bg-white/5 border-white/5 text-slate-300'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${currentView === item.id ? 'bg-white/20' : 'bg-white/10'}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="font-black uppercase tracking-tighter block text-lg">{item.label}</span>
                    <span className="text-xs opacity-60 font-medium">{item.description}</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 ml-auto opacity-30 ${currentView === item.id ? 'opacity-100' : ''}`} />
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Main Content Area - Adjusted margin top */}
      <div className="container mx-auto px-4 relative z-10 mt-28 md:mt-32 text-center">
        {currentView === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-[55vh] animate-fade-in-up">
            <div className="relative inline-block mb-10">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black leading-tight mb-2 tracking-tighter">
                Inteligência<br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400">
                  Automotiva
                </span>
              </h1>
              <div className="absolute -top-10 -right-10 animate-pulse hidden md:block">
                <Sparkles className="w-16 h-16 text-yellow-400/30" />
              </div>
            </div>

            <p className="text-blue-100 text-lg md:text-2xl max-w-3xl mx-auto mb-10 opacity-90 leading-relaxed font-medium">
              Seu guia definitivo para custos, mercado e manutenção. Comece explorando as ferramentas acima.
            </p>

            <div className="mb-12 flex flex-wrap justify-center gap-4">
              <a href="https://www.reclameaqui.com.br/rav/I2vy" target="_blank" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-emerald-500/30 rounded-3xl px-6 py-2 transition-all hover:scale-105 group">
                <div className="bg-emerald-500 text-white p-1 rounded-full"><Check className="w-3.5 h-3.5" strokeWidth={4} /></div>
                <span className="text-sm font-black text-white group-hover:text-emerald-400 uppercase tracking-widest">Reclame AQUI: Verificada</span>
              </a>
              <div className="inline-flex items-center gap-3 bg-white/5 border border-blue-500/30 rounded-3xl px-6 py-2 transition-all hover:bg-white/10">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-black text-white uppercase tracking-widest">+500k Consultas</span>
              </div>
            </div>

            {/* Testimonials Marquee */}
            <div className="w-full mb-16 animate-fade-in-up stagger-1">
              <TestimonialsMarquee />
            </div>

            {/* Home Grid (Quick Access) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl animate-fade-in-up stagger-2">
               {NAV_ITEMS.filter(item => ['calculator', 'fipe', 'resale', 'specs'].includes(item.id)).map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => onViewChange(item.id as AppView)}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 rounded-[3rem] p-10 text-left transition-all hover:-translate-y-2 hover:bg-white/10 shadow-2xl hover:shadow-blue-500/10"
                  >
                    <div className="bg-blue-600/20 p-5 rounded-3xl w-fit mb-8 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                      <item.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black mb-3 tracking-tighter uppercase">{item.label}</h3>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">{item.description}</p>
                    <div className="flex items-center text-blue-400 font-black text-xs uppercase tracking-widest group-hover:text-white transition-colors">Acessar Ferramenta <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" /></div>
                  </button>
               ))}
            </div>
            
            <div className="w-full max-w-7xl mt-20 pb-16 animate-fade-in-up stagger-3">
               <VideoResources />
            </div>
          </div>
        )}

        {/* Floating Forms */}
        <div className="max-w-4xl mx-auto mt-12 animate-fade-in-up">
          {currentView === 'calculator' && (
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:shadow-blue-500/10 transition-shadow">
              <form onSubmit={handleCalculatorSubmit} className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 relative w-full">
                  <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-7 h-7" />
                  <input type="text" placeholder="Qual carro quer calcular? Ex: Corolla 2022" className="w-full pl-16 pr-8 py-6 bg-slate-50 rounded-3xl text-slate-800 text-xl font-bold focus:outline-none focus:ring-4 ring-blue-500/20" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} disabled={isLoading} />
                </div>
                <button type="submit" disabled={isLoading || !searchTerm.trim()} className={`bg-blue-600 text-white px-12 py-6 rounded-3xl font-black uppercase text-sm w-full md:auto hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'animate-pulse-subtle bg-blue-700' : ''}`}>
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Processando..." : "Calcular Custo"}
                </button>
              </form>
            </div>
          )}

          {currentView === 'comparison' && (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <form onSubmit={handleComparisonSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 text-left ml-2 tracking-widest">Orçamento Máximo</label>
                  <input type="text" placeholder="R$ 75.000" className="w-full px-8 py-5 bg-slate-50 rounded-2xl text-slate-800 font-bold text-lg border-2 border-transparent focus:border-blue-500 transition-all outline-none" value={budget} onChange={(e) => setBudget(formatCurrency(e.target.value))} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 text-left ml-2 tracking-widest">Estilo do Carro</label>
                  <select className="w-full px-8 py-5 bg-slate-50 rounded-2xl text-slate-800 font-bold text-lg appearance-none border-2 border-transparent focus:border-blue-500 transition-all outline-none" value={category} onChange={(e) => setCategory(e.target.value as any)}>
                    <option value="hatch">Hatch (Compacto)</option>
                    <option value="sedan">Sedan (Conforto)</option>
                    <option value="suv">SUV / Pickup (Robusto)</option>
                  </select>
                </div>
                <button type="submit" disabled={isLoading} className={`bg-emerald-600 text-white rounded-2xl font-black uppercase text-sm h-full md:mt-8 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/30 active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'animate-pulse-subtle bg-emerald-700' : ''}`}>
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Buscando..." : "Buscar Melhores"}
                </button>
              </form>
            </div>
          )}

          {currentView === 'fipe' && (
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <form onSubmit={handleFipeSubmit} className="flex flex-col md:flex-row items-center gap-4">
                <input type="text" placeholder="Ex: Onix Premier" className="flex-1 px-8 py-6 bg-slate-50 rounded-3xl text-slate-800 font-bold text-xl outline-none focus:ring-4 ring-slate-100" value={fipeModel} onChange={(e) => setFipeModel(e.target.value)} />
                <input type="number" placeholder="Ano" className="w-full md:w-32 px-8 py-6 bg-slate-50 rounded-3xl text-slate-800 font-bold text-xl outline-none focus:ring-4 ring-slate-100" value={fipeYear} onChange={(e) => setFipeYear(e.target.value)} />
                <button type="submit" disabled={isLoading} className={`bg-slate-900 text-white px-12 py-6 rounded-3xl font-black uppercase text-sm hover:bg-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'animate-pulse-subtle' : ''}`}>
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Consultando..." : "Ver Tabela"}
                </button>
              </form>
            </div>
          )}

          {currentView === 'insurance' && (
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <form onSubmit={handleInsuranceSubmit} className="flex flex-col md:flex-row items-center gap-4">
                <input type="text" placeholder="Modelo para Seguro" className="flex-1 px-8 py-6 bg-slate-50 rounded-3xl text-slate-800 font-bold text-xl outline-none focus:ring-4 ring-indigo-100" value={insuranceModel} onChange={(e) => setInsuranceModel(e.target.value)} />
                <input type="number" placeholder="Ano" className="w-full md:w-32 px-8 py-6 bg-slate-50 rounded-3xl text-slate-800 font-bold text-xl outline-none focus:ring-4 ring-indigo-100" value={insuranceYear} onChange={(e) => setInsuranceYear(e.target.value)} />
                <button type="submit" disabled={isLoading} className={`bg-indigo-600 text-white px-12 py-6 rounded-3xl font-black uppercase text-sm hover:bg-indigo-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'animate-pulse-subtle bg-indigo-700' : ''}`}>
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Cotando..." : "Cotar Seguro"}
                </button>
              </form>
            </div>
          )}

          {currentView === 'specs' && (
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <form onSubmit={handleSpecsSubmit} className="flex flex-col md:flex-row items-center gap-4">
                <input type="text" placeholder="Ex: BMW 320i 2021" className="flex-1 px-8 py-6 bg-slate-50 rounded-3xl text-slate-800 font-bold text-xl outline-none focus:ring-4 ring-cyan-100" value={specsModel} onChange={(e) => setSpecsModel(e.target.value)} />
                <button type="submit" disabled={isLoading} className={`bg-cyan-600 text-white px-12 py-6 rounded-3xl font-black uppercase text-sm hover:bg-cyan-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'animate-pulse-subtle bg-cyan-700' : ''}`}>
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Buscando..." : "Ver Ficha"}
                </button>
              </form>
            </div>
          )}

          {currentView === 'resale' && (
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <form onSubmit={handleResaleSubmit} className="flex flex-col md:flex-row items-center gap-4">
                <input type="text" placeholder="Carro para análise de revenda" className="flex-1 px-8 py-6 bg-slate-50 rounded-3xl text-slate-800 font-bold text-xl outline-none focus:ring-4 ring-indigo-100" value={resaleModel} onChange={(e) => setResaleModel(e.target.value)} />
                <button type="submit" disabled={isLoading} className={`bg-indigo-900 text-white px-12 py-6 rounded-3xl font-black uppercase text-sm hover:bg-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'animate-pulse-subtle' : ''}`}>
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Analisando..." : "Analisar Liquidez"}
                </button>
              </form>
            </div>
          )}

          {currentView === 'conversation' && (
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <form onSubmit={handleChatSubmit} className="flex flex-col md:flex-row items-center gap-4">
                <input type="text" placeholder="Diga como foi seu dia ou peça um colselho..." className="flex-1 px-8 py-6 bg-slate-50 rounded-3xl text-slate-800 font-bold text-xl italic outline-none focus:ring-4 ring-pink-100" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
                <button type="submit" disabled={isLoading} className={`bg-pink-600 text-white px-12 py-6 rounded-3xl font-black uppercase text-sm hover:bg-pink-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'animate-pulse-subtle bg-pink-700' : ''}`}>
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Aguarde..." : "Conversar"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
