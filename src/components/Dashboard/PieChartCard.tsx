import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceData {
  name: string;
  value: number;
  percentage: number;
  color: string; // Tailwind fill color e.g. 'fill-red-500'
}

const pieChartData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: 'hsl(var(--accent-red))' }, // Using CSS var for color
  { name: 'Behance', value: 1000, percentage: 40, color: 'hsl(var(--accent-yellow))' },
  { name: 'Instagram', value: 1000, percentage: 10, color: 'hsl(var(--accent-green))' }, // A bit darker green
  { name: 'Dribbble', value: 1000, percentage: 10, color: 'hsl(130 50% 60%)' }, // Custom light green
];

// Calculate total for percentages in Recharts if needed, here we use given percentages
const totalValue = pieChartData.reduce((sum, item) => sum + item.value, 0);

interface PieChartCardProps {
  className?: string;
}

const PieChartCard: React.FC<PieChartCardProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-primary-text">Sources</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs text-secondary-text">
          Last 6 months
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <RechartsTooltip 
                  formatter={(value: number, name: string, props: {payload: SourceData}) => [`$${value}`, name]}
                />
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50} // For donut shape
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="hsl(var(--card))" // Border color same as card background for separation
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {pieChartData.map((source) => (
              <div key={source.name} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-2 text-sm">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: source.color }} />
                <span className="text-primary-text whitespace-nowrap truncate">{source.name}</span>
                <span className="text-secondary-text justify-self-end">$ {source.value}</span>
                <span className="text-secondary-text justify-self-end w-10 text-right">{source.percentage}%</span>
              </div>
            ))}
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <Button variant="link" className="p-0 h-auto text-xs text-secondary-text">
                            from leads total
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                        <p>Percentage of total leads from this source.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
