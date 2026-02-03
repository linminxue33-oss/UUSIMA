
import React, { useState, useEffect } from 'react';
import { 
  Shield, Server, Cpu, HardDrive, ShieldCheck, 
  Activity, Globe, Lock, AlertCircle, CheckCircle2,
  Database, Share2, Zap, Wifi, Filter, Calendar, 
  ChevronDown, TrendingUp, TrendingDown, Users, 
  BookOpen, Target, Flag, Info, MessageSquare, 
  AlertTriangle, Star, BarChart3, PieChart as PieChartIcon, 
  LayoutDashboard, Search
} from 'lucide-react';
// Added ComposedChart to the recharts import list
import { 
  AreaChart, Area, ResponsiveContainer, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis, Legend,
  ComposedChart
} from 'recharts';

// --- Mock Data ---

const dataKPI = [
  { label: '私有化部署学校', value: 42, unit: '所', trend: '+2' },
  { label: '当前活跃学校', value: 38, unit: '所', trend: '90.5%', isRate: true },
  { label: '学校活跃率', value: 90.5, unit: '%', trend: '+1.2%' },
  { label: '节点在线率', value: 98.2, unit: '%', trend: '稳定', isStatus: true },
  { label: '平均运行天数', value: 156, unit: '天', trend: '+12' },
];

const dataNodeStatus = [
  { name: '在线', value: 38, color: '#0bda5b' },
  { name: '异常', value: 3, color: '#facc15' },
  { name: '离线', value: 1, color: '#fa6238' },
];

const dataActivityTrend = [
  { name: 'W1', value: 28 }, { name: 'W2', value: 32 }, { name: 'W3', value: 30 },
  { name: 'W4', value: 35 }, { name: 'W5', value: 38 }, { name: 'W6', value: 37 },
];

const dataActivityDist = [
  { name: '高活跃', value: 12, color: '#137fec' },
  { name: '中活跃', value: 18, color: '#137fec88' },
  { name: '低活跃', value: 8, color: '#233648' },
];

const dataTeachingDepth = [
  { name: '平均课程数', current: 15, benchmark: 20 },
  { name: '平均实验数', current: 85, benchmark: 100 },
  { name: '实验密度', current: 5.6, benchmark: 5.0 },
];

const dataDepthRadar = [
  { subject: '课程使用', A: 85, fullMark: 100 },
  { subject: '实验发布', A: 70, fullMark: 100 },
  { subject: '完成情况', A: 90, fullMark: 100 },
  { subject: '持续使用', A: 65, fullMark: 100 },
];

const dataStratification = [
  { x: 85, y: 92, name: '深圳职业技术大学', type: '标杆' },
  { x: 45, y: 55, name: '某试点中职', type: '待提升' },
  { x: 70, y: 65, name: '广东轻工', type: '潜力' },
  { x: 90, y: 88, name: '南京工业', type: '示范' },
  { x: 60, y: 75, name: '北京电子', type: '潜力' },
];

const dataStabilityTrend = [
  { time: '08:00', success: 99.8, total: 100 },
  { time: '10:00', success: 98.5, total: 100 },
  { time: '12:00', success: 99.9, total: 100 },
  { time: '14:00', success: 99.2, total: 100 },
  { time: '16:00', success: 97.8, total: 100 },
  { time: '18:00', success: 99.5, total: 100 },
];

const dataOptimizationReason = [
  { name: '课程数量不足', value: 45, color: '#137fec' },
  { name: '实验数量不足', value: 25, color: '#facc15' },
  { name: '完成率低', value: 30, color: '#fa6238' },
];

// --- Sub-components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-dark border border-border-dark p-2 rounded shadow-xl text-xs z-50">
        <p className="font-bold mb-1 text-white">{label || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color || entry.fill }}>
            {entry.name}: {entry.value}{entry.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TabPrivatePlatform: React.FC = () => {
  const [filterType, setFilterType] = useState('全部学校');

  return (
    <div className="w-full flex flex-col gap-6 pb-6 animate-in fade-in duration-500">
      
      {/* 全局筛选区 */}
      <div className="flex items-center justify-between bg-surface-dark border border-border-dark p-3 rounded-xl shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <select className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer">
              <option>本月</option>
              <option>本学期</option>
              <option>自定义时间</option>
            </select>
          </div>
          <div className="w-px h-4 bg-border-dark"></div>
          <div className="flex items-center gap-2">
            <Flag size={16} className="text-accent-gold" />
            <select 
              className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>全部学校类型</option>
              <option>本科院校</option>
              <option>高职院校</option>
              <option>中职院校</option>
            </select>
          </div>
          <div className="w-px h-4 bg-border-dark"></div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-accent-green" />
            <select className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer">
              <option>全部部署状态</option>
              <option>新部署</option>
              <option>稳定运行</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Global Live Filters</span>
          <div className="size-2 rounded-full bg-accent-green animate-pulse"></div>
        </div>
      </div>

      {/* 模块一：私有化部署总体态势 */}
      <div className="grid grid-cols-12 gap-6 h-48 shrink-0">
        <div className="col-span-9 bg-surface-dark border border-border-dark rounded-xl p-6 flex justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
          {dataKPI.map((item, i) => (
            <div key={i} className="flex flex-col justify-center items-center px-4 flex-1 border-r last:border-0 border-border-dark/30">
              <p className="text-[11px] text-text-secondary mb-2 font-bold uppercase tracking-tight">{item.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white chart-glow font-sans tabular-nums">{item.value}</span>
                <span className="text-xs text-text-secondary font-bold">{item.unit}</span>
              </div>
              <div className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${item.trend.includes('+') || item.isRate ? 'text-accent-green' : 'text-text-secondary'}`}>
                {item.trend.includes('+') && <TrendingUp size={12} />}
                {item.trend}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-3 bg-surface-dark border border-border-dark rounded-xl p-5 flex flex-col relative overflow-hidden">
           <h3 className="text-[11px] font-bold text-text-secondary uppercase mb-2 tracking-tighter">节点状态分布</h3>
           <div className="flex-1 flex items-center">
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dataNodeStatus} innerRadius={30} outerRadius={45} paddingAngle={5} dataKey="value">
                      {dataNodeStatus.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-1 ml-4">
                 {dataNodeStatus.map((item, i) => (
                   <div key={i} className="flex items-center gap-2 text-[10px]">
                      <div className="size-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-text-secondary">{item.name}</span>
                      <span className="text-white font-bold ml-auto">{item.value}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* 模块二 & 模块三 */}
      <div className="grid grid-cols-2 gap-6 h-[420px]">
        {/* 模块二：学校使用活跃度 */}
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base flex items-center gap-2 text-white">
              <Users size={20} className="text-primary" /> 学校使用活跃度分析
            </h3>
          </div>
          <div className="flex-1 flex gap-6">
            <div className="flex-1 flex flex-col gap-4">
              <div className="h-1/2 bg-black/20 rounded-lg p-2">
                <p className="text-[10px] text-text-secondary mb-2 font-bold uppercase">活跃分布 / 数量趋势</p>
                <ResponsiveContainer width="100%" height="100%">
                   <ComposedChart data={dataActivityTrend}>
                      <XAxis dataKey="name" stroke="#233648" fontSize={10} tickLine={false} />
                      <YAxis hide />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" fill="#137fec" radius={[2, 2, 0, 0]} barSize={20} />
                      <Line type="monotone" dataKey="value" stroke="#facc15" strokeWidth={2} dot={{ r: 3 }} />
                   </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] text-text-secondary mb-2 font-bold uppercase">低活跃预警学校</p>
                <div className="overflow-y-auto h-full scrollbar-hide">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="text-text-secondary border-b border-white/5 text-left">
                        <th className="pb-2">学校名称</th>
                        <th className="pb-2 text-center">最近活跃</th>
                        <th className="pb-2 text-right">跟进建议</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[1, 2, 3].map(i => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="py-3 text-white">某某试点职业学院</td>
                          <td className="py-3 text-center text-text-secondary">3天前</td>
                          <td className="py-3 text-right">
                             <span className="px-2 py-0.5 bg-accent-gold/10 text-accent-gold rounded-full border border-accent-gold/20">推送课程包</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="w-32 flex flex-col gap-4">
               {dataActivityDist.map((item, i) => (
                 <div key={i} className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col items-center">
                    <span className="text-[10px] text-text-secondary mb-1">{item.name}</span>
                    <span className="text-xl font-black text-white">{item.value}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* 模块三：教学应用深度 */}
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base flex items-center gap-2 text-white">
              <BookOpen size={20} className="text-accent-gold" /> 教学应用深度分析
            </h3>
          </div>
          <div className="flex-1 flex gap-6">
            <div className="flex-1 flex flex-col justify-around">
               {dataTeachingDepth.map((item, i) => (
                 <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between text-[11px]">
                       <span className="text-white font-medium">{item.name}</span>
                       <span className="text-text-secondary">均值: {item.current} / 标杆: {item.benchmark}</span>
                    </div>
                    <div className="w-full h-1.5 bg-background-dark rounded-full overflow-hidden">
                       <div className="h-full bg-primary rounded-full shadow-[0_0_8px_#137fec]" style={{ width: `${(item.current/item.benchmark)*100}%` }}></div>
                    </div>
                 </div>
               ))}
               <div className="mt-4 p-3 bg-accent-green/10 border border-accent-green/20 rounded-lg flex items-center gap-2">
                  <Info size={16} className="text-accent-green" />
                  <p className="text-[10px] text-accent-green font-bold uppercase">当前实验密度高于全平台 12%</p>
               </div>
            </div>
            <div className="w-[200px] h-full">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataDepthRadar}>
                   <PolarGrid stroke="#233648" />
                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#92adc9', fontSize: 10 }} />
                   <Radar name="均值" dataKey="A" stroke="#facc15" fill="#facc15" fillOpacity={0.5} />
                 </RadarChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 模块四：学校分层与对比分析 */}
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col h-[480px]">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-base flex items-center gap-2 text-white">
              <Target size={20} className="text-primary" /> 学校分层与对比分析
           </h3>
           <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                 <div className="size-2 rounded-full bg-primary shadow-[0_0_5px_#137fec]"></div> 标杆/示范
              </div>
              <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                 <div className="size-2 rounded-full bg-border-dark"></div> 潜力/待提升
              </div>
           </div>
        </div>
        <div className="flex-1 flex gap-8">
           {/* 矩阵图 */}
           <div className="flex-1 bg-black/20 rounded-xl relative border border-white/5 overflow-hidden p-8">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                 <div className="border-r border-b border-white/5 flex items-start p-4"><span className="text-[10px] text-primary/40 uppercase font-black">示范学校</span></div>
                 <div className="border-b border-white/5 flex items-start justify-end p-4"><span className="text-[10px] text-accent-gold/40 uppercase font-black">标杆学校</span></div>
                 <div className="border-r border-white/5 flex items-end p-4"><span className="text-[10px] text-text-secondary/20 uppercase font-black">待提升学校</span></div>
                 <div className="flex items-end justify-end p-4"><span className="text-[10px] text-accent-green/20 uppercase font-black">潜力学校</span></div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="x" name="教学深度" unit="%" hide />
                  <YAxis type="number" dataKey="y" name="完成率" unit="%" hide />
                  <ZAxis type="number" range={[100, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                  <Scatter name="学校" data={dataStratification} fill="#137fec">
                    {dataStratification.map((entry, index) => (
                      <Cell key={index} fill={entry.type === '标杆' || entry.type === '示范' ? '#137fec' : '#233648'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-text-secondary uppercase tracking-widest">教学应用深度 (Depth) →</div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-text-secondary uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">实验完成率 (Completion) →</div>
           </div>
           
           {/* 榜单展示 */}
           <div className="w-1/3 flex flex-col gap-6">
              <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col">
                 <p className="text-[11px] font-bold text-accent-gold mb-3 flex items-center gap-1 uppercase tracking-tighter">
                    <Star size={12} fill="currentColor" /> 标杆学校 TOP 榜
                 </p>
                 <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-3">
                    {dataStratification.filter(s => s.type === '标杆' || s.type === '示范').map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-black/20 rounded border border-white/5">
                         <div className="flex flex-col">
                            <span className="text-xs text-white font-bold truncate max-w-[140px]">{s.name}</span>
                            <span className="text-[9px] text-primary">完成率: {s.y}%</span>
                         </div>
                         <TrendingUp size={14} className="text-accent-green" />
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col">
                 <p className="text-[11px] font-bold text-accent-red mb-3 flex items-center gap-1 uppercase tracking-tighter">
                    <AlertTriangle size={12} fill="currentColor" /> 重点运营/待提升清单
                 </p>
                 <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-3">
                    {dataStratification.filter(s => s.type === '待提升').map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-black/20 rounded border border-white/5">
                         <div className="flex flex-col">
                            <span className="text-xs text-white/70 font-bold truncate max-w-[140px]">{s.name}</span>
                            <span className="text-[9px] text-accent-red">问题: 课程密度过低</span>
                         </div>
                         <ChevronDown size={14} className="text-accent-red" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 模块五 & 模块六 */}
      <div className="grid grid-cols-2 gap-6 h-[400px]">
        {/* 模块五：平台稳定性与教学支撑 */}
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base flex items-center gap-2 text-white">
              <Shield size={20} className="text-accent-green" /> 平台稳定性与支撑能力
            </h3>
            <div className="flex gap-3">
               <div className="text-center">
                  <p className="text-[9px] text-text-secondary uppercase">中断学校</p>
                  <p className="text-sm font-black text-accent-red">0</p>
               </div>
               <div className="text-center">
                  <p className="text-[9px] text-text-secondary uppercase">成功率</p>
                  <p className="text-sm font-black text-accent-green">99.8%</p>
               </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
             <div className="h-2/3">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={dataStabilityTrend}>
                      <defs>
                        <linearGradient id="stabGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0bda5b" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#0bda5b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#233648" vertical={false} />
                      <XAxis dataKey="time" stroke="#233648" fontSize={9} />
                      <YAxis domain={[95, 100]} hide />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="success" name="成功率" stroke="#0bda5b" fill="url(#stabGrad)" strokeWidth={2} />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
             <div className="flex-1 mt-4 grid grid-cols-3 gap-4">
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col justify-center">
                   <p className="text-[9px] text-text-secondary uppercase mb-1">高峰负荷</p>
                   <p className="text-sm font-bold text-white">正常 (42%)</p>
                </div>
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col justify-center">
                   <p className="text-[9px] text-text-secondary uppercase mb-1">环境启动时长</p>
                   <p className="text-sm font-bold text-white">12.5s</p>
                </div>
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col justify-center">
                   <p className="text-[9px] text-text-secondary uppercase mb-1">累计异常节点</p>
                   <p className="text-sm font-bold text-accent-gold">2 个</p>
                </div>
             </div>
          </div>
        </div>

        {/* 模块六：优化分析与运营建议 */}
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base flex items-center gap-2 text-white">
              <MessageSquare size={20} className="text-primary" /> 优化分析与运营建议
            </h3>
            <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold">AI STRATEGY</span>
          </div>
          <div className="flex-1 flex gap-6">
             <div className="w-1/3 flex flex-col gap-4">
                <div className="flex-1">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie data={dataOptimizationReason} innerRadius={25} outerRadius={40} dataKey="value">
                            {dataOptimizationReason.map((e, i) => <Cell key={i} fill={e.color} />)}
                         </Pie>
                      </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-1">
                   {['多实验课程', '高频教学', '跨专业', '活跃节点', '标杆校'].map(t => (
                      <span key={t} className="text-[8px] bg-white/5 text-text-secondary px-1.5 py-0.5 rounded border border-white/10 uppercase font-black">{t}</span>
                   ))}
                </div>
             </div>
             <div className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
                <div className="bg-black/20 p-3 rounded-lg border border-primary/20 relative group overflow-hidden">
                   <div className="absolute left-0 top-0 w-0.5 h-full bg-primary"></div>
                   <p className="text-xs font-bold text-white mb-1">内容丰富度优化</p>
                   <p className="text-[10px] text-text-secondary leading-relaxed">检测到 45% 的私有化节点课程数量低于 5 门，建议针对这部分节点推送“2023秋季实训精选包”。</p>
                   <div className="mt-2 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary"></span>
                      <span className="text-[9px] text-primary font-bold">优先级: 高</span>
                   </div>
                </div>
                <div className="bg-black/20 p-3 rounded-lg border border-accent-gold/20 relative group overflow-hidden">
                   <div className="absolute left-0 top-0 w-0.5 h-full bg-accent-gold"></div>
                   <p className="text-xs font-bold text-white mb-1">教学活跃度引导</p>
                   <p className="text-[10px] text-text-secondary leading-relaxed">标杆学校普遍具有“跨专业使用”特征，建议在其他学校推广“物联网+农业”等跨学科融合实验。</p>
                   <div className="mt-2 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent-gold"></span>
                      <span className="text-[9px] text-accent-gold font-bold">优先级: 中</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabPrivatePlatform;
