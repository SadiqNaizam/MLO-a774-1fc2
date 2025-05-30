import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UsersRound,
  FileText,
  Receipt,
  Archive,
  Mail,
  Package,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
        isActive
          ? 'bg-primary/10 text-primary dark:bg-primary dark:text-primary-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'group'
      )}
    >
      <Icon className={cn('h-5 w-5 mr-3', isActive ? 'text-primary dark:text-primary-foreground' : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground')} />
      {label}
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<string>('Dashboard');

  const navItems = [
    { href: '#', icon: LayoutGrid, label: 'Dashboard' as const },
    { href: '#', icon: Users, label: 'Leads' as const },
    { href: '#', icon: UsersRound, label: 'Customers' as const },
    { href: '#', icon: FileText, label: 'Proposals' as const },
    { href: '#', icon: Receipt, label: 'Invoices' as const },
    { href: '#', icon: Archive, label: 'Items' as const },
    { href: '#', icon: Mail, label: 'Mail' as const },
    { href: '#', icon: Package, label: 'Shoebox' as const },
    { href: '#', icon: CalendarDays, label: 'Calendar' as const },
  ];

  const footerNavItems = [
    { href: '#', icon: HelpCircle, label: 'Help' as const },
    { href: '#', icon: Settings, label: 'Settings' as const },
  ];

  return (
    <aside className={cn('fixed top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col z-20', className)}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
        <div className="flex items-center">
          <div className="bg-primary text-primary-foreground h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg">
            B
          </div>
          <span className="ml-3 text-xl font-semibold text-primary-text">CRM</span>
        </div>
        {/* Placeholder for mobile menu toggle, if needed in future */}
        {/* <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button> */}
      </div>
      <nav className="flex-grow px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.label}
            onClick={() => setActiveItem(item.label)}
          />
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-sidebar-border space-y-1">
        {footerNavItems.map((item) => (
          <NavItem
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.label} // Example: allow active state for footer items too
            onClick={() => setActiveItem(item.label)}
          />
        ))}
      </div>
    </aside>
  );
};

export default SidebarNav;
