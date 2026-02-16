import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Target, Star, Award } from 'lucide-react';
import { usePersistedGameProgress } from '@/hooks/usePersistedGameProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { activityHistory } = usePersistedGameProgress();
  const { t, language } = useLanguage();

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return t('history.today');
    } else if (date.toDateString() === yesterday.toDateString()) {
      return t('history.yesterday');
    } else {
      return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { 
        day: 'numeric', 
        month: 'long',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz_completed':
        return <Trophy className="w-5 h-5 text-gold" />;
      case 'goal_completed':
        return <Target className="w-5 h-5 text-sage" />;
      case 'level_up':
        return <Star className="w-5 h-5 text-accent" />;
      case 'badge_earned':
        return <Award className="w-5 h-5 text-purple-500" />;
      default:
        return <Star className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'quiz_completed':
        return 'bg-gold-light';
      case 'goal_completed':
        return 'bg-sage-light';
      case 'level_up':
        return 'bg-accent/10 dark:bg-accent/20/30';
      case 'badge_earned':
        return 'bg-purple-100 dark:bg-purple-900/30';
      default:
        return 'bg-muted';
    }
  };

  // Group activities by date
  const groupedHistory = activityHistory.reduce((groups, activity) => {
    const date = activity.timestamp.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, typeof activityHistory>);

  const sortedDates = Object.keys(groupedHistory).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-border/50">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold">{t('history.title')}</h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activityHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{t('history.noActivity')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map(date => (
              <div key={date}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  {formatDate(groupedHistory[date][0].timestamp)}
                </h3>
                <div className="space-y-2">
                  {groupedHistory[date].map((activity, index) => (
                    <div
                      key={activity.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50",
                        "animate-fade-in"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        getActivityBgColor(activity.type)
                      )}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {activity.title}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-right">
                        {activity.xpEarned && (
                          <span className="text-sm font-bold text-gold">
                            +{activity.xpEarned} XP
                          </span>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
