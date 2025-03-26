
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Shield, ShieldCheck } from 'lucide-react';

interface LevelCardProps {
  level: 1 | 2;
  title: string;
  description: string;
  controlCount: number;
  isRecommended?: boolean;
}

const LevelCard: React.FC<LevelCardProps> = ({
  level,
  title,
  description,
  controlCount,
  isRecommended = false
}) => {
  return (
    <Link
      to={`/assessment/${level}`}
      className={cn(
        'flex flex-col p-8 rounded-2xl transition-all duration-500',
        'glass-card hover:shadow-xl transform hover:-translate-y-1 btn-hover-effect',
        'border border-gray-200 relative overflow-hidden',
        isRecommended ? 'ring-2 ring-cyber-blue' : ''
      )}
    >
      {isRecommended && (
        <div className="absolute -right-12 top-6 bg-cyber-blue text-white py-1 px-10 rotate-45 text-sm font-medium">
          Recommended
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <div className={cn(
          'rounded-full p-3 mr-4',
          level === 1 ? 'bg-cyber-blue/10 text-cyber-blue' : 'bg-cyber-navy/10 text-cyber-navy'
        )}>
          {level === 1 ? (
            <Shield size={24} />
          ) : (
            <ShieldCheck size={24} />
          )}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="text-sm font-medium text-gray-500">{controlCount} Controls</span>
        <span className="inline-flex items-center justify-center rounded-full bg-cyber-blue/10 text-cyber-blue px-3 py-1 text-sm font-medium">
          Level {level}
        </span>
      </div>
    </Link>
  );
};

const LevelSelector: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
      <LevelCard
        level={1}
        title="CMMC Level 1"
        description="Basic safeguarding for Federal Contract Information (FCI). Essential cybersecurity practices focused on protecting sensitive information."
        controlCount={17}
        isRecommended={true}
      />
      
      <LevelCard
        level={2}
        title="CMMC Level 2"
        description="Protection of Controlled Unclassified Information (CUI). Includes enhanced security measures, documented processes, and formal policy implementation."
        controlCount={110}
      />
    </div>
  );
};

export default LevelSelector;
