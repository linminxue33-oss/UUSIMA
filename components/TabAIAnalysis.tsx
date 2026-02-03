import React, { useState, useEffect } from 'react';
import { MessageSquare, MessageCircle, Database, TrendingUp, TrendingDown, Zap, Users, Trophy, Flame, Search, Sparkles } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

// --- Mock Data ---

const dataAiTrend = [
  { value: 10 }, { value: 15 }, { value: 12 }, { value: 18 }, { value: 25 }, { value: 22 }, 
  { value: 30 }, { value: 35 }, { value: 45 }, { value: 40 }, { value: 60 }, { value: 55 },
  { value: 65 }, { value: 70 }, { value: 85 }, { value: 90 }, { value: 80 }, { value: 95 }
];

const dataSkillAssistants = [
  { name: '通用助手', qa: 8500, usage: 12400 },
  { name: '智慧园区', qa: 4200, usage: 6800 },
  { name: '智慧温室', qa: 3800, usage: 5900 },
  { name: '深度学习', qa: 5100, usage: 7200 },
  { name: 'Hadoop', qa: 2900, usage: 4500 },
  { name: '嵌入式', qa: 3500, usage: 5100 },
];

const dataSchoolTop10 = [
  { name: '深圳职业技术大学', value: 12450 },
  { name: '广东轻工职业技术学院', value: 10890 },
  { name: '南京工业职业技术大学', value: 9850 },
  { name: '金华职业技术学院', value: 8760 },
  { name: '天津市职业大学', value: 7650 },
  { name: '无锡职业技术学院', value: 6540 },
  { name: '陕西工业职业技术学院', value: 5430 },
  { name: '重庆电子工程职业学院', value: 4320 },
  { name: '北京电子科技职业学院', value: 3210 },
  { name: '淄博职业学院', value: 2100 },
];

const dataWordFrequency = [
  { keyword: 'Python 实验', count: 12450, growth: '+15%', hot: true },
  { keyword: '传感器配置', count: 9820, growth: '+8%', hot: true },
  { keyword: '深度学习模型', count: 8540, growth: '+22%', hot: true },
  { keyword: '数据清洗', count: 7210, growth: '+5%', hot: false },
  { keyword: '工业网关', count: 6100, growth: '+12%', hot: false },
  { keyword: '嵌入式调试', count: 5430, growth: '-2%', hot: false },
  { keyword: '5G基站实训', count: 4280, growth: '+30%', hot: true },
  { keyword: 'OpenCV应用', count: 3950, growth: '+10%', hot: false },
  { keyword: '算法优化', count: 3100, growth: '+4%', hot: false },
  { keyword: 'PLC 编程', count: 2850, growth: '+7%', hot: false },
];

// --- Components ---

const StatBox = ({ icon: Icon, title, value, unit, trend, isUp = true, color = "text-primary" }: any) => (
  <div className="bg-surface-dark border border-border-dark p-5 rounded-lg text-center relative overflow-hidden group hover:border-primary/50 transition-all">
    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
      <Icon size={64} />
    </div>
    <p className="text-text-secondary text-xs mb-1">{title}</p>
    <h2 className={`text-3xl font-bold font-sans tracking-tight chart-glow ${color === 'text-primary' ? 'text-white' : color}`}>
      {value} <span className="text-sm font-normal text-text-secondary">{unit}</span>
    </h2>
    <div className={`mt-1 text-xs font-medium flex items-center justify-center gap-1 ${isUp ? 'text-accent-green' : 'text-accent-red'}`}>
      {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {trend}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-dark border border-border-dark p-2 rounded shadow-xl text-xs z-50">
          <p className="font-bold mb-1 text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
             <p key={index} style={{ color: entry.color }}>
                {entry.name}: {entry.value.toLocaleString()}
             </p>
          ))}
        </div>
      );
    }
    return null;
};

const TabAIAnalysis: React.FC = () => {
  // Real-time metrics state
  const [metrics, setMetrics] = useState({
    users: 1284,
    interactions: 3592
  });

  // Real-time curve state (24 data points to represent hourly trend)
  const [curveData, setCurveData] = useState(() => 
    Array.from({ length: 24 }, (_, i) => ({
      time: i,
      value: Math.floor(Math.random() * 30) + 50
    }))
  );

  // Update metrics every second
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        users: Math.max(1000, prev.users + Math.floor(Math.random() * 11) - 5), // +/- fluctuation
        interactions: prev.interactions + Math.floor(Math.random() * 10) // Always increasing mostly
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update curve every second (shift effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurveData(prev => {
        const nextTime = (prev[prev.length - 1].time + 1);
        const nextValue = Math.floor(Math.random() * 40) + 40 + (Math.random() * 20);
        // Remove first, add new at end
        const newArr = prev.slice(1);
        newArr.push({ time: nextTime, value: nextValue });
        return newArr;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6 pb-6 h-full">
      {/* Left Column */}
      <div className="col-span-3 flex flex-col gap-6">
        
        {/* Real-time AI Monitor */}
        <div className="bg-gradient-to-br from-surface-dark/90 to-background-dark border border-primary/20 flex-1 p-5 flex flex-col rounded-lg shadow-[inset_0_0_20px_rgba(19,127,236,0.05)] relative overflow-hidden">
           {/* Tech Corners */}
           <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
           <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"></div>

           <div className="flex items-center gap-2 mb-4 relative z-10">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <h3 className="text-sm font-bold text-white/90 uppercase tracking-tighter">实时 AI 监控中心</h3>
              <span className="ml-auto size-2 rounded-full bg-accent-green animate-pulse"></span>
           </div>
           
           <div className="flex-1 flex flex-col gap-6 relative z-10">
              <div>
                 <div className="flex items-center gap-2 text-text-secondary text-xs mb-1">
                    <Users size={12} /> 在线 AI 对话人数
                 </div>
                 <div className="text-3xl font-bold text-white font-sans chart-glow w-32 tabular-nums">
                    {metrics.users.toLocaleString()}
                 </div>
              </div>

              <div className="flex-1 flex flex-col">
                 <div className="flex items-center gap-2 text-text-secondary text-xs mb-1">
                    <Zap size={12} /> 实时问答交互数量
                 </div>
                 <div className="text-3xl font-bold text-accent-gold font-sans chart-glow mb-2 w-32 tabular-nums">
                    {metrics.interactions.toLocaleString()}
                 </div>
                 <div className="flex-1 w-full min-h-[60px] bg-white/5 rounded-md border border-white/5 overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={curveData}>
                          <defs>
                             <linearGradient id="realTimeGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#facc15" stopOpacity={0.4}/>
                                <stop offset="100%" stopColor="#facc15" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <Area 
                             type="monotone" 
                             dataKey="value" 
                             stroke="#facc15" 
                             strokeWidth={2} 
                             fill="url(#realTimeGrad)" 
                             isAnimationActive={true}
                             animationDuration={500}
                          />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 <p className="text-[9px] text-text-secondary text-right mt-1">Dynamic Traffic Analysis</p>
              </div>
           </div>
        </div>

        {/* Daily AI Trend */}
        <div className="bg-gradient-to-br from-surface-dark/90 to-background-dark border border-primary/20 flex-1 p-5 rounded-lg flex flex-col relative overflow-hidden">
           <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
           <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"></div>

           <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                 <div className="w-1 h-4 bg-primary rounded-full"></div>
                 <h3 className="text-sm font-bold text-white/90 uppercase tracking-tighter">每日 AI 使用趋势</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded border border-primary/30">近30日</span>
           </div>
           
           <div className="flex flex-col gap-1 mb-2 relative z-10">
              <p className="text-3xl font-bold font-sans chart-glow">120,492</p>
              <p className="text-[11px] text-accent-green flex items-center gap-1 font-bold">
                 <TrendingUp size={14} /> +15.2% 环比增长
              </p>
           </div>
           
           <div className="flex-1 w-full min-h-[80px] relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={dataAiTrend}>
                    <defs>
                       <linearGradient id="aiTrendGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#137fec" stopOpacity={0.5}/>
                          <stop offset="100%" stopColor="#137fec" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#137fec" strokeWidth={2} fill="url(#aiTrendGrad)" />
                 </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-between mt-2 text-[9px] text-text-secondary font-sans px-1">
                 <span>05-01</span>
                 <span>05-15</span>
                 <span>05-30</span>
              </div>
           </div>
        </div>
      </div>

      {/* Middle Column */}
      <div className="col-span-6 flex flex-col gap-6">
         {/* Top Stats */}
         <div className="grid grid-cols-3 gap-6">
            <StatBox icon={MessageSquare} title="AI 提问总数" value="2,845,920" trend="+12.5%" isUp={true} />
            <StatBox icon={MessageCircle} title="平均对话轮数" value="8.54" trend="-2.1%" isUp={false} color="text-white" />
            <StatBox icon={Database} title="Token 消耗总量" value="14.2" unit="亿" trend="+18.4%" isUp={true} />
         </div>

         {/* Heatmap Map */}
         <div className="border border-primary/20 flex-1 rounded-lg relative overflow-hidden bg-white/5 shadow-[0_0_20px_rgba(19,127,236,0.1)] min-h-[400px]">
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
               <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  <h3 className="text-lg font-bold text-white/90 uppercase tracking-tighter">机构 AI 使用热力分布</h3>
               </div>
               <p className="text-xs text-text-secondary">实时监测各院校实验室 AI 交互活跃度</p>
            </div>

            <div className="w-full h-full bg-cover bg-no-repeat opacity-40 mix-blend-screen" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu3P7wO66i2gtBSD64VqZc-ndbXP0vkHohDukIyqVunHnza2ywZ2e_FSGHwmbkFWbI8TlxEZ4xcuhLjpjNqPXqhiCNG1T22eJt0eMGCMZAOaBrBt5V-GurFgOuOPxKcDptkay3I4mF9aZ_rqiHBvlHaOUBcuiaqCFcrPindfES4ZmP8UCedvo40UPIoRwb3XiyG3Yb8gwAll2dcuIvVuuO1jrVVx6ogwOe0x1jcxhRyts1tjiPIASg9gQlIIrXIFMuhi9pOelvdN6n')" }}></div>
            
            {/* Hotspots */}
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#137fec] animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#137fec] animate-pulse delay-75"></div>
            <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#137fec] animate-pulse delay-150"></div>
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#137fec] animate-pulse delay-300"></div>

            <div className="absolute bottom-6 left-6 p-4 bg-black/40 backdrop-blur-md rounded border border-white/10 flex flex-col gap-2">
               <div className="flex items-center gap-3">
                  <div className="size-3 rounded-sm bg-primary/20 border border-primary"></div>
                  <span className="text-xs text-text-secondary">活跃度：低</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="size-3 rounded-sm bg-primary/60 border border-primary"></div>
                  <span className="text-xs text-text-secondary">活跃度：中</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="size-3 rounded-sm bg-primary border border-primary shadow-[0_0_8px_#137fec]"></div>
                  <span className="text-xs text-text-secondary">活跃度：高</span>
               </div>
            </div>
            
            <div className="absolute top-6 right-6 text-right">
               <p className="text-[10px] text-text-secondary uppercase tracking-widest">Active Institutions</p>
               <p className="text-2xl font-bold font-sans">128 <span className="text-sm text-primary">/ 142</span></p>
            </div>
         </div>
      </div>

      {/* Right Column */}
      <div className="col-span-3 flex flex-col gap-6">
         {/* Word Frequency Analysis */}
         <div className="bg-gradient-to-br from-surface-dark/90 to-background-dark border border-primary/20 p-5 rounded-lg flex flex-col relative overflow-hidden shadow-[inset_0_0_20px_rgba(19,127,236,0.05)]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"></div>

            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                  <Search size={16} className="text-primary" />
                  <h3 className="text-sm font-bold text-white/90 uppercase tracking-tighter">用户提问热词分析</h3>
               </div>
               <div className="flex items-center gap-1 text-[9px] text-text-secondary">
                  <Flame size={10} className="text-accent-red" /> 实时热度
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-3">
               {dataWordFrequency.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 group">
                     <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-2">
                           <span className={`text-[10px] font-bold italic ${idx < 3 ? 'text-accent-gold' : 'text-text-secondary/50'}`}>#{idx + 1}</span>
                           <span className="text-[11px] text-white/90 font-medium group-hover:text-primary transition-colors flex items-center gap-1">
                              {item.keyword}
                              {item.hot && <Flame size={10} className="text-accent-red fill-accent-red animate-pulse" />}
                           </span>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-mono text-white/60">{item.count.toLocaleString()}</span>
                           <span className={`text-[8px] font-bold ${item.growth.startsWith('+') ? 'text-accent-green' : 'text-accent-red'}`}>{item.growth}</span>
                        </div>
                     </div>
                     <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                           className={`h-full rounded-full transition-all duration-1000 ${idx < 3 ? 'bg-primary' : 'bg-primary/30'}`} 
                           style={{ width: `${(item.count / dataWordFrequency[0].count) * 100}%` }}
                        ></div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between bg-white/5 p-2 rounded">
               <div className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                  <Sparkles size={12} className="text-primary" /> AI 语义分类
               </div>
               <button className="text-[10px] text-primary hover:underline">查看全表</button>
            </div>
         </div>

         {/* Skill Assistant Usage */}
         <div className="bg-gradient-to-br from-surface-dark/90 to-background-dark border border-primary/20 flex-1 p-5 rounded-lg flex flex-col relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"></div>

            <div className="flex items-center gap-2 mb-2">
               <div className="w-1 h-4 bg-primary rounded-full"></div>
               <h3 className="text-sm font-bold text-white/90 uppercase tracking-tighter">垂类助手活跃度</h3>
            </div>
            
            <div className="flex-1 w-full min-h-[160px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataSkillAssistants} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#233648" horizontal={false} />
                     <XAxis type="number" stroke="#92adc9" fontSize={9} tickLine={false} axisLine={false} />
                     <YAxis dataKey="name" type="category" stroke="#92adc9" fontSize={10} tickLine={false} axisLine={false} width={60} />
                     <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                     <Legend verticalAlign="top" height={36} iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                     <Bar dataKey="usage" name="使用量" fill="#137fec" radius={[0, 4, 4, 0]} barSize={8} />
                     <Bar dataKey="qa" name="问答数" fill="#facc15" radius={[0, 4, 4, 0]} barSize={8} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* TOP 5 Ranking (Simplified) */}
         <div className="bg-gradient-to-br from-surface-dark/90 to-background-dark border border-primary/20 p-5 rounded-lg relative overflow-hidden h-[180px]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"></div>
            <div className="flex items-center gap-2 mb-3">
               <Trophy size={16} className="text-accent-gold" />
               <h3 className="text-sm font-bold text-white/90 uppercase tracking-tighter">全平台活跃院校</h3>
            </div>
            <div className="flex flex-col gap-2">
               {dataSchoolTop10.slice(0, 5).map((school, index) => (
                  <div key={index} className="flex justify-between items-center text-[11px]">
                     <span className="text-text-secondary truncate max-w-[150px]">
                        <span className={`inline-block w-4 text-center mr-1 ${index < 3 ? 'text-accent-gold font-bold' : 'text-text-secondary/50'}`}>{index + 1}</span>
                        {school.name}
                     </span>
                     <span className="font-mono text-primary/80 font-bold">{(school.value / 1000).toFixed(1)}k</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default TabAIAnalysis;