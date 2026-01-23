import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  onClose?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onClose }) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'tr' as const, name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  ];

  const handleSelect = (code: 'tr' | 'en') => {
    setLanguage(code);
    onClose?.();
  };

  return (
    <div className="space-y-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleSelect(lang.code)}
          className={cn(
            "w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all",
            language === lang.code
              ? "border-sage bg-sage-light"
              : "border-border bg-card hover:border-sage/50"
          )}
        >
          <span className="text-2xl">{lang.flag}</span>
          <span className="font-medium text-foreground">{lang.name}</span>
          {language === lang.code && (
            <span className="ml-auto text-sage">✓</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
