
import React from 'react';
import { AlertTriangle, Siren, Info } from 'lucide-react';
import { CommonIssue } from '../types';

interface CommonIssuesProps {
  issues: CommonIssue[];
}

const CommonIssues: React.FC<CommonIssuesProps> = ({ issues }) => {
  if (!issues || issues.length === 0) return null;

  const getSeverityConfig = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return {
          icon: <Siren className="w-6 h-6 text-red-600" />,
          bg: 'bg-red-50',
          border: 'border-red-200',
          titleColor: 'text-red-900',
          textColor: 'text-red-800/80',
          badge: 'bg-red-100 text-red-700 border-red-200',
          label: 'Crítico'
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          titleColor: 'text-orange-900',
          textColor: 'text-orange-800/80',
          badge: 'bg-orange-100 text-orange-700 border-orange-200',
          label: 'Atenção'
        };
      case 'low':
        return {
          icon: <Info className="w-6 h-6 text-blue-600" />,
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          titleColor: 'text-blue-900',
          textColor: 'text-blue-800/80',
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          label: 'Monitorar'
        };
    }
  };

  return (
    <div className="mb-12 animate-fade-in-up delay-100">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
          Problemas Comuns & Crônicos
        </h3>
        <p className="text-slate-500 text-sm mb-8 -mt-4 border-l-4 border-amber-200 pl-4 py-1 bg-amber-50/50 rounded-r-lg">
          Fique atento! Estes são os defeitos mais frequentes relatados por proprietários e oficinas para este modelo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue, index) => {
            const config = getSeverityConfig(issue.severity);
            return (
              <div 
                key={index} 
                className={`relative p-5 rounded-2xl border ${config.bg} ${config.border} flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:scale-[1.01]`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className={`font-bold text-lg leading-tight ${config.titleColor}`}>
                    {issue.title}
                  </h4>
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 flex-shrink-0">
                    {config.icon}
                  </div>
                </div>
                
                <p className={`text-sm font-medium leading-relaxed ${config.textColor}`}>
                  {issue.description}
                </p>
                
                <div className="mt-auto pt-2 border-t border-black/5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${config.badge}`}>
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommonIssues;
