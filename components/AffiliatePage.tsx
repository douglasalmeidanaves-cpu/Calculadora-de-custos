import React, { useState } from 'react';
import { DollarSign, Mail, CheckCircle2, Zap, Instagram, ArrowRight, MousePointerClick, PlayCircle, Copy, Check } from 'lucide-react';

const AffiliatePage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailToCopy = "contato@vistoriadoronline.com.br";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const partners = [
    { 
      name: "Marcelo Toledo", 
      link: "https://www.instagram.com/reel/DJR0f7Ex-Od/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", 
    },
    { 
      name: "Rafaela.Auto", 
      link: "https://www.instagram.com/reel/DOO8R9gkfyb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", 
    },
    { 
      name: "Carros com Breno", 
      link: "https://www.instagram.com/reel/DPJimj8EdjA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", 
    },
    { 
      name: "Dodo Naves", 
      link: "https://www.instagram.com/reel/DODsd22DZMg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", 
    },
  ];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up pb-12">
      
      {/* Hero Section of the Page */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 mb-10">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 opacity-20 rounded-full blur-3xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-yellow-400" />
              Programa de Parceria
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              Transforme sua influência em <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Renda Extra Real</span>
            </h2>
            <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto">
              Ganhe 25% de comissão por cada consulta vendida. Sem burocracia, pagamento instantâneo via Pix.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="p-8 md:p-12 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">25% de Comissão</h3>
              <p className="text-slate-600 text-sm">
                Receba um quarto do valor de cada venda realizada através do seu link exclusivo. Alta conversão.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Pix em Tempo Real</h3>
              <p className="text-slate-600 text-sm">
                Nada de esperar 30 dias. O dinheiro entra na sua conta assim que a venda é confirmada.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-600">
                <MousePointerClick className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Controle Total</h3>
              <p className="text-slate-600 text-sm">
                Acompanhe seus cliques e vendas. Sistema transparente para você escalar seus ganhos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800">Quem já recomenda o Vistoriador?</h3>
          <p className="text-slate-500">Grandes nomes do setor automotivo confiam e divulgam nossa marca.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((partner, index) => (
            <a 
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-pink-200 transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5 flex-shrink-0">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-600 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-slate-800 text-sm truncate">{partner.name}</h4>
                <div className="flex items-center gap-1 text-xs text-pink-600 font-medium">
                  <PlayCircle className="w-3 h-3" />
                  Ver Indicação
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>

      {/* How to Join Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-slate-800">
            Como se tornar um afiliado?
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            O processo é simples e manual para garantir a qualidade dos nossos parceiros. Siga os passos abaixo:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">1</div>
              <div>
                <h4 className="font-bold text-slate-800">Envie seus dados</h4>
                <p className="text-slate-600 text-sm">Copie nosso e-mail de contato e envie seu Nome Completo, motivo do interesse e seu Instagram.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">2</div>
              <div>
                <h4 className="font-bold text-slate-800">Análise da Equipe</h4>
                <p className="text-slate-600 text-sm">Nossa equipe validará seu perfil para garantir que está alinhado com nossa marca.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">3</div>
              <div>
                <h4 className="font-bold text-slate-800">Aprovação e Link</h4>
                <p className="text-slate-600 text-sm">Se aprovado, você receberá seu link exclusivo para começar a vender imediatamente.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden transform transition-transform hover:scale-[1.02]">
           <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
           
           <h3 className="text-2xl font-bold mb-6 relative z-10">Pronto para começar?</h3>
           
           <div className="space-y-4 relative z-10 mb-8">
             <div className="flex items-center gap-3 text-slate-300 text-sm">
               <CheckCircle2 className="w-5 h-5 text-green-400" />
               <span>Cadastro Gratuito</span>
             </div>
             <div className="flex items-center gap-3 text-slate-300 text-sm">
               <CheckCircle2 className="w-5 h-5 text-green-400" />
               <span>Suporte dedicado</span>
             </div>
             <div className="flex items-center gap-3 text-slate-300 text-sm">
               <CheckCircle2 className="w-5 h-5 text-green-400" />
               <span>Material de divulgação</span>
             </div>
           </div>

           <div className="relative z-10 bg-white/10 rounded-xl p-5 border border-white/10">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-3 text-center">
                 Copie o e-mail abaixo e nos envie sua solicitação:
              </p>
              <div className="flex items-center gap-2">
                 <div className="flex-1 bg-black/40 rounded-lg px-4 py-3 text-white font-mono text-sm truncate border border-white/10 select-all">
                    {emailToCopy}
                 </div>
                 <button 
                    onClick={handleCopy}
                    className={`p-3 rounded-lg transition-all flex-shrink-0 ${copied ? 'bg-green-500 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
                    title="Copiar E-mail"
                 >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                 </button>
              </div>
              {copied && (
                <p className="text-green-400 text-xs text-center mt-2 font-bold animate-pulse">
                  E-mail copiado! Abra seu app de e-mail e envie seus dados.
                </p>
              )}
           </div>

        </div>
      </div>

    </div>
  );
};

export default AffiliatePage;