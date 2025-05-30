import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Alternative for a simpler progress bar
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string; // Tailwind color class e.g., 'bg-red-500'
  percentage: number; // For segmented progress bar width
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-red-500', percentage: 200/600 * 100 },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-yellow-500', percentage: 100/600 * 100 },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, time: 'average time on this stage', color: 'bg-indigo-700', percentage: 50/600 * 100 },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-green-500', percentage: 20/600 * 100 },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-600', percentage: 20/600 * 100 },
];

const totalActiveLeads = 600;

interface FunnelCardProps {
  className?: string;
}

const FunnelCard: React.FC<FunnelCardProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary-text">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold text-primary-text">{totalActiveLeads}</span>
          <span className="ml-2 text-sm text-secondary-text">active leads</span>
        </div>

        <TooltipProvider>
          <div className="flex w-full h-3 rounded-full overflow-hidden mb-6 bg-muted">
            {funnelData.map((stage) => (
                <Tooltip key={stage.id}>
                    <TooltipTrigger asChild>
                        <div 
                            className={cn('h-full', stage.color)}
                            style={{ width: `${(stage.count / totalActiveLeads) * 100}%` }}
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{stage.name}: {stage.count} leads</p>
                    </TooltipContent>
                </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        <div className="space-y-3">
          {funnelData.map((stage) => (
            <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn('w-3 h-3 rounded-sm', stage.color)} />
              <span className="text-primary-text whitespace-nowrap truncate">{stage.name}</span>
              <span className="text-secondary-text justify-self-end">{stage.count}</span>
              <span className="text-secondary-text justify-self-end w-16 text-right">$ {stage.value}</span>
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <span className={cn(
                            "text-secondary-text justify-self-end w-20 text-right",
                            stage.id === 'inConversation' ? 'bg-gray-800 text-white px-2 py-0.5 rounded text-xs' : ''
                        )}>
                            {stage.time}
                        </span>
                    </TooltipTrigger>
                    {stage.id === 'inConversation' && (
                        <TooltipContent side="top" align="center">
                            <p>Average time on this stage</p>
                        </TooltipContent>
                    )}
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelCard;
