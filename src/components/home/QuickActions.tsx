import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Compass, Heart, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  { 
    icon: BookOpen, 
    label: 'Continue\nLearning', 
    path: '/learn',
    color: 'bg-sage-light text-sage' 
  },
  { 
    icon: Compass, 
    label: 'Qibla\nDirection', 
    path: '/qibla',
    color: 'bg-gold-light text-gold' 
  },
  { 
    icon: Heart, 
    label: 'Daily\nDua', 
    path: '/duas',
    color: 'bg-muted text-navy' 
  },
  { 
    icon: Headphones, 
    label: 'Listen\nQuran', 
    path: '/listen',
    color: 'bg-sage-light text-accent' 
  },
];

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Quick Actions
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
