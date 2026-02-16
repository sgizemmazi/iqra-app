import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Compass, Heart, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const actions = [
  { 
    icon: BookOpen, 
    label: 'Öğren', 
    sublabel: 'Sure & Dua',
    path: '/learn',
    gradient: 'from-primary to-primary/80'
  },
  { 
    icon: HelpCircle, 
    label: 'Quiz', 
    sublabel: 'Bilgini Test Et',
    path: '/quiz',
    gradient: 'from-badge to-badge/80'
  },
  { 
    icon: Heart, 
    label: 'Dualar', 
    sublabel: 'Günlük Dualar',
    path: '/learn',
    gradient: 'from-accent to-accent/80'
  },
  { 
    icon: Compass, 
    label: 'Kıble', 
    sublabel: 'Yön Bul',
    path: '/qibla',
    gradient: 'from-xp to-xp/80'
  },
];

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Hızlı Erişim
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="floating-card p-4 flex items-center gap-4 text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                action.gradient
              )}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.sublabel}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
