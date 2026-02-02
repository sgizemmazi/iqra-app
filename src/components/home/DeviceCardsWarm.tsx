import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Wind, Tv, Speaker } from 'lucide-react';

interface DeviceCardProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onToggle?: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ icon: Icon, label, isActive = false, onToggle }) => {
  return (
    <motion.div 
      className="device-card cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
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
  const [devices, setDevices] = React.useState([
    { icon: Lightbulb, label: language === 'tr' ? 'Sureler' : 'Surahs', isActive: true },
    { icon: Wind, label: language === 'tr' ? 'Dualar' : 'Duas', isActive: false },
    { icon: Tv, label: 'Quiz', isActive: true },
    { icon: Speaker, label: language === 'tr' ? 'Kıble' : 'Qibla', isActive: false },
  ]);

  const toggleDevice = (index: number) => {
    setDevices(prev => prev.map((d, i) => 
      i === index ? { ...d, isActive: !d.isActive } : d
    ));
  };

  return (
    <div className="px-5 py-4">
      <motion.div 
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {devices.map((device, index) => (
          <DeviceCard 
            key={device.label}
            icon={device.icon}
            label={device.label}
            isActive={device.isActive}
            onToggle={() => toggleDevice(index)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default DeviceCardsWarm;
