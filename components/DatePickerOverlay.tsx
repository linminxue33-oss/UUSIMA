import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DateRange } from '../types';

interface DatePickerOverlayProps {
  onClose: () => void;
  currentRange: DateRange;
  onApply: (start: Date, end: Date) => void;
}

const DatePickerOverlay: React.FC<DatePickerOverlayProps> = ({ onClose, currentRange, onApply }) => {
  // Mock calendar days generator
  const renderCalendarDays = (month: number, year: number, startDayOffset: number, daysInMonth: number) => {
    const days = [];
    // Day headers
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    
    // Prev month filler
    for (let i = 0; i < startDayOffset; i++) {
        days.push(<div key={`prev-${i}`} className="h-8 flex items-center justify-center text-border-dark text-[10px]">2{6+i}</div>);
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        // Logic to simulate the selection range visually for the demo screenshot
        // Start: Nov 1, End: Nov 24
        let isActive = false;
        let isRange = false;
        let isStart = false;
        let isEnd = false;

        // Simplified for demo matching the screenshot (Nov 2023)
        if (month === 10) { // November (0-indexed 10)
            if (i === 1) { isActive = true; isStart = true; }
            if (i === 24) { isActive = true; isEnd = true; }
            if (i > 1 && i < 24) isRange = true;
        }

        let classes = "h-8 flex items-center justify-center text-[10px] cursor-pointer hover:bg-white/5 transition-colors relative";
        
        if (isActive) {
            classes += " bg-primary text-white shadow-[0_0_12px_rgba(19,127,236,0.6)] z-10";
            if (isStart) classes += " rounded-l";
            if (isEnd) classes += " rounded-r";
        } else if (isRange) {
            classes += " bg-primary/20 text-white";
            // Add top/bottom borders via pseudo-element simulation or direct class if supported
        } else {
            classes += " text-white";
        }
        
        if (isRange) {
             days.push(
                <div key={i} className={classes}>
                    <div className="absolute inset-x-0 top-0 border-t border-primary/30"></div>
                    <div className="absolute inset-x-0 bottom-0 border-b border-primary/30"></div>
                    {i}
                </div>
            );
        } else {
            days.push(<div key={i} className={classes}>{i}</div>);
        }
    }
    
    // Next month filler
    const totalSlots = 42;
    const remaining = totalSlots - (startDayOffset + daysInMonth);
    for (let i = 1; i <= remaining; i++) {
        days.push(<div key={`next-${i}`} className="h-8 flex items-center justify-center text-border-dark text-[10px]">{i}</div>);
    }

    return days;
  };

  return (
    <>
        <div className="fixed inset-0 z-[90]" onClick={onClose}></div>
        <div className="absolute top-[108px] right-8 w-[580px] bg-surface-dark border border-border-dark rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl p-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
        
        {/* Date Display Header */}
        <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
                <div className="bg-background-dark border border-border-dark px-3 py-1.5 rounded-md flex items-center gap-2 shadow-inner shadow-black/50">
                    <span className="text-[10px] text-text-secondary">开始日期</span>
                    <span className="text-xs font-bold text-primary">2023-11-01</span>
                </div>
                <span className="text-text-secondary">—</span>
                <div className="bg-background-dark border border-border-dark px-3 py-1.5 rounded-md flex items-center gap-2 shadow-inner shadow-black/50">
                    <span className="text-[10px] text-text-secondary">结束日期</span>
                    <span className="text-xs font-bold text-primary">2023-11-24</span>
                </div>
            </div>
            <div className="flex gap-1">
                <button className="size-7 flex items-center justify-center rounded hover:bg-white/5 text-text-secondary transition-colors"><ChevronLeft size={16} /></button>
                <button className="size-7 flex items-center justify-center rounded hover:bg-white/5 text-text-secondary transition-colors"><ChevronRight size={16} /></button>
            </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-2 gap-8 px-2">
            {/* Oct 2023 */}
            <div>
                <p className="text-xs font-bold text-center mb-4 text-white">2023年 10月</p>
                <div className="grid grid-cols-7 gap-y-1 text-center">
                    {['日', '一', '二', '三', '四', '五', '六'].map(d => <div key={d} className="text-[#4b5e71] text-[10px] h-8 flex items-center justify-center">{d}</div>)}
                    {renderCalendarDays(9, 2023, 0, 31).slice(0, 42)}
                </div>
            </div>
            {/* Nov 2023 */}
            <div>
                <p className="text-xs font-bold text-center mb-4 text-white">2023年 11月</p>
                <div className="grid grid-cols-7 gap-y-1 text-center">
                    {['日', '一', '二', '三', '四', '五', '六'].map(d => <div key={d} className="text-[#4b5e71] text-[10px] h-8 flex items-center justify-center">{d}</div>)}
                    {renderCalendarDays(10, 2023, 3, 30)}
                </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-dark">
            <div className="flex gap-2">
                <button className="px-2 py-1 text-[10px] bg-background-dark border border-border-dark rounded hover:border-primary/50 text-text-secondary transition-colors">今日</button>
                <button className="px-2 py-1 text-[10px] bg-background-dark border border-border-dark rounded hover:border-primary/50 text-text-secondary transition-colors">昨日</button>
                <button className="px-2 py-1 text-[10px] bg-background-dark border border-border-dark rounded hover:border-primary/50 text-text-secondary transition-colors">近7日</button>
            </div>
            <div className="flex gap-2">
                <button onClick={onClose} className="px-4 py-1.5 text-xs font-medium text-text-secondary hover:text-white transition-all">取消</button>
                <button 
                    onClick={() => onApply(new Date(2023, 10, 1), new Date(2023, 10, 24))} 
                    className="px-4 py-1.5 text-xs font-semibold bg-primary text-white rounded hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                    应用选择
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default DatePickerOverlay;
