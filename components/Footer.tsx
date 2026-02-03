import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="h-8 border-t border-border-dark bg-surface-dark/80 px-8 flex items-center justify-between text-[10px] text-text-secondary backdrop-blur-md relative z-50">
      <div className="flex gap-6">
        <span className="flex items-center gap-1">
          <span className="size-1.5 bg-accent-green rounded-full animate-pulse"></span> 
          系统服务正常
        </span>
        <span>数据同步时间: 2023-11-24 14:30:05</span>
      </div>
      <div className="flex gap-4">
        <span>© 2023 UUSIMA Intelligent Education Technology</span>
        <span className="text-primary font-bold">版本号：20260120v2.6</span>
      </div>
    </footer>
  );
};

export default Footer;