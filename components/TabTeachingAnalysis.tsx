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

const dataRegions = [
  { region: '广东省', schools: 145, users: 42000, avgTime: 45, totalTime: 124500 },
  { region: '北京市', schools: 112, users: 38500, avgTime: 42, totalTime: 98200 },
  { region: '上海市', schools: 98, users: 35200, avgTime: 40, totalTime: 89400 },
  { region: '江苏省', schools: 85, users: 28900, avgTime: 38, totalTime: 65100 },
  { region: '四川省', schools: 64, users: 22400, avgTime: 35, totalTime: 45300 },
  { region: '浙江省', schools: 72, users: 21500, avgTime: 36, totalTime: 42800 },
  { region: '山东省', schools: 68, users: 19800, avgTime: 34, totalTime: 39500 },
  { region: '湖北省', schools: 55, users: 16400, avgTime: 32, totalTime: 31200 },
  { region: '河南省', schools: 52, users: 15200, avgTime: 30, totalTime: 28500 },
  { region: '陕西省', schools: 48, users: 14100, avgTime: 31, totalTime: 26400 },
];

const dataInstitutionTypes = [
  { name: '本科院校', value: 50, color: '#137fec', ratio: '5' },
  { name: '高职院校', value: 30, color: '#facc15', ratio: '3' },
  { name: '中职院校', value: 20, color: '#0bda5b', ratio: '2' },
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
              <div className="flex gap-4 mt-6">
                 <div>
                   <p className="text-[9px] text-text-secondary">月环比</p>
                   <span className="text-xs font-bold text-accent-green flex items-center"><TrendingUp size={12} className="mr-0.5"/> 5.4%</span>
                 </div>
                 <div className="w-16 h-8 opacity-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[5, 8, 4, 10, 7, 12, 9].map(v => ({v}))}>
                        <Area type="monotone" dataKey="v" stroke="#137fec" fill="#137fec" fillOpacity={0.4} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
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
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <p className="text-[10px] text-text-secondary mb-1">当前院校数量</p>
              <p className="text-4xl font-bold text-white chart-glow font-sans tabular-nums">
                {realTimeData.institutions}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="size-1.5 rounded-full bg-accent-green animate-pulse"></span>
                <span className="text-[9px] text-accent-green font-bold uppercase">当前在线院校：55</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-center mb-1">
                 <p className="text-[10px] text-text-secondary">类型分布</p>
              </div>
              <div className="flex flex-col gap-2">
                {dataInstitutionTypes.map((type, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <div className="flex justify-between text-[9px]">
                       <span className="text-text-secondary">{type.name}</span>
                       <span className="text-white font-mono">{type.value}%</span>
                    </div>
                    <div className="w-full h-1 bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${type.value}%`, backgroundColor: type.color }}></div>
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
              <h3 className="font-bold text-sm text-white/90 uppercase tracking-tighter">💚 实验使用情况</h3>
            </div>
            <div className="flex items-center gap-0.5 text-accent-gold">
               {Array.from({length: 4}).map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
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
                   <div className="flex items-center gap-1 text-[10px] text-accent-green font-bold bg-accent-green/10 px-1.5 py-0.5 rounded">
                      <TrendingUp size={12} /> 月环比: ↑ 5.4%
                   </div>
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
                  <Map size={20} className="text-primary" /> 地区使用分布
               </h3>
               <div className="flex items-center gap-4 text-[10px] text-text-secondary uppercase tracking-widest font-bold">
                  <span>院校活跃度实时追踪</span>
               </div>
            </div>
            
            <div className="flex h-full">
               {/* Visual Map Area with Heatmap Style */}
               <div className="flex-1 relative overflow-hidden bg-[#0f1218]">
                  <div className="absolute inset-0 bg-cover bg-no-repeat opacity-60 mix-blend-screen" 
                       style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu3P7wO66i2gtBSD64VqZc-ndbXP0vkHohDukIyqVunHnza2ywZ2e_FSGHwmbkFWbI8TlxEZ4xcuhLjpjNqPXqhiCNG1T22eJt0eMGCMZAOaBrBt5V-GurFgOuOPxKcDptkay3I4mF9aZ_rqiHBvlHaOUBcuiaqCFcrPindfES4ZmP8UCedvo40UPIoRwb3XiyG3Yb8gwAll2dcuIvVuuO1jrVVx6ogwOe0x1jcxhRyts1tjiPIASg9gQlIIrXIFMuhi9pOelvdN6n')" }}>
                  </div>
                  
                  {/* Hotspots for Map */}
                  <div className="absolute top-[40%] left-[60%] w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#137fec] animate-pulse"></div>
                  <div className="absolute top-[35%] left-[55%] w-2 h-2 bg-primary/80 rounded-full shadow-[0_0_10px_#137fec] animate-pulse delay-75"></div>
                  <div className="absolute top-[45%] left-[65%] w-2 h-2 bg-primary/80 rounded-full shadow-[0_0_10px_#137fec] animate-pulse delay-150"></div>
                  <div className="absolute top-[38%] left-[68%] w-1.5 h-1.5 bg-primary/60 rounded-full shadow-[0_0_8px_#137fec] animate-pulse delay-300"></div>
                  <div className="absolute top-[50%] left-[58%] w-1.5 h-1.5 bg-primary/60 rounded-full shadow-[0_0_8px_#137fec] animate-pulse delay-500"></div>

                  {/* Optional Legend for Map */}
                  <div className="absolute bottom-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded border border-white/10 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-primary shadow-[0_0_5px_#137fec]"></div>
                        <span className="text-[10px] text-text-secondary">高活跃区</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-primary/40"></div>
                        <span className="text-[10px] text-text-secondary">普通活跃</span>
                    </div>
                  </div>
               </div>
               
               {/* Data Table Area */}
               <div className="w-[400px] border-l border-border-dark bg-surface-dark/50 backdrop-blur-sm flex flex-col z-10">
                  <div className="grid grid-cols-5 gap-2 p-3 border-b border-border-dark text-[10px] text-text-secondary font-medium">
                     <span>地区</span>
                     <span className="text-center">学校</span>
                     <span className="text-center">用户数</span>
                     <span className="text-center">在线(min)</span>
                     <span className="text-right">总时长(h)</span>
                  </div>
                  <div className="flex-1 overflow-y-auto scrollbar-hide">
                     {dataRegions.map((row, i) => (
                        <div key={i} className="grid grid-cols-5 gap-2 p-3 border-b border-border-dark/50 text-xs hover:bg-white/5 transition-colors">
                           <div className="flex items-center gap-2 font-medium text-white">
                              <span className={`size-4 rounded flex items-center justify-center text-[9px] ${i < 3 ? 'bg-primary text-white' : 'bg-border-dark text-text-secondary'}`}>{i+1}</span>
                              {row.region}
                           </div>
                           <div className="flex items-center justify-center text-text-secondary"><School size={10} className="mr-1"/> {row.schools}</div>
                           <div className="flex items-center justify-center text-text-secondary"><Users size={10} className="mr-1"/> {row.users.toLocaleString()}</div>
                           <div className="flex items-center justify-center text-text-secondary"><Clock size={10} className="mr-1"/> {row.avgTime}</div>
                           <div className="text-right text-primary font-mono">{row.totalTime.toLocaleString()}</div>
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
                      <th className="pb-3 text-right font-medium">月增长率</th>
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
                        <td className="py-4 text-right text-accent-green font-bold flex items-center justify-end gap-1">
                          <TrendingUp size={10} /> {course.growth}%
                        </td>
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