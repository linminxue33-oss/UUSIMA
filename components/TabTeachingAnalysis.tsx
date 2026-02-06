import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, MapPin, School, Users, Activity, 
  Monitor, UserPlus, Timer, Radio, Map, List, MousePointer2, 
  Target, GraduationCap, BarChart3, Clock, Percent, Zap, AlertTriangle,
  ChevronRight, Filter, Download, Calendar, Info, Trophy, Search, ChevronLeft, 
  MoreHorizontal, RefreshCcw, Settings2, Maximize2, Cpu, HardDrive, CpuIcon,
  ChevronDown, CheckCircle2, XCircle, FileText, Star, Flame, Moon, Sparkles,
  Heart
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, ComposedChart, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, AreaChart, Area, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell, PieChart, Pie
} from 'recharts';

// --- Mock Data ---

const dataRadar = [
  { subject: '物联网', courses: 150, students: 135, fullMark: 150 },
  { subject: '人工智能', courses: 100, students: 95, fullMark: 150 },
  { subject: '工业互联网', courses: 15, students: 25, fullMark: 150 },
  { subject: '大数据', courses: 7, students: 15, fullMark: 150 },
  { subject: '区块链', courses: 13, students: 22, fullMark: 150 },
  { subject: '其他', courses: 20, students: 30, fullMark: 150 },
];

const dataCourseTop5 = [
  { name: 'Python基础实训', learners: 2345, experiments: 12890, rate: 89, growth: 25.0 },
  { name: '数据结构与算法', learners: 1890, experiments: 9234, rate: 82, growth: 18.0 },
  { name: '物联网智能家居', learners: 1560, experiments: 7800, rate: 85, growth: 15.2 },
  { name: '深度学习物体识别', learners: 1420, experiments: 6540, rate: 78, growth: 12.4 },
  { name: '5G通信原理虚拟实验室', learners: 1100, experiments: 5200, rate: 80, growth: 10.8 },
];

const dataRankings = [
  { name: '深圳职业技术大学', users: 2450, onlineMin: 125, totalTime: 45200 },
  { name: '广东轻工职业技术学院', users: 2120, onlineMin: 118, totalTime: 38500 },
  { name: '金华职业技术学院', users: 1950, onlineMin: 110, totalTime: 32400 },
  { name: '陕西工业职业技术学院', users: 1840, onlineMin: 105, totalTime: 28900 },
  { name: '天津市职业大学', users: 1720, onlineMin: 98, totalTime: 25600 },
  { name: '南京工业职业技术大学', users: 1650, onlineMin: 95, totalTime: 22400 },
  { name: '无锡职业技术学院', users: 1580, onlineMin: 88, totalTime: 18500 },
  { name: '重庆电子工程职业学院', users: 1420, onlineMin: 85, totalTime: 15200 },
  { name: '北京电子科技职业学院', users: 1350, onlineMin: 72, totalTime: 12400 },
  { name: '淄博职业学院', users: 1280, onlineMin: 65, totalTime: 9800 },
];

const dataInstitutionTypes = [
  { name: '本科院校', value: 25, color: '#137fec', ratio: '3' },
  { name: '高职院校', value: 60, color: '#facc15', ratio: '6' },
  { name: '中职院校', value: 15, color: '#0bda5b', ratio: '1' },
];

const dataExpDuration = [
  { name: 'Python基础实训项目', value: 45200 },
  { name: '传感器采集与处理实验', value: 38900 },
  { name: '深度学习物体识别实战', value: 32400 },
  { name: '智慧园区网络架构搭建', value: 28500 },
  { name: 'Hadoop集群分布式部署', value: 21200 },
  { name: '工业数据可视化分析', value: 18400 },
  { name: '5G基站实训系统配置', value: 15600 },
  { name: '嵌入式驱动开发实战', value: 12400 },
];

// --- Sub-components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-dark border border-border-dark p-2 rounded shadow-xl text-xs z-50">
        <p className="font-bold mb-1 text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color || entry.fill }}>
            {entry.name}: {entry.value.toLocaleString()}{entry.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TabTeachingAnalysis: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState({
      institutions: 149,
      users: 3421,
      totalRegistered: 256789
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
        setRealTimeData(prev => ({
            ...prev,
            users: Math.max(3000, Math.min(4500, prev.users + Math.floor(Math.random() * 40) - 20)),
            totalRegistered: prev.totalRegistered + (Math.random() > 0.7 ? 1 : 0)
        }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 pb-6 animate-in fade-in duration-500">
      <style>{`
        @keyframes radar-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-radar {
          animation: radar-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .map-glow {
          filter: drop-shadow(0 0 20px rgba(19, 127, 236, 0.3));
        }
      `}</style>

      {/* Row 1: Strategic Decision Row */}
      <div className="grid grid-cols-12 gap-6 h-52 shrink-0">
        <div className="col-span-4 bg-surface-dark border border-border-dark rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-60"></div>
          <div className="flex items-center gap-2 mb-4">
            <UserPlus size={18} className="text-primary" />
            <h3 className="font-bold text-sm text-white/90 tracking-tighter uppercase">用户数量</h3>
          </div>
          <div className="flex-1 flex gap-6">
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-[10px] text-text-secondary mb-1 uppercase tracking-tight font-bold">✅ 注册用户总量</p>
              <p className="text-4xl font-bold text-white chart-glow font-sans tabular-nums leading-none">
                {realTimeData.totalRegistered.toLocaleString()}
              </p>
            </div>
            <div className="flex-1 border-l border-border-dark pl-6 flex flex-col justify-center gap-4">
               <div>
                 <div className="flex items-center justify-between mb-2">
                   <p className="text-[10px] text-text-secondary flex items-center gap-1 font-bold">
                     <Activity size={12} /> ✅ 活跃用户占比
                   </p>
                   <span className="text-sm font-bold text-white">61%</span>
                 </div>
                 <div className="w-full h-1.5 bg-background-dark rounded-full overflow-hidden border border-white/5">
                   <div className="h-full bg-primary shadow-[0_0_8px_rgba(19,127,236,0.6)]" style={{ width: '61%' }}></div>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <span className="text-text-secondary font-bold uppercase tracking-widest text-[8px]">✅ 当前在线</span>
                    <span className="text-accent-green font-mono text-xl font-bold chart-glow tabular-nums">{realTimeData.users.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col">
                    
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-surface-dark border border-border-dark rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent-gold opacity-60"></div>
          <div className="flex items-center gap-2 mb-4">
            <School size={18} className="text-accent-gold" />
            <h3 className="font-bold text-sm text-white/90 uppercase tracking-tighter">院校数量</h3>
          </div>
          
          <div className="flex-1 grid grid-cols-10 gap-2">
            {/* Left: Total Stats */}
            <div className="col-span-3 flex flex-col justify-center border-r border-white/5 pr-2">
              <p className="text-[10px] text-text-secondary mb-1">当前院校数量</p>
              <p className="text-3xl font-bold text-white chart-glow font-sans tabular-nums">
                {realTimeData.institutions}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="size-1.5 rounded-full bg-accent-green animate-pulse"></span>
                <span className="text-[9px] text-accent-green font-bold uppercase">在线: 55</span>
              </div>
            </div>

            {/* Middle: Double High Stats */}
            <div className="col-span-3 flex flex-col justify-center pl-4 border-r border-white/5">
               <div className="flex items-center gap-1 mb-1">
                 <p className="text-[10px] text-text-secondary">双高院校</p>
                 <span className="px-1 py-0.5 bg-accent-gold/10 text-[8px] text-accent-gold border border-accent-gold/20 rounded font-bold leading-none">重点</span>
               </div>
               <p className="text-3xl font-bold text-white chart-glow font-sans tabular-nums">32</p>
               <span className="text-[9px] text-text-secondary mt-2">占比 21.5%</span>
            </div>

            {/* Right: Pie Chart */}
            <div className="col-span-4 flex items-center h-full relative">
               <div className="w-20 h-20 relative shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={dataInstitutionTypes} 
                        innerRadius={22} 
                        outerRadius={38} 
                        paddingAngle={5} 
                        dataKey="value"
                        stroke="none"
                      >
                        {dataInstitutionTypes.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex flex-col justify-center gap-1.5 ml-2">
                  {dataInstitutionTypes.map((type, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                       <div className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: type.color }}></div>
                       <div className="flex flex-col">
                          <span className="text-[8px] text-text-secondary leading-none mb-0.5">{type.name}</span>
                          <span className="text-[9px] font-bold text-white leading-none">{type.value}%</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-surface-dark border border-border-dark rounded-xl p-4 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent-green opacity-80"></div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-accent-green animate-pulse" />
              <h3 className="font-bold text-sm text-white/90 uppercase tracking-tighter">实验使用情况</h3>
            </div>
            
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
             <div className="py-2 border-b border-white/5 flex flex-col justify-center">
                <span className="text-[10px] text-text-secondary font-bold uppercase tracking-tight mb-0.5">✅ 累计实验时长</span>
                <div className="flex items-baseline gap-2">
                   <p className="text-3xl font-black text-white chart-glow font-sans tabular-nums leading-none">245,820</p>
                   <span className="text-xs font-bold text-text-secondary uppercase">小时</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                   <div className="flex-1 h-1 bg-background-dark rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-primary shadow-[0_0_8px_#137fec]" style={{ width: '85%' }}></div>
                   </div>
                   <span className="text-[9px] text-primary font-bold">平台负荷: 85%</span>
                </div>
             </div>

             <div className="py-2 border-b border-white/5 flex flex-col justify-center">
                <div className="flex justify-between items-end mb-1">
                   <span className="text-[10px] text-text-secondary font-bold uppercase tracking-tight">✅ 平均实验时长</span>
                </div>
                <div className="flex items-baseline gap-2">
                   <p className="text-2xl font-black text-white chart-glow font-sans tabular-nums leading-none">1.2</p>
                   <span className="text-[10px] font-bold text-text-secondary">小时 / 人 / 次</span>
                </div>
             </div>

             <div className="flex justify-between items-center pt-3">
                <div className="flex flex-col leading-tight">
                   <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-black text-white chart-glow uppercase tracking-tight">✅ 健康度评分: 85/100</span>
                      <span className="text-[9px] font-bold text-accent-green bg-accent-green/10 px-1.5 rounded ml-1">优秀</span>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button className="px-3 py-1 bg-primary/20 border border-primary/30 rounded text-[9px] text-primary font-black hover:bg-primary/30 transition-all uppercase tracking-tighter">详情报告</button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Row 2: Integrated Visual Map & Regional Data Table */}
      <div className="grid grid-cols-12 gap-6 h-[540px] shrink-0">
         <div className="col-span-12 bg-surface-dark border border-border-dark rounded-xl flex flex-col overflow-hidden relative group">
            <div className="p-5 border-b border-border-dark flex justify-between items-center bg-white/5 backdrop-blur-sm z-10">
               <h3 className="font-bold text-base flex items-center gap-2 text-white">
                  <Map size={20} className="text-primary" /> 全国业务分布
               </h3>
               <div className="flex items-center gap-4 text-[10px] text-text-secondary uppercase tracking-widest font-bold">
                  <span>分公司/区域活跃度实时追踪</span>
               </div>
            </div>
            
            <div className="flex h-full">
               {/* Visual Map Area with OSM Embed - Focused on China */}
               <div className="flex-1 relative overflow-hidden bg-[#0f1218]">
                  {/* Embedded OpenStreetMap with Dark Filters - BBox set for China Focus */}
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    // Bounding Box roughly: 75E,18N to 135E,53N covers mainland China well
                    src="https://www.openstreetmap.org/export/embed.html?bbox=73,15,135,55&layer=mapnik"
                    className="absolute inset-0 w-full h-full opacity-60 grayscale invert contrast-125 brightness-75 scale-110"
                    style={{ pointerEvents: 'auto' }} 
                    title="Business Map"
                  ></iframe>
                  
                  {/* Map Overlay to provide a slight tint */}
                  <div className="absolute inset-0 bg-primary/10 pointer-events-none mix-blend-overlay"></div>
                  
                  {/* --- Hotspots for Business Volume (Positioned via approx CSS %) --- */}
                  
                  {/* Beijing / North China - High Volume */}
                  <div className="absolute top-[28%] left-[68%] flex flex-col items-center group cursor-pointer z-10">
                    <div className="relative">
                      <div className="size-6 bg-primary/30 rounded-full animate-ping absolute inset-0"></div>
                      <div className="size-6 bg-primary/60 rounded-full border-2 border-white shadow-[0_0_20px_#137fec] flex items-center justify-center text-[9px] text-white font-bold relative z-10">
                        85
                      </div>
                    </div>
                    <span className="text-[10px] text-white font-bold bg-black/50 px-1.5 rounded mt-1 opacity-80 group-hover:opacity-100 transition-opacity">北京</span>
                  </div>

                  {/* Shanghai / East China - Top Volume */}
                  <div className="absolute top-[52%] left-[75%] flex flex-col items-center group cursor-pointer z-10">
                    <div className="relative">
                      <div className="size-8 bg-accent-gold/30 rounded-full animate-ping absolute inset-0"></div>
                      <div className="size-8 bg-accent-gold/80 rounded-full border-2 border-white shadow-[0_0_25px_#facc15] flex items-center justify-center text-[10px] text-black font-black relative z-10">
                        120
                      </div>
                    </div>
                    <span className="text-[10px] text-white font-bold bg-black/50 px-1.5 rounded mt-1 opacity-80 group-hover:opacity-100 transition-opacity">上海</span>
                  </div>

                  {/* Guangdong / South China - High Volume */}
                  <div className="absolute top-[72%] left-[66%] flex flex-col items-center group cursor-pointer z-10">
                    <div className="relative">
                      <div className="size-7 bg-primary/30 rounded-full animate-ping absolute inset-0"></div>
                      <div className="size-7 bg-primary/60 rounded-full border-2 border-white shadow-[0_0_20px_#137fec] flex items-center justify-center text-[9px] text-white font-bold relative z-10">
                        95
                      </div>
                    </div>
                    <span className="text-[10px] text-white font-bold bg-black/50 px-1.5 rounded mt-1 opacity-80 group-hover:opacity-100 transition-opacity">广东</span>
                  </div>

                  {/* Chengdu / Southwest - Medium */}
                  <div className="absolute top-[55%] left-[52%] flex flex-col items-center group cursor-pointer z-10">
                    <div className="relative">
                      <div className="size-4 bg-accent-green/30 rounded-full animate-pulse absolute inset-0"></div>
                      <div className="size-4 bg-accent-green/60 rounded-full border border-white/50 shadow-[0_0_15px_#0bda5b] flex items-center justify-center text-[8px] text-white font-bold relative z-10">
                        42
                      </div>
                    </div>
                    <span className="text-[10px] text-white font-bold bg-black/50 px-1.5 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity">成都</span>
                  </div>

                  {/* Wuhan / Central - Medium */}
                  <div className="absolute top-[54%] left-[66%] flex flex-col items-center group cursor-pointer z-10">
                    <div className="relative">
                      <div className="size-5 bg-primary/40 rounded-full animate-pulse absolute inset-0"></div>
                      <div className="size-5 bg-primary/60 rounded-full border border-white/50 shadow-[0_0_15px_#137fec] flex items-center justify-center text-[8px] text-white font-bold relative z-10">
                        58
                      </div>
                    </div>
                    <span className="text-[10px] text-white font-bold bg-black/50 px-1.5 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity">武汉</span>
                  </div>

                  {/* Xi'an / Northwest - Medium */}
                  <div className="absolute top-[45%] left-[58%] flex flex-col items-center group cursor-pointer z-10">
                    <div className="relative">
                      <div className="size-4 bg-primary/40 rounded-full animate-pulse absolute inset-0"></div>
                      <div className="size-4 bg-primary/60 rounded-full border border-white/50 shadow-[0_0_15px_#137fec] flex items-center justify-center text-[8px] text-white font-bold relative z-10">
                        35
                      </div>
                    </div>
                    <span className="text-[10px] text-white font-bold bg-black/50 px-1.5 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity">西安</span>
                  </div>

                  {/* Legend Overlay */}
                  <div className="absolute bottom-4 left-4 p-3 bg-surface-dark/90 backdrop-blur-md rounded border border-white/10 flex flex-col gap-2 z-20">
                    <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">业务量级</p>
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-accent-gold shadow-[0_0_5px_#facc15]"></div>
                        <span className="text-[10px] text-white">核心业务区 (100+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-primary shadow-[0_0_5px_#137fec]"></div>
                        <span className="text-[10px] text-white">重点拓展区 (50-100)</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-accent-green shadow-[0_0_5px_#0bda5b]"></div>
                        <span className="text-[10px] text-white">成长区域 (&lt;50)</span>
                    </div>
                  </div>
               </div>
               
               {/* Data Table Area - Extended width and new columns */}
               <div className="w-[480px] border-l border-border-dark bg-surface-dark/50 backdrop-blur-sm flex flex-col z-10">
                  <div className="grid grid-cols-6 gap-2 p-3 border-b border-border-dark text-[10px] text-text-secondary font-medium">
                     <span className="col-span-4">院校名称</span>
                     <span className="col-span-2 text-right">实验总时长(h)</span>
                  </div>
                  <div className="flex-1 overflow-y-auto scrollbar-hide">
                     {dataRankings.map((row, i) => (
                        <div key={i} className="grid grid-cols-6 gap-2 p-3 border-b border-border-dark/50 text-xs hover:bg-white/5 transition-colors">
                           <div className="col-span-4 flex items-center gap-2 font-medium text-white">
                              <span className={`size-4 shrink-0 rounded flex items-center justify-center text-[9px] ${i < 3 ? 'bg-primary text-white' : 'bg-border-dark text-text-secondary'}`}>{i+1}</span>
                              <span className="truncate" title={row.name}>{row.name}</span>
                           </div>
                           <div className="col-span-2 text-right text-primary font-mono">{row.totalTime.toLocaleString()}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Row 3: Final Analysis Area */}
      <div className="grid grid-cols-12 gap-6 h-[540px] shrink-0">
        {/* Left: Professional Course Usage Proportion (Radar + Top 5) */}
        <div className="col-span-8 bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base flex items-center gap-2 text-white uppercase tracking-tighter">
              <GraduationCap size={20} className="text-primary" /> 专业课程使用占比
            </h3>
          </div>
          <div className="flex-1 flex gap-8">
            {/* Radar Section */}
            <div className="flex-1 flex flex-col">
              <p className="text-[10px] text-text-secondary mb-4 uppercase tracking-widest font-bold opacity-60">专业热度分布 (课程数 & 学习人数)</p>
              <div className="flex-1 bg-background-dark/30 rounded-lg p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
                    <PolarGrid stroke="#233648" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#92adc9', fontSize: 10, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar name="课程数" dataKey="courses" stroke="#137fec" fill="#137fec" fillOpacity={0.4} />
                    <Radar name="学习人数" dataKey="students" stroke="#facc15" fill="#facc15" fillOpacity={0.4} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top 5 Table Section */}
            <div className="w-[300px] flex flex-col">
              <p className="text-[10px] text-text-secondary mb-4 uppercase tracking-widest font-bold opacity-60">课程价值排行 (TOP 5)</p>
              <div className="flex-1 overflow-y-auto scrollbar-hide bg-black/20 rounded-lg p-4">
                <table className="w-full text-[10px] border-collapse">
                  <thead>
                    <tr className="text-text-secondary border-b border-white/5">
                      <th className="pb-3 text-left font-medium">课程</th>
                      <th className="pb-3 text-center font-medium">学习人数</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {dataCourseTop5.map((course, idx) => (
                      <tr key={idx} className="group hover:bg-white/5 transition-colors">
                        <td className="py-4 flex items-center gap-2">
                          <span className={`size-4 rounded-sm flex items-center justify-center text-[9px] font-bold ${idx < 3 ? 'bg-primary' : 'bg-border-dark'}`}>{idx+1}</span>
                          <span className="text-white truncate max-w-[90px]">{course.name}</span>
                        </td>
                        <td className="py-4 text-center font-mono text-text-secondary">{course.learners.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Experiment Use Duration Ranking */}
        <div className="col-span-4 bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base flex items-center gap-2 text-white uppercase tracking-tighter">
              <BarChart3 size={20} className="text-accent-gold" /> 实验使用时长占比
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="flex flex-col gap-6">
              {dataExpDuration.map((item, index) => {
                const maxVal = dataExpDuration[0].value;
                const percent = (item.value / maxVal) * 100;
                return (
                  <div key={index} className="flex flex-col gap-2 group">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white/80 group-hover:text-primary transition-colors truncate max-w-[200px]">{index + 1}. {item.name}</span>
                      <span className="text-primary font-mono font-bold">{item.value.toLocaleString()} h</span>
                    </div>
                    <div className="w-full h-2 bg-background-dark/50 border border-border-dark rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-primary/30 to-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(19,127,236,0.5)]" 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border-dark flex items-center justify-between">
             <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Total Monitored Projects</span>
             <span className="text-xs font-black text-white">42 项目</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabTeachingAnalysis;