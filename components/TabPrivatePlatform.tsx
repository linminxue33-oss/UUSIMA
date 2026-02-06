import React, { useState, useEffect } from 'react';
import { 
  Shield, Server, Cpu, HardDrive, ShieldCheck, 
  Activity, Globe, Lock, AlertCircle, CheckCircle2,
  Database, Share2, Zap, Wifi, Filter, Calendar, 
  ChevronDown, TrendingUp, TrendingDown, Users, 
  BookOpen, Target, Flag, Info, MessageSquare, 
  AlertTriangle, Star, BarChart3, PieChart as PieChartIcon, 
  LayoutDashboard, Search, Send, ArrowRightCircle
} from 'lucide-react';
import { 
  AreaChart, Area, ResponsiveContainer, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis, Legend,
  ComposedChart, ReferenceLine
} from 'recharts';

// --- Mock Data ---

// KPI Data
const dataKPI = [
  { label: '私有化部署学校', value: 42, unit: '所', trend: '+2' },
  { label: '当前活跃学校', value: 38, unit: '所', trend: '90.5%', isRate: true },
  { label: '学校活跃率', value: 90.5, unit: '%', trend: '+1.2%' },
];

// Activity Trend Data
const dataActivityTrend = [
  { name: '7月', value: 22 }, 
  { name: '8月', value: 18 }, 
  { name: '9月', value: 32 },
  { name: '10月', value: 35 }, 
  { name: '11月', value: 38 }, 
  { name: '12月', value: 37 },
];

const dataActivityDist = [
  { name: '高活跃', value: 12, color: '#137fec' },
  { name: '中活跃', value: 18, color: '#137fec88' },
  { name: '低活跃', value: 8, color: '#233648' },
];

// Stratification Data
const dataStratification = [
  // 标杆 (High X, High Y)
  { x: 95, y: 92, name: '深圳职业技术大学', type: '标杆' },
  { x: 92, y: 88, name: '金华职业技术学院', type: '标杆' },
  { x: 88, y: 95, name: '广东轻工职业技术学院', type: '标杆' },
  { x: 85, y: 82, name: '北京电子科技职业学院', type: '标杆' },
  { x: 90, y: 85, name: '天津市职业大学', type: '标杆' },
  
  // 示范 (High X, High Y, slightly lower)
  { x: 82, y: 78, name: '南京工业职业技术大学', type: '示范' },
  { x: 78, y: 85, name: '无锡职业技术学院', type: '示范' },
  { x: 75, y: 80, name: '陕西工业职业技术学院', type: '示范' },
  { x: 80, y: 75, name: '重庆电子工程职业学院', type: '示范' },
  { x: 72, y: 88, name: '山东商业职业技术学院', type: '示范' },
  { x: 76, y: 72, name: '黄河水利职业技术学院', type: '示范' },
  { x: 85, y: 70, name: '江苏农林职业技术学院', type: '示范' },
  { x: 70, y: 82, name: '宁波职业技术学院', type: '示范' },

  // 潜力 (High X, Low Y)
  { x: 85, y: 45, name: '芜湖职业技术学院', type: '潜力' },
  { x: 80, y: 35, name: '常州信息职业技术学院', type: '潜力' },
  { x: 75, y: 40, name: '四川工程职业技术学院', type: '潜力' },
  { x: 78, y: 25, name: '日照职业技术学院', type: '潜力' },
  { x: 82, y: 30, name: '长沙民政职业技术学院', type: '潜力' },
  { x: 70, y: 45, name: '杨凌职业技术学院', type: '潜力' },
  { x: 72, y: 20, name: '南宁职业技术学院', type: '潜力' },
  { x: 88, y: 38, name: '福建船政交通职业学院', type: '潜力' },
  { x: 68, y: 42, name: '哈尔滨职业技术学院', type: '潜力' },

  // 待提升 - High Completion, Low Depth (Low X, High Y)
  { x: 35, y: 85, name: '新疆农业职业技术学院', type: '待提升' },
  { x: 40, y: 90, name: '长春职业技术学院', type: '待提升' },
  { x: 25, y: 80, name: '武汉职业技术学院', type: '待提升' },
  { x: 30, y: 75, name: '昆明冶金高等专科学校', type: '待提升' },
  { x: 45, y: 70, name: '柳州铁道职业技术学院', type: '待提升' },
  
  // 待提升 - Low X, Low Y
  { x: 20, y: 25, name: '西部某技师学院', type: '待提升' },
  { x: 15, y: 30, name: '北部山区职业学校', type: '待提升' },
  { x: 25, y: 15, name: '城市建设技术学校', type: '待提升' },
  { x: 35, y: 35, name: '商贸旅游职业学校', type: '待提升' },
  { x: 10, y: 20, name: '机电工程学校', type: '待提升' },
  { x: 40, y: 40, name: '信息工程技术学校', type: '待提升' },
  { x: 30, y: 10, name: '现代制造技工学校', type: '待提升' },
  { x: 45, y: 25, name: '交通运输职业学校', type: '待提升' },
  { x: 22, y: 45, name: '艺术设计职业学校', type: '待提升' },
  { x: 18, y: 38, name: '卫生健康职业学院', type: '待提升' },
  { x: 28, y: 28, name: '幼儿师范高等专科', type: '待提升' },
  { x: 32, y: 18, name: '体育运动职业学院', type: '待提升' },
  { x: 42, y: 12, name: '政法职业学院', type: '待提升' },
  { x: 12, y: 42, name: '财税金融职业学院', type: '待提升' },
  { x: 38, y: 22, name: '对外贸易职业学院', type: '待提升' },
];

// --- Sub-components ---

// General Tooltip for Bar, Line, Pie, Area charts
const GeneralTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-dark border border-border-dark p-2 rounded shadow-xl text-xs z-50">
        <p className="font-bold mb-1 text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color || entry.fill || '#fff' }}>
            {entry.name}: {entry.value.toLocaleString()}
            {entry.unit ? entry.unit : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Specific Tooltip for Scatter Chart
const ScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    // payload[0].payload contains the data point object {x, y, name, type}
    const data = payload[0].payload;
    return (
      <div className="bg-surface-dark border border-border-dark p-2 rounded shadow-xl text-xs z-50">
        <p className="font-bold mb-1 text-white">{data.name}</p>
        <p style={{ color: '#137fec' }}>教学深度: {data.x}%</p>
        <p style={{ color: '#facc15' }}>完成率: {data.y}%</p>
        <p className="text-text-secondary mt-1">{data.type}</p>
      </div>
    );
  }
  return null;
};

const TabPrivatePlatform: React.FC = () => {
  const [filterType, setFilterType] = useState('全部学校类型');
  const [reachedSchools, setReachedSchools] = useState<string[]>([]);

  const handleReach = (schoolName: string) => {
    if (!reachedSchools.includes(schoolName)) {
      setReachedSchools([...reachedSchools, schoolName]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-6 animate-in fade-in duration-500">
      
      {/* 全局筛选区 */}
      <div className="flex items-center justify-between bg-surface-dark border border-border-dark p-3 rounded-xl shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Flag size={16} className="text-accent-gold" />
            <select 
              className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer"
              onChange={(e) => setFilterType(e.target.value)}
              value={filterType}
            >
              <option value="全部学校类型">全部学校类型</option>
              <option value="高职院校">高职</option>
              <option value="中职院校">中职</option>
              <option value="本科院校">本科</option>
              <option value="双高院校">双高</option>
            </select>
          </div>
          <div className="w-px h-4 bg-border-dark"></div>
          <div className="flex items-center gap-2 px-2">
             <span className="text-xs text-text-secondary font-medium">筛选结果：<span className="text-primary font-bold">{filterType}</span></span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Global Live Filters</span>
          <div className="size-2 rounded-full bg-accent-green animate-pulse"></div>
        </div>
      </div>

      {/* 模块一：私有化部署总体态势 (KPIs) */}
      <div className="grid grid-cols-12 gap-6 h-32 shrink-0">
        <div className="col-span-12 bg-surface-dark border border-border-dark rounded-xl p-0 flex relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
          
          {/* KPIs */}
          <div className="flex-1 flex">
            {dataKPI.map((item, i) => (
              <div key={i} className="flex flex-col justify-center items-center px-4 flex-1 border-r border-border-dark/30 last:border-0">
                <p className="text-[11px] text-text-secondary mb-1 font-bold uppercase tracking-tight">{item.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white chart-glow font-sans tabular-nums">{item.value}</span>
                  <span className="text-xs text-text-secondary font-bold">{item.unit}</span>
                </div>
                <div className={`mt-1 flex items-center gap-1 text-[10px] font-bold ${item.trend.includes('+') || item.isRate ? 'text-accent-green' : 'text-text-secondary'}`}>
                  {item.trend.includes('+') && <TrendingUp size={12} />}
                  {item.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 模块二：学校分层与对比分析 (Moved to 2nd Content Row) */}
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col h-[850px] shrink-0">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-base flex items-center gap-2 text-white">
              <Target size={20} className="text-primary" /> 学校分层与对比分析
           </h3>
           <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                 <div className="size-2 rounded-full bg-primary shadow-[0_0_5px_#137fec]"></div> 标杆/示范
              </div>
              <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                 <div className="size-2 rounded-full bg-accent-green shadow-[0_0_5px_#0bda5b]"></div> 潜力
              </div>
              <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                 <div className="size-2 rounded-full bg-white/20"></div> 待提升
              </div>
           </div>
        </div>
        <div className="flex-1 flex gap-8">
           {/* 矩阵图 */}
           <div className="flex-1 bg-black/20 rounded-xl relative border border-white/5 overflow-hidden p-8">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                 <div className="border-r border-b border-white/10 flex items-start p-4"><span className="text-[10px] text-primary font-bold uppercase tracking-widest">示范学校</span></div>
                 <div className="border-b border-white/10 flex items-start justify-end p-4"><span className="text-[10px] text-accent-gold font-bold uppercase tracking-widest">标杆学校</span></div>
                 <div className="border-r border-white/10 flex items-end p-4"><span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">待提升学校</span></div>
                 <div className="flex items-end justify-end p-4"><span className="text-[10px] text-accent-green font-bold uppercase tracking-widest">潜力学校</span></div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="x" name="教学深度" unit="%" domain={[0, 100]} hide />
                  <YAxis type="number" dataKey="y" name="完成率" unit="%" domain={[0, 100]} hide />
                  <ZAxis type="number" range={[60, 150]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ScatterTooltip />} />
                  <Scatter name="学校" data={dataStratification} fill="#137fec">
                    {dataStratification.map((entry, index) => {
                      let color = '#64748b'; // Lighter Slate for "To be improved"
                      if (entry.type === '标杆') color = '#facc15';
                      else if (entry.type === '示范') color = '#137fec';
                      else if (entry.type === '潜力') color = '#0bda5b';
                      return <Cell key={index} fill={color} />;
                    })}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/60 uppercase tracking-widest font-medium">教学应用深度 (Depth) →</div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-white/60 uppercase tracking-widest font-medium [writing-mode:vertical-lr] rotate-180">实验完成率 (Completion) →</div>
           </div>
           
           {/* 榜单展示 */}
           <div className="w-1/3 flex flex-col gap-6">
              <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col">
                 <p className="text-[11px] font-bold text-accent-gold mb-3 flex items-center gap-1 uppercase tracking-tighter">
                    <Star size={12} fill="currentColor" /> 标杆学校 TOP 榜
                 </p>
                 <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-3">
                    {dataStratification.filter(s => s.type === '标杆' || s.type === '示范').slice(0, 6).map((s, i) => (
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
                    {dataStratification.filter(s => s.type === '待提升').slice(0, 6).map((s, i) => {
                      const isReached = reachedSchools.includes(s.name);
                      return (
                      <div key={i} className="flex items-center justify-between p-2 bg-black/20 rounded border border-white/5 hover:border-accent-red/30 transition-colors group">
                         <div className="flex flex-col">
                            <span className="text-xs text-white/70 font-bold truncate max-w-[120px]">{s.name}</span>
                            <span className="text-[9px] text-accent-red">问题: 活跃度低</span>
                         </div>
                         <button 
                            onClick={() => handleReach(s.name)}
                            disabled={isReached}
                            className={`px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1 transition-all ${isReached ? 'bg-accent-green/20 text-accent-green cursor-default' : 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30'}`}
                         >
                            {isReached ? (
                              <>
                                <CheckCircle2 size={10} /> 已生成策略
                              </>
                            ) : (
                              <>
                                <Send size={10} /> 一键触达
                              </>
                            )}
                         </button>
                      </div>
                    )})}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 模块三：Bottom Row (Activity + Optimization) */}
      <div className="grid grid-cols-2 gap-6 h-[420px] shrink-0">
        
        {/* Module: 学校使用活跃度 */}
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base flex items-center gap-2 text-white">
              <Users size={20} className="text-primary" /> 学校使用活跃度分析
            </h3>
          </div>
          <div className="flex-1 flex gap-6">
            <div className="flex-1 flex flex-col gap-4">
              <div className="h-1/2 bg-black/20 rounded-lg p-2">
                <p className="text-[10px] text-text-secondary mb-2 font-bold uppercase">活跃分布 / 数量趋势 (月度)</p>
                <ResponsiveContainer width="100%" height="100%">
                   <ComposedChart data={dataActivityTrend}>
                      <XAxis dataKey="name" stroke="#233648" fontSize={10} tickLine={false} />
                      <YAxis hide />
                      <Tooltip content={<GeneralTooltip />} />
                      <Bar dataKey="value" name="活跃度" fill="#137fec" radius={[2, 2, 0, 0]} barSize={20} />
                      <Line type="monotone" dataKey="value" name="趋势" stroke="#facc15" strokeWidth={2} dot={{ r: 3 }} />
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
                      {[
                        { name: '某某试点职业学院', last: '1周前' },
                        { name: '东南经贸技术学院', last: '1月前' },
                        { name: '西北工业联合学校', last: '1月前' }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="py-3 text-white">{row.name}</td>
                          <td className="py-3 text-center text-text-secondary">{row.last}</td>
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

        {/* Module: 优化分析与运营建议 */}
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base flex items-center gap-2 text-white">
              <MessageSquare size={20} className="text-primary" /> 优化分析与运营建议
            </h3>
            <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold">AI STRATEGY</span>
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
  );
};

export default TabPrivatePlatform;