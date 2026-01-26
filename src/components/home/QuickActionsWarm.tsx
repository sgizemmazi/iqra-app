import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Compass, Heart, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const QuickActionsWarm: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const actions = [
    { 
      icon: BookOpen, 
      label: language === 'tr' ? 'Sureler' : 'Surahs',
      path: '/learn',
    },
    { 
      icon: Heart, 
      label: language === 'tr' ? 'Dualar' : 'Duas',
      path: '/learn',
    },
    { 
      icon: HelpCircle, 
      label: 'Quiz',
      path: '/quiz',
    },
    { 
      icon: Compass, 
      label: language === 'tr' ? 'Kıble' : 'Qibla',
      path: '/qibla',
    },
  ];

  return (
    <div className="px-5 py-4">
      <motion.div 
        className="grid grid-cols-4 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 py-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-14 h-14 rounded-2xl icon-box flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default QuickActionsWarm;
