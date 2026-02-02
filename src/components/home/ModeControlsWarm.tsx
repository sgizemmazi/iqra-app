import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Snowflake, Wind, Droplets, Sun } from 'lucide-react';

interface ModeButtonProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ModeButton: React.FC<ModeButtonProps> = ({ icon: Icon, label, isActive = false, onClick }) => {
  return (
    <motion.button 
      className={`control-btn ${isActive ? 'active' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
};

const ModeControlsWarm: React.FC = () => {
  const { language } = useLanguage();
  const [activeMode, setActiveMode] = React.useState(0);

  const modes = [
    { icon: Snowflake, label: language === 'tr' ? 'Oku' : 'Read' },
    { icon: Wind, label: language === 'tr' ? 'Dinle' : 'Listen' },
    { icon: Droplets, label: language === 'tr' ? 'Ezberle' : 'Memorize' },
    { icon: Sun, label: language === 'tr' ? 'Test' : 'Test' },
  ];

  return (
    <motion.div 
      className="flex justify-center gap-2 mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {modes.map((mode, index) => (
        <ModeButton
          key={mode.label}
          icon={mode.icon}
          label={mode.label}
          isActive={activeMode === index}
          onClick={() => setActiveMode(index)}
        />
      ))}
    </motion.div>
  );
};

export default ModeControlsWarm;
