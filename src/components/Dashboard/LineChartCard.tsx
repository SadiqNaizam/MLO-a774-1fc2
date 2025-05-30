import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface LineChartDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const lineChartData: LineChartDataPoint[] = [
  { month: 'March', closedWon: 88, closedLost: 65 },
  { month: 'April', closedWon: 65, closedLost: 38 },
  { month: 'May', closedWon: 92, closedLost: 42 },
  { month: 'June', closedWon: 70, closedLost: 10 },
  { month: 'July', closedWon: 85, closedLost: 45 },
  { month: 'August', closedWon: 32, closedLost: 95 },
];

const chartTabs = [
  { id: 'leadsCame', label: 'Leads came' as const },
  { id: 'leadsConverted', label: 'Leads Converted' as const },
  { id: 'totalDeals', label: 'Total deals size' as const },
];

interface LineChartCardProps {
  className?: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<typeof chartTabs[number]['id']>('leadsConverted');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle className="text-lg font-semibold text-primary-text">Leads tracking</CardTitle>
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-text">680</span>
                <span className="text-sm text-secondary-text">total closed</span>
                <span className="text-2xl font-bold text-primary-text ml-2">70</span>
                <span className="text-sm text-secondary-text">total lost</span>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
            <div className="flex space-x-1">
                {chartTabs.map(tab => (
                    <Button 
                        key={tab.id} 
                        variant={activeTab === tab.id ? 'secondary' : 'ghost'} 
                        size="sm"
                        className={cn(
                            'text-xs h-7 px-2',
                            activeTab === tab.id ? 'bg-muted text-primary-text font-semibold' : 'text-secondary-text'
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-secondary-text self-start sm:self-center">
                Last 6 months
                <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={lineChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--secondary-foreground))' }} dy={10} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--secondary-foreground))' }} dx={-10}/>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                labelStyle={{ color: 'hsl(var(--card-foreground))' }}
              />
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent-green))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent-green))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent-red))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent-red))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="closedWon" strokeWidth={2} stroke="hsl(var(--accent-green))" fillOpacity={1} fill="url(#colorClosedWon)" dot={{ r: 4, strokeWidth:2, fill: 'hsl(var(--accent-green))', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth:2, fill: 'hsl(var(--accent-green))', stroke: 'hsl(var(--card))' }} name="Closed Won"/>
              <Area type="monotone" dataKey="closedLost" strokeWidth={2} stroke="hsl(var(--accent-red))" fillOpacity={1} fill="url(#colorClosedLost)" dot={{ r: 4, strokeWidth:2, fill: 'hsl(var(--accent-red))', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth:2, fill: 'hsl(var(--accent-red))', stroke: 'hsl(var(--card))' }} name="Closed Lost"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center text-xs text-secondary-text">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-green mr-2"></div>
                Closed won
            </div>
            <div className="flex items-center text-xs text-secondary-text">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-red mr-2"></div>
                Closed lost
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
