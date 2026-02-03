
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TabTeachingAnalysis from './components/TabTeachingAnalysis';
import TabAIAnalysis from './components/TabAIAnalysis';
import TabPrivatePlatform from './components/TabPrivatePlatform';
import DatePickerOverlay from './components/DatePickerOverlay';
import DataMappingOverlay from './components/DataMappingOverlay';
import AIDataAnalysisOverlay from './components/AIDataAnalysisOverlay';
import { Tab } from './types';
import { Sparkles, BrainCircuit } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ANALYSIS);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAIAnalysisOpen, setIsAIAnalysisOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(2023, 10, 1), // Nov 1 2023
    end: new Date(2023, 10, 24)   // Nov 24 2023
  });

  const renderActiveTab = () => {
    switch (activeTab) {
      case Tab.ANALYSIS:
        return <TabTeachingAnalysis />;
      case Tab.AI:
        return <TabAIAnalysis />;
      case Tab.PRIVATE_PLATFORM:
        return <TabPrivatePlatform />;
      default:
        return <TabTeachingAnalysis />;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-background-dark text-white overflow-hidden font-sans relative">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onToggleDatePicker={() => setIsDatePickerOpen(!isDatePickerOpen)}
        isDatePickerOpen={isDatePickerOpen}
        onToggleSettings={() => setIsSettingsOpen(true)}
      />
      
      {isDatePickerOpen && (
        <DatePickerOverlay 
          onClose={() => setIsDatePickerOpen(false)}
          currentRange={dateRange}
          onApply={(start, end) => {
            setDateRange({ start, end });
            setIsDatePickerOpen(false);
          }}
        />
      )}

      {isSettingsOpen && (
        <DataMappingOverlay 
          onClose={() => setIsSettingsOpen(false)}
          activeTab={activeTab}
        />
      )}

      {isAIAnalysisOpen && (
        <AIDataAnalysisOverlay 
          onClose={() => setIsAIAnalysisOpen(false)}
          activeTab={activeTab}
        />
      )}

      {/* Prominent AI Analysis Tab - Fixed to the Right */}
      <button 
        onClick={() => setIsAIAnalysisOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[80] group flex items-center"
      >
        <div className="bg-gradient-to-b from-primary via-[#7c3aed] to-[#db2777] py-8 px-2 rounded-l-2xl border-l border-y border-white/20 shadow-[-10px_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 group-hover:pr-4 group-hover:translate-x-0 group-hover:scale-105 flex flex-col items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
            <Sparkles size={18} className="text-white animate-pulse" />
          </div>
          <span className="[writing-mode:vertical-rl] text-sm font-bold tracking-[0.2em] text-white uppercase drop-shadow-lg">
            AI 数据分析
          </span>
          <BrainCircuit size={18} className="text-white/80" />
        </div>
      </button>

      <main className="flex-1 p-6 overflow-hidden relative z-0">
        <div className="h-full w-full overflow-y-auto scrollbar-hide pb-10">
          {renderActiveTab()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
