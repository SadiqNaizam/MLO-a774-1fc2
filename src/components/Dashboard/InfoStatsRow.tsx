import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatItem {
  value: string;
  label: string;
  description?: string;
}

const reasonsLostData: StatItem[] = [
  { value: '40%', label: 'The proposal is unclear' },
  { value: '20%', label: 'However venture pursuit' },
  { value: '10%', label: 'Other' },
  { value: '30%', label: 'The proposal is unclear' }, // Duplicated as in image, maybe a typo in source image
];

const otherData: StatItem[] = [
  { value: '900', label: 'total leads count' },
  { value: '12', label: 'days in average to convert lead' },
  { value: '30', label: 'inactive leads', description: 'Leads with no activity in the last 30 days.' },
];

interface InfoCardProps {
  title: string;
  data: StatItem[];
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, data, className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary-text">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-8">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-3xl font-bold text-primary-text">{item.value}</span>
            <div className="flex items-center">
              <span className="text-sm text-secondary-text">{item.label}</span>
              {item.description && (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 ml-1 text-secondary-text cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

interface InfoStatsRowProps {
  className?: string;
}

const InfoStatsRow: React.FC<InfoStatsRowProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      <InfoCard title="Reasons of leads lost" data={reasonsLostData} />
      <InfoCard title="Other data" data={otherData} />
    </div>
  );
};

export default InfoStatsRow;
