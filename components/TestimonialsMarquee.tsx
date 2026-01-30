
import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  { name: "Ricardo Almeida", text: "Excelente serviço! O relatório detalhado me salvou de comprar um carro batido.", stars: 5, time: "há 2 dias" },
  { name: "Fernanda Costa", text: "Muito rápido e preciso. A consulta pela placa funciona na hora. Recomendo!", stars: 5, time: "há 1 semana" },
  { name: "Carlos Eduardo", text: "O melhor investimento que fiz antes de comprar meu carro novo. Parabéns Vistoriador.", stars: 5, time: "há 3 dias" },
  { name: "Mariana Silva", text: "Atendimento top e sistema super fácil de usar. Nota 10!", stars: 5, time: "há 5 dias" },
  { name: "João Pedro", text: "Informações completas sobre leilão e débitos. Valeu cada centavo.", stars: 5, time: "há 2 semanas" },
  { name: "Ana Paula", text: "Impressionada com a rapidez. Em segundos já tinha todo o histórico do veículo.", stars: 5, time: "há 1 dia" },
  { name: "Lucas Mendes", text: "Evitei um prejuízo enorme graças ao Vistoriador Online. Gratidão!", stars: 5, time: "há 4 dias" },
  { name: "Beatriz Oliveira", text: "Plataforma confiável e transparente. Uso sempre que vou trocar de carro.", stars: 5, time: "há 1 semana" },
];

const TestimonialsMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-8 group">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {/* Render twice for seamless loop */}
        {[...reviews, ...reviews].map((review, index) => (
          <a
            key={index}
            href="https://maps.app.goo.gl/Chw9faas5b1dYDYG9"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 w-72 md:w-80 bg-white/10 backdrop-blur-sm border border-white/10 p-5 rounded-2xl flex flex-col gap-3 hover:bg-white/20 hover:scale-[1.02] transition-all cursor-pointer shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-none">{review.name}</h4>
                  <span className="text-blue-200 text-[10px] opacity-80">{review.time}</span>
                </div>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4 opacity-80" />
            </div>

            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-slate-200 text-xs leading-relaxed line-clamp-3">
              "{review.text}"
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsMarquee;
