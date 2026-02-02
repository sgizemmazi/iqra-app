import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, HandHeart, HelpCircle, Compass } from 'lucide-react';

interface DeviceCardProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ icon: Icon, label, isActive = false, onToggle, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <motion.div 
      className="device-card cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      <div className="device-card-icon">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
      <div className={`device-toggle ${isActive ? 'active' : ''}`} />
    </motion.div>
  );
};

const DeviceCardsWarm: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [activeDevices, setActiveDevices] = React.useState<Record<string, boolean>>({
    surahs: true,
    duas: false,
    quiz: true,
    qibla: false,
  });

  const devices = [
    { 
      id: 'surahs',
      icon: BookOpen, 
      label: language === 'tr' ? 'Sureler' : 'Surahs', 
      route: '/learn'
    },
    { 
      id: 'duas',
      icon: HandHeart, 
      label: language === 'tr' ? 'Dualar' : 'Duas', 
      route: '/learn'
    },
    { 
      id: 'quiz',
      icon: HelpCircle, 
      label: 'Quiz', 
      route: '/quiz'
    },
    { 
      id: 'qibla',
      icon: Compass, 
      label: language === 'tr' ? 'Kıble' : 'Qibla', 
      route: '/qibla'
    },
  ];

  const toggleDevice = (id: string) => {
    setActiveDevices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCardClick = (route: string, id: string) => {
    toggleDevice(id);
    navigate(route);
  };

  return (
    <div className="px-5 py-4">
      <motion.div 
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {devices.map((device) => (
          <DeviceCard 
            key={device.id}
            icon={device.icon}
            label={device.label}
            isActive={activeDevices[device.id]}
            onClick={() => handleCardClick(device.route, device.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default DeviceCardsWarm;
