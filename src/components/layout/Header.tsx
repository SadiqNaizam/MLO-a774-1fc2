import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Removed TabsContent as it's not used here
import {
  ChevronDown,
  CalendarDays
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface HeaderProps {
  className?: string;
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ className, pageTitle }) => {
  return (
    <header className={cn(
      'fixed top-0 left-64 right-0 h-16 bg-surface border-b border-border flex items-center justify-between px-6 z-10',
      className
    )}>
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-primary-text">{pageTitle || 'Dashboard'}</h1>
      </div>

      <div className="hidden md:flex flex-grow justify-center">
        {/* Target page is Leads Overview, so 'leads' should be default. PRD image shows 'Leads' active. */}
        <Tabs defaultValue="leads" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>
          {/* TabsContent not needed if tabs are for navigation/visual state only */}
        </Tabs>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-secondary-text">
              <CalendarDays className="h-4 w-4 mr-2" />
              Last 6 months
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem>Last 3 months</DropdownMenuItem>
            <DropdownMenuItem>Last 6 months</DropdownMenuItem>
            <DropdownMenuItem>Last 12 months</DropdownMenuItem>
            <DropdownMenuItem>Custom Range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90 text-primary-foreground'>
              Create
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Company</DropdownMenuItem>
            <DropdownMenuItem>Log Activity</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
