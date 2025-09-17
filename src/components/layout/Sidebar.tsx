import { Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const location = useLocation();
  const isActive = location.pathname === '/';

  return (
    <aside className="fixed left-0 top-0 h-full w-16 bg-card border-r border-border flex flex-col items-center py-6">
      <Link to="/">
        <div className={cn(
          "w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center transition-colors",
          isActive ? "bg-primary text-primary-foreground" : "bg-background text-primary hover:bg-primary hover:text-primary-foreground"
        )}>
          <Home size={20} />
        </div>
      </Link>
    </aside>
  );
};