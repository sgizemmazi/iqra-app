import React from 'react';
import { ChevronRight, Bell, Moon, Globe, Volume2, Info, Heart, LogOut } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface SettingItem {
  icon: React.ElementType;
  label: string;
  description?: string;
  type: 'link' | 'toggle';
  value?: boolean;
}

const settingsGroups = [
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', description: 'Prayer reminders & daily tips', type: 'toggle' as const, value: true },
      { icon: Volume2, label: 'Audio Settings', description: 'Reciter, speed & repeat', type: 'link' as const },
      { icon: Globe, label: 'Language', description: 'English', type: 'link' as const },
      { icon: Moon, label: 'Dark Mode', description: 'Easy on the eyes', type: 'toggle' as const, value: false },
    ]
  },
  {
    title: 'About',
    items: [
      { icon: Heart, label: 'Rate the App', type: 'link' as const },
      { icon: Info, label: 'About & Credits', type: 'link' as const },
    ]
  }
];

const ProfilePage: React.FC = () => {
  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header with Avatar */}
        <div className="px-6 pt-8 pb-6 text-center">
          <div className="w-24 h-24 rounded-full bg-sage-light mx-auto mb-4 flex items-center justify-center">
            <span className="font-arabic text-3xl text-sage">م</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome</h1>
          <p className="text-muted-foreground mt-1">May your journey be blessed</p>
        </div>

        {/* Stats Summary */}
        <div className="px-6 mb-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-2xl p-4 text-center border border-border/50">
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground mt-1">Surahs</p>
            </div>
            <div className="bg-card rounded-2xl p-4 text-center border border-border/50">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground mt-1">Days</p>
            </div>
            <div className="bg-card rounded-2xl p-4 text-center border border-border/50">
              <p className="text-2xl font-bold text-foreground">2h</p>
              <p className="text-xs text-muted-foreground mt-1">Total Time</p>
            </div>
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <div key={group.title} className="px-6 mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {group.title}
            </h3>
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              {group.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={cn(
                      "w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left",
                      index !== group.items.length - 1 && "border-b border-border/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    </div>
                    {item.type === 'toggle' ? (
                      <Switch checked={item.value} />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Version */}
        <div className="px-6 pb-8 text-center">
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Made with ❤️ for the Ummah</p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ProfilePage;
