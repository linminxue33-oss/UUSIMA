import React, { useState, useEffect } from 'react';
import { X, Sparkles, BrainCircuit, Zap, BarChart3, Target, ShieldCheck, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Tab } from '../types';

interface AIDataAnalysisOverlayProps {
  onClose: () => void;
  activeTab: Tab;
}

const AIDataAnalysisOverlay: React.FC<AIDataAnalysisOverlayProps> = ({ onClose, activeTab }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateAnalysis = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'gemini-3-flash-preview';
        
        const context = activeTab === Tab.ANALYSIS 
          ? "Teaching Analysis Dashboard: 256k registered users, 85% platform health, 1.2h avg experiment duration, Guangdong is the top region with 124k total hours. Focus on professional direction efficiency."
          : "AI Usage Analysis: 1.2k current online AI users, 3.5k interactions, 2.8M total QA sessions. Top keywords: Python experiments, Sensor config, Deep learning.";

        const prompt = `
          You are the UUSIMA Platform AI Strategist. 
          Analyze the following data from the ${activeTab === Tab.ANALYSIS ? 'Teaching Experiment' : 'AI Analytics'} dashboard:
          ${context}
          
          Please provide a professional, concise report in Chinese (Simplified) with the following sections:
          1. 核心洞察 (Executive Summary)
          2. 关键发现 (Key Findings - 3 points)
          3. 战略建议 (Strategic Recommendations - 2 points)
          
          Format the output using clear headings and bullet points. Use a professional, data-driven tone.
        `;

        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            temperature: 0.7,
            topP: 0.95,
          }
        });

        setAnalysis(response.text || "未能生成分析报告，请重试。");
      } catch (err) {
        console.error("AI Analysis Error:", err);
        setError("无法连接到 AI 服务，请检查网络或 API 配置。");
      } finally {
        setLoading(false);
      }
    };

    generateAnalysis();
  }, [activeTab]);

  return (
    <>
      <div className="fixed inset-0 z-[110] bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] max-h-[85vh] bg-surface-dark border border-primary/30 rounded-2xl shadow-[0_0_50px_rgba(19,127,236,0.2)] z-[120] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Animated Background Element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 rounded-xl text-primary shadow-[0_0_15px_rgba(19,127,236,0.3)]">
              <Sparkles size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                AI 智能数据诊断报告
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase">Beta v2.0</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                基于 Gemini 3 Flash 的实时多维数据建模分析
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <Loader2 size={48} className="text-primary animate-spin" />
                <BrainCircuit size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent-gold" />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white animate-pulse">正在深度分析看板数据...</p>
                <p className="text-sm text-text-secondary mt-1">提取多维指标并构建决策模型</p>
              </div>
            </div>
          ) : error ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-accent-red">
              <ShieldCheck size={48} className="opacity-50" />
              <p className="font-bold">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-2 text-xs text-primary hover:underline">尝试刷新页面</button>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                   <Target size={20} className="text-primary" />
                   <span className="text-[10px] text-text-secondary uppercase">分析精度</span>
                   <span className="text-sm font-bold text-white">高可靠 (98%)</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                   <Zap size={20} className="text-accent-gold" />
                   <span className="text-[10px] text-text-secondary uppercase">诊断速度</span>
                   <span className="text-sm font-bold text-white">0.85s 实时</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                   <BarChart3 size={20} className="text-accent-green" />
                   <span className="text-[10px] text-text-secondary uppercase">模型版本</span>
                   <span className="text-sm font-bold text-white">Gemini 3.0</span>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-2xl p-6 border border-white/5 relative">
                <div className="absolute top-4 right-4 text-primary/20">
                  <BrainCircuit size={80} />
                </div>
                <div className="relative whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
                  {analysis.split('\n').map((line, i) => {
                    if (line.match(/^\d\./) || line.includes('：')) {
                       return <p key={i} className="mb-4 text-white font-bold text-base">{line}</p>;
                    }
                    if (line.startsWith('-') || line.startsWith('•')) {
                       return <div key={i} className="flex gap-2 mb-2 pl-2">
                         <span className="text-primary">•</span>
                         <span>{line.replace(/^[-•]\s*/, '')}</span>
                       </div>;
                    }
                    return <p key={i} className="mb-3">{line}</p>;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/5 bg-white/5 flex items-center justify-between">
           <div className="flex items-center gap-2 text-[10px] text-text-secondary">
              <div className="size-1.5 bg-accent-green rounded-full"></div>
              所有建议均基于当前实时数据流生成
           </div>
           <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2 text-sm font-bold text-text-secondary hover:text-white transition-colors"
              >
                关闭
              </button>
              <button 
                className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-[0_4px_15px_rgba(19,127,236,0.3)] flex items-center gap-2"
              >
                生成报告文档
              </button>
           </div>
        </div>
      </div>
    </>
  );
};

export default AIDataAnalysisOverlay;