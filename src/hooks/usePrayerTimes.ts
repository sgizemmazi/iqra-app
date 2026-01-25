import { useState, useEffect } from 'react';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface UsePrayerTimesResult {
  prayerTimes: PrayerTimes | null;
  location: Location | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const DEFAULT_LOCATION: Location = {
  city: 'İstanbul',
  country: 'Türkiye',
  latitude: 41.0082,
  longitude: 28.9784,
};

export function usePrayerTimes(): UsePrayerTimesResult {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      const today = new Date();
      const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=13`
      );
      
      if (!response.ok) throw new Error('API yanıt vermedi');
      
      const data = await response.json();
      const timings = data.data.timings;
      
      setPrayerTimes({
        Fajr: timings.Fajr,
        Sunrise: timings.Sunrise,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      });
    } catch (err) {
      setError('Namaz vakitleri yüklenemedi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocation = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding for city name
          try {
            const geoResponse = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=tr`
            );
            const geoData = await geoResponse.json();
            
            setLocation({
              city: geoData.city || geoData.locality || 'Bilinmeyen',
              country: geoData.countryName || 'Türkiye',
              latitude,
              longitude,
            });
            
            fetchPrayerTimes(latitude, longitude);
          } catch {
            setLocation({ ...DEFAULT_LOCATION, latitude, longitude });
            fetchPrayerTimes(latitude, longitude);
          }
        },
        () => {
          // Geolocation denied, use default
          setLocation(DEFAULT_LOCATION);
          fetchPrayerTimes(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
        },
        { timeout: 5000 }
      );
    } else {
      setLocation(DEFAULT_LOCATION);
      fetchPrayerTimes(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchLocation();
  };

  return { prayerTimes, location, loading, error, refetch };
}

// Helper to calculate next prayer
export function getNextPrayer(times: PrayerTimes | null): { name: string; time: string; timeUntil: string } | null {
  if (!times) return null;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Fajr', time: times.Fajr },
    { name: 'Dhuhr', time: times.Dhuhr },
    { name: 'Asr', time: times.Asr },
    { name: 'Maghrib', time: times.Maghrib },
    { name: 'Isha', time: times.Isha },
  ];

  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;

    if (prayerMinutes > currentMinutes) {
      const diff = prayerMinutes - currentMinutes;
      const h = Math.floor(diff / 60);
      const m = diff % 60;
      const timeUntil = h > 0 ? `${h}s ${m}dk` : `${m}dk`;
      
      return { name: prayer.name, time: prayer.time, timeUntil };
    }
  }

  // If all prayers passed, next is Fajr tomorrow
  const [hours, minutes] = times.Fajr.split(':').map(Number);
  const fajrMinutes = hours * 60 + minutes;
  const diff = (24 * 60 - currentMinutes) + fajrMinutes;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  
  return { name: 'Fajr', time: times.Fajr, timeUntil: `${h}s ${m}dk` };
}

export const prayerNamesTr: Record<string, { tr: string; arabic: string }> = {
  Fajr: { tr: 'İmsak', arabic: 'الفجر' },
  Sunrise: { tr: 'Güneş', arabic: 'الشروق' },
  Dhuhr: { tr: 'Öğle', arabic: 'الظهر' },
  Asr: { tr: 'İkindi', arabic: 'العصر' },
  Maghrib: { tr: 'Akşam', arabic: 'المغرب' },
  Isha: { tr: 'Yatsı', arabic: 'العشاء' },
};
