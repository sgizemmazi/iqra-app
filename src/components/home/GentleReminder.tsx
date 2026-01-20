import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GentleReminder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 pb-6">
      <div className="bg-sage-light rounded-3xl p-5 border border-sage/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sage/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-sage" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">
              A gentle moment?
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Would you like to spend 2 minutes reviewing Surah Al-Fatiha today?
            </p>
            <div className="flex gap-3 mt-4">
              <Button
                variant="sage"
                size="sm"
                onClick={() => navigate('/learn/surah/1')}
                className="rounded-xl"
              >
                Yes, let's go
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground rounded-xl"
              >
                Maybe later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GentleReminder;
