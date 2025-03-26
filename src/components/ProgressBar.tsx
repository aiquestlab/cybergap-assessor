
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'success' | 'warning' | 'danger';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className,
  showLabel = true,
  size = 'md',
  color = 'default'
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  const colorClasses = {
    default: 'bg-cyber-blue',
    success: 'bg-cyber-green',
    warning: 'bg-cyber-yellow',
    danger: 'bg-cyber-red'
  };
  
  return (
    <div className={cn('w-full', className)}>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            'progress-bar-fill rounded-full', 
            sizeClasses[size], 
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-500 font-medium">{percentage}% Complete</div>
      )}
    </div>
  );
};

export default ProgressBar;
