
import React from 'react';
import { User, MessageCircleHeart, Sparkles } from 'lucide-react';

interface MotivationChatProps {
  userMessage: string;
  response: string;
  hasInteracted: boolean;
}

const MotivationChat: React.FC<MotivationChatProps> = ({ userMessage, response, hasInteracted }) => {
  if (!hasInteracted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in-up">
        <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-100">
           <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <MessageCircleHeart className="w-10 h-10 text-pink-500" />
           </div>
           <h2 className="text-2xl font-bold text-slate-800 mb-4">Precisa de uma palavra de ânimo?</h2>
           <p className="text-slate-500 max-w-lg mx-auto">
             Digite como você está se sentindo ou diga "olá" para receber uma mensagem especial.
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in-up space-y-6">
      
      {/* User Message Bubble */}
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl rounded-tr-none shadow-md max-w-[80%] flex items-start gap-3">
           <span className="font-medium text-lg">{userMessage}</span>
           <User className="w-5 h-5 mt-1 opacity-70" />
        </div>
      </div>

      {/* Bot Response Bubble */}
      <div className="flex justify-start">
        <div className="bg-white border-l-4 border-pink-500 text-slate-800 px-6 py-6 rounded-2xl rounded-tl-none shadow-lg max-w-[90%] flex items-start gap-4">
           <div className="bg-pink-100 p-2 rounded-full flex-shrink-0">
             <Sparkles className="w-6 h-6 text-pink-600" />
           </div>
           <div>
             <span className="block font-bold text-pink-600 text-xs uppercase tracking-wider mb-1">Mensagem Especial</span>
             <p className="text-xl font-medium leading-relaxed font-serif italic text-slate-700">"{response}"</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default MotivationChat;
