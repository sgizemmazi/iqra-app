import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Compass, Heart, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const actions = [
  { 
    icon: BookOpen, 
    label: 'Öğren', 
    sublabel: 'Sure & Dua',
    path: '/learn',
    gradient: 'from-primary to-sage-dark',
    shadowColor: 'hsla(175, 65%, 35%, 0.3)'
  },
  { 
    icon: HelpCircle, 
    label: 'Quiz', 
    sublabel: 'Bilgini Test Et',
    path: '/quiz',
    gradient: 'from-badge to-purple-700',
    shadowColor: 'hsla(270, 65%, 55%, 0.3)'
  },
  { 
    icon: Heart, 
    label: 'Dualar', 
    sublabel: 'Günlük Dualar',
    path: '/learn',
    gradient: 'from-accent to-orange-600',
    shadowColor: 'hsla(15, 85%, 55%, 0.3)'
  },
  { 
    icon: Compass, 
    label: 'Kıble', 
    sublabel: 'Yön Bul',
    path: '/qibla',
    gradient: 'from-xp to-blue-600',
    shadowColor: 'hsla(200, 80%, 50%, 0.3)'
  },
];

const QuickActionsFloating: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="px-6 py-6">
      {/* Section header with floating badge */}
      <motion.div 
        className="flex items-center gap-3 mb-5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="floating-badge bg-primary/10 text-primary border-primary/20">
          ✨ Hızlı Erişim
        </span>
      </motion.div>

      {/* Actions grid with 3D effect */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="floating-card-3d p-5 flex flex-col items-start gap-4 text-left group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                rotateX: -5,
                rotateY: 5,
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                boxShadow: `var(--shadow-md), 0 8px 24px -8px ${action.shadowColor}`
              }}
            >
              {/* Icon with gradient background */}
              <motion.div 
                className={cn(
                  "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center",
                  action.gradient
                )}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: `0 8px 20px -6px ${action.shadowColor}`
                }}
              >
                <Icon className="w-7 h-7 text-white" />
              </motion.div>
              
              {/* Labels */}
              <div>
                <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {action.label}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {action.sublabel}
                </p>
              </div>

              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 rounded-[var(--radius)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 animate-shimmer" />
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default QuickActionsFloating;
