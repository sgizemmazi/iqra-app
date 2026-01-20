import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Compass, Heart, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  { 
    icon: BookOpen, 
    label: 'Öğrenmeye\nDevam Et', 
    path: '/learn',
    color: 'bg-sage-light text-sage' 
  },
  { 
    icon: HelpCircle, 
    label: 'Quiz\nOyna', 
    path: '/quiz',
    color: 'bg-badge-light text-badge' 
  },
  { 
    icon: Heart, 
    label: 'Günlük\nDua', 
    path: '/learn',
    color: 'bg-gold-light text-gold' 
  },
  { 
    icon: Compass, 
    label: 'Kıble\nYönü', 
    path: '/qibla',
    color: 'bg-muted text-navy' 
  },
];

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Hızlı Erişim
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                "group-hover:scale-105 group-active:scale-95 shadow-soft",
                action.color
              )}>
                <Icon className="w-7 h-7" />
              </div>
              <span className="text-xs text-center text-muted-foreground font-medium leading-tight whitespace-pre-line">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
