import React from 'react';
import { X, Database, FileText } from 'lucide-react';
import { Tab } from '../types';

interface DataMappingOverlayProps {
  onClose: () => void;
  activeTab: Tab;
}

const DataMappingOverlay: React.FC<DataMappingOverlayProps> = ({ onClose, activeTab }) => {
  const teachingData = [
    { chart: '用户访问趋势', dimension: '时间 (24小时)', metrics: '内部用户数, 院校用户数', desc: '展示不同用户群体全天访问流量' },
    { chart: '实验使用趋势', dimension: '月份 (1-12月)', metrics: '浏览人数, 使用时长', desc: '年度实验热度与投入时间分析' },
    { chart: '地区使用分布', dimension: '省份/直辖市', metrics: '学校数, 用户数, 在线时长, 总时长', desc: '地理维度的用户活跃度统计' },
    { chart: '院校类型分布', dimension: '院校类型 (中职/高职/本科)', metrics: '占比, 覆盖数量', desc: '接入院校的办学层次构成' },
    { chart: '平台使用类型分布', dimension: '使用场景 (竞赛/教学/培训)', metrics: '占比', desc: '平台主要应用场景分布' },
    { chart: '专业方向使用占比', dimension: '专业名称', metrics: '课程数, 学习人数', desc: '各学科方向的资源投入与受众规模' },
    { chart: '实验使用时长占比', dimension: '实验项目名称', metrics: '总时长 (小时)', desc: '最耗时/最热门的实验项目排行' },
    { chart: '课程使用情况分析', dimension: '课程名称', metrics: '关联实验, 时长, 浏览/学习人数, 增长率', desc: '课程维度的详细运营数据' },
  ];

  const aiData = [
    { chart: '实时 AI 监控', dimension: '实时时间 (秒级)', metrics: '在线人数, 交互数量', desc: '当前系统的并发负载与活跃度' },
    { chart: '每日 AI 使用趋势', dimension: '日期 (近30天)', metrics: '使用总量', desc: 'AI 功能的月度增长趋势' },
    { chart: '机构 AI 使用热力分布', dimension: '机构/实验室位置', metrics: '活跃度等级 (低/中/高)', desc: '物理空间上的 AI 使用强度' },
    { chart: '学校 AI 问答使用 TOP10', dimension: '学校名称', metrics: '问答总数', desc: '全平台 AI 使用最活跃的院校排行' },
    { chart: '技能助手使用情况', dimension: '助手类型 (通用/专业)', metrics: '使用量, 问答数', desc: '不同垂类 AI 助手的受欢迎程度' },
  ];

  const currentData = activeTab === Tab.ANALYSIS ? teachingData : aiData;

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-h-[80vh] bg-surface-dark border border-border-dark rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-dark bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              <Database size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">可视化图表数据映射表</h2>
              <p className="text-xs text-text-secondary">
                当前视图: <span className="text-primary font-bold">{activeTab === Tab.ANALYSIS ? '云平台分析' : 'AI 学伴分析'}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-dark text-xs text-text-secondary uppercase tracking-wider">
                <th className="pb-3 pl-4 font-medium w-1/4">可视化图表名称</th>
                <th className="pb-3 font-medium w-1/4">数据维度 (Dimension)</th>
                <th className="pb-3 font-medium w-1/4">关键指标 (Metrics)</th>
                <th className="pb-3 font-medium w-1/4">数据说明</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentData.map((row, index) => (
                <tr key={index} className="border-b border-border-dark/30 hover:bg-white/5 transition-colors group">
                  <td className="py-4 pl-4 font-medium text-white flex items-center gap-2">
                    <FileText size={14} className="text-primary opacity-50 group-hover:opacity-100" />
                    {row.chart}
                  </td>
                  <td className="py-4 text-text-secondary font-mono text-xs">{row.dimension}</td>
                  <td className="py-4 text-accent-gold font-mono text-xs">{row.metrics}</td>
                  <td className="py-4 text-text-secondary text-xs">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-dark flex justify-end">
           <button 
             onClick={onClose}
             className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary/90 transition-colors"
           >
             关闭
           </button>
        </div>
      </div>
    </>
  );
};

export default DataMappingOverlay;