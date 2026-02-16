import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useQiblaDirection } from '@/hooks/useQiblaDirection';
import { MapPin, Compass, Navigation, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const QiblaPage: React.FC = () => {
  const { 
    qiblaAngle, 
    compassHeading, 
    combinedAngle, 
    isLoading, 
    error, 
    hasCompass, 
    locationName,
    requestPermission 
  } = useQiblaDirection();

  if (isLoading) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary mb-6"
          />
          <p className="text-lg text-muted-foreground">Konum alınıyor...</p>
        </div>
      </MobileLayout>
    );
  }

  if (error) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Konum Hatası</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Tekrar Dene
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="px-6 pt-8 pb-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Kıble Pusulası</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{locationName || 'Konum alınıyor...'}</span>
          </div>
        </div>

        {/* Compass Container */}
        <div className="relative flex items-center justify-center my-8">
          {/* Outer Ring */}
          <div className="absolute w-72 h-72 rounded-full border-2 border-border/50" />
          
          {/* Compass Background */}
          <motion.div
            className="relative w-64 h-64 rounded-full bg-gradient-to-br from-card to-muted/50 flex items-center justify-center"
            style={{
              rotate: hasCompass && compassHeading !== null ? -compassHeading : 0
            }}
            animate={{
              rotate: hasCompass && compassHeading !== null ? -compassHeading : 0
            }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >
            {/* Cardinal Directions */}
            <div className="absolute inset-0">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-foreground">N</span>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium text-muted-foreground">S</span>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">W</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">E</span>
            </div>

            {/* Degree Markers */}
            {[...Array(36)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${i * 10}deg)` }}
              >
                <div 
                  className={`absolute top-2 left-1/2 -translate-x-1/2 ${
                    i % 9 === 0 ? 'w-0.5 h-4 bg-foreground' : 'w-px h-2 bg-border'
                  }`}
                />
              </div>
            ))}

            {/* Qibla Direction Indicator */}
            <motion.div
              className="absolute w-full h-full"
              style={{ rotate: qiblaAngle }}
              animate={{ rotate: qiblaAngle }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs text-primary-foreground font-arabic">🕋</span>
                  </div>
                  <div className="w-1 h-24 bg-gradient-to-b from-primary to-transparent rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Center Circle */}
            <div className="w-20 h-20 rounded-full bg-card flex flex-col items-center justify-center z-10">
              <Compass className="w-6 h-6 text-primary mb-1" />
              <span className="text-xs text-muted-foreground">Kıble</span>
            </div>
          </motion.div>

          {/* North Indicator (Fixed) */}
          {hasCompass && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <Navigation className="w-6 h-6 text-destructive fill-destructive" />
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="floating-card p-4 text-center">
            <p className="text-2xl font-bold text-primary">{Math.round(qiblaAngle)}°</p>
            <p className="text-xs text-muted-foreground mt-1">Kıble Açısı</p>
          </div>
          <div className="floating-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {compassHeading !== null ? `${Math.round(compassHeading)}°` : '—'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Pusula Yönü</p>
          </div>
        </div>

        {/* Compass Permission Button (iOS) */}
        {!hasCompass && (
          <Button 
            onClick={requestPermission}
            className="w-full gap-2"
            size="lg"
          >
            <Compass className="w-5 h-5" />
            Pusulayı Etkinleştir
          </Button>
        )}

        {/* Instructions */}
        <div className="glass-card rounded-2xl p-4 mt-4">
          <h3 className="font-semibold text-foreground mb-2">Nasıl Kullanılır?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Telefonunuzu düz bir şekilde tutun</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Kabe simgesini takip ederek yönünüzü belirleyin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Yeşil işaret yukarıyı gösterdiğinde Kıble yönündesiniz</span>
            </li>
          </ul>
        </div>
      </div>
    </MobileLayout>
  );
};

export default QiblaPage;
