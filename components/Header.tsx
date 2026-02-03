
import React from 'react';
import { Tab } from '../types';
import { Bell, Settings, ChevronDown, Calendar, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onToggleDatePicker: () => void;
  isDatePickerOpen: boolean;
  onToggleSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onToggleDatePicker, isDatePickerOpen, onToggleSettings }) => {
  return (
    <header className="relative flex flex-col border-b border-border-dark bg-surface-dark/30 backdrop-blur-md z-40">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">UUSIMA 智慧教学实验平台 - 智能运营中心</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center size-8 rounded-lg bg-border-dark/50 hover:bg-primary/20 transition-colors text-white">
            <Bell size={18} />
          </button>
          <button 
            onClick={onToggleSettings}
            className="flex items-center justify-center size-8 rounded-lg bg-border-dark/50 hover:bg-primary/20 transition-colors text-white"
          >
            <Settings size={18} />
          </button>
          <div className="w-px h-6 bg-border-dark mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold">管理员</p>
              <p className="text-[10px] text-primary">在线</p>
            </div>
            <div 
              className="size-8 rounded-full border border-primary/30 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaiR6cuTkK_ePWGihIhe03fdAkXv-Dr2vKkSB8lfw7kfDxi26fwUlRtrzG-1vk65qBGfki3RdMgyFl5izHtCPfMcmS2BxwbiubvOPK5eI_Bp2r1z3PBH5TV9WmCOUUvb9Vy04AblARR-ZryNdJxmdMgRNfbQsazV0rFH_PI9_aO8mqYV843_BZPytW4Hwf6tawDB61HVmevulF4zxdpJ5ZlpgYmnUdAQH7RoDeE_N7H0WjMX7K5Azyn96NQtNnC9YTpqsU-Mnowh3S')" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between px-8 py-2 bg-black/20 border-t border-border-dark/30">
        <div className="flex items-center bg-surface-dark border border-border-dark rounded-lg p-0.5">
          <button 
            onClick={() => onTabChange(Tab.ANALYSIS)}
            className={`px-6 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === Tab.ANALYSIS ? 'bg-primary text-white shadow-[0_0_15px_rgba(19,127,236,0.4)]' : 'text-text-secondary hover:text-white'}`}
          >
            云平台分析
          </button>
          <button 
            onClick={() => onTabChange(Tab.AI)}
            className={`px-6 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === Tab.AI ? 'bg-primary text-white shadow-[0_0_15px_rgba(19,127,236,0.4)]' : 'text-text-secondary hover:text-white'}`}
          >
            AI 学伴分析
          </button>
          <button 
            onClick={() => onTabChange(Tab.PRIVATE_PLATFORM)}
            className={`px-6 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === Tab.PRIVATE_PLATFORM ? 'bg-primary text-white shadow-[0_0_15px_rgba(19,127,236,0.4)]' : 'text-text-secondary hover:text-white'}`}
          >
            私有化平台分析
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary mr-2">统计周期：</span>
          {['截止昨天', '本月', '近3个月', '近半年', '近一年'].map((label, idx) => (
             <button 
                key={label}
                className={`px-3 py-1 text-xs rounded border transition-all cursor-pointer ${idx === 0 && !isDatePickerOpen ? 'border-primary text-primary bg-primary/10' : 'border-border-dark bg-surface-dark/50 text-text-secondary hover:text-white'}`}
             >
                {label}
             </button>
          ))}
          <button 
            onClick={onToggleDatePicker}
            className={`px-3 py-1 text-xs rounded border transition-all cursor-pointer flex items-center gap-1 ${isDatePickerOpen ? 'border-primary text-primary bg-primary/10 shadow-[0_0_15px_rgba(19,127,236,0.2)]' : 'border-border-dark bg-surface-dark/50 text-text-secondary hover:text-white'}`}
          >
             <Calendar size={12} />
             自定义日期
             <ChevronDown size={12} className={`transition-transform duration-200 ${isDatePickerOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
