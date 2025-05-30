import React from 'react';
import { cn } from '@/lib/utils';
import FunnelCard from './FunnelCard';
import PieChartCard from './PieChartCard';

interface StatCardGridProps {
  className?: string;
}

const StatCardGrid: React.FC<StatCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
      <FunnelCard />
      <PieChartCard />
    </div>
  );
};

export default StatCardGrid;
