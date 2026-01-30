
import React from 'react';
import { PlayCircle, Youtube } from 'lucide-react';

const videos = [
  { 
    title: "Como funciona uma vistoria ECV em MG", 
    url: "https://youtu.be/Bch-Pe5kc4w?si=k6f_Niw_nLDz3jAd",
    id: "Bch-Pe5kc4w"
  },
  { 
    title: "Como estacionar um carro corretamente", 
    url: "https://www.youtube.com/shorts/qtN1oT7Meww",
    id: "qtN1oT7Meww"
  },
  { 
    title: "Sinistro sem leilão: entenda melhor", 
    url: "https://www.youtube.com/shorts/ACl5p6iFNoE",
    id: "ACl5p6iFNoE"
  },
  { 
    title: "Veículo com comunicado de venda: qual o risco?", 
    url: "https://www.youtube.com/shorts/4l_Q-UwwriA",
    id: "4l_Q-UwwriA"
  },
  { 
    title: "Carro de repasse: entenda os perigos", 
    url: "https://www.youtube.com/shorts/XyJRxIaWkf4",
    id: "XyJRxIaWkf4"
  },
  {
    title: "Novo golpe, cuidado!",
    url: "https://www.youtube.com/shorts/p9W7IWD1aKM",
    id: "p9W7IWD1aKM"
  },
  {
    title: "Carro puro custo benefício",
    url: "https://www.youtube.com/shorts/oDhDkCf3ddM",
    id: "oDhDkCf3ddM"
  }
];

const VideoResources: React.FC = () => {
  return (
    <div className="w-full py-8 overflow-hidden">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          Dicas Rápidas do Dodo Naves
        </h3>
        <p className="text-blue-200 text-sm mt-1">Aprenda a se proteger em menos de 1 minuto</p>
      </div>

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Loop duplicado para efeito infinito */}
        {[...videos, ...videos, ...videos].map((video, index) => (
          <a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 w-64 md:w-72 group relative rounded-2xl overflow-hidden shadow-lg border border-white/10 aspect-[9/16] md:aspect-video flex-shrink-0 cursor-pointer transform transition-transform hover:scale-105"
          >
            {/* Thumbnail Image */}
            <img 
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
              alt={video.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30 group-hover:scale-110 transition-transform">
                <PlayCircle className="w-8 h-8 text-white fill-white/20" />
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 p-4 w-full">
               <div className="bg-red-600 w-fit px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase mb-2">Vídeo</div>
               <h4 className="text-white font-bold text-sm leading-snug line-clamp-2 drop-shadow-md">
                 {video.title}
               </h4>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default VideoResources;
