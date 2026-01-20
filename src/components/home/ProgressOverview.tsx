import React from 'react';
import { BookOpen, Clock } from 'lucide-react';

const ProgressOverview: React.FC = () => {
  return (
    <div className="px-6 pb-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Your Journey
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Memorization Progress */}
        <div className="bg-card rounded-2xl p-4 border border-border/50 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-sage" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">3</p>
          <p className="text-sm text-muted-foreground">Surahs learned</p>
          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-sage rounded-full transition-all duration-500"
              style={{ width: '15%' }}
            />
          </div>
        </div>

        {/* Time Spent */}
        <div className="bg-card rounded-2xl p-4 border border-border/50 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold-light flex items-center justify-center">
              <Clock className="w-5 h-5 text-gold" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">45m</p>
          <p className="text-sm text-muted-foreground">This week</p>
          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold rounded-full transition-all duration-500"
              style={{ width: '65%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
