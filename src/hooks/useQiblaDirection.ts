import { useState, useEffect, useCallback } from 'react';

interface QiblaData {
  qiblaAngle: number;
  compassHeading: number | null;
  combinedAngle: number;
  isLoading: boolean;
  error: string | null;
  hasCompass: boolean;
  locationName: string | null;
}

// Kaaba coordinates
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function calculateQiblaAngle(lat: number, lng: number): number {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
  const kaabaLngRad = (KAABA_LNG * Math.PI) / 180;

  const deltaLng = kaabaLngRad - lngRad;

  const x = Math.sin(deltaLng);
  const y = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(deltaLng);

  let qiblaAngle = (Math.atan2(x, y) * 180) / Math.PI;
  
  // Normalize to 0-360
  qiblaAngle = (qiblaAngle + 360) % 360;

  return qiblaAngle;
}

export function useQiblaDirection(): QiblaData & { requestPermission: () => void } {
  const [qiblaAngle, setQiblaAngle] = useState<number>(0);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasCompass, setHasCompass] = useState(false);
  const [locationName, setLocationName] = useState<string | null>(null);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let heading: number | null = null;

    // iOS
    if ((event as any).webkitCompassHeading !== undefined) {
      heading = (event as any).webkitCompassHeading;
    }
    // Android
    else if (event.alpha !== null) {
      heading = 360 - event.alpha;
    }

    if (heading !== null) {
      setCompassHeading(heading);
      setHasCompass(true);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    // iOS 13+ needs permission request
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setError('Pusula izni reddedildi');
        }
      } catch (err) {
        setError('Pusula izni alınamadı');
      }
    } else {
      // Non-iOS or older iOS
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  }, [handleOrientation]);

  useEffect(() => {
    // Get user location
    if (!navigator.geolocation) {
      setError('Konum servisi desteklenmiyor');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const angle = calculateQiblaAngle(latitude, longitude);
        setQiblaAngle(angle);
        setIsLoading(false);

        // Get location name
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.state;
          const country = data.address?.country;
          setLocationName(city ? `${city}, ${country}` : country || 'Konum alındı');
        } catch {
          setLocationName('Konum alındı');
        }
      },
      (err) => {
        setError('Konum alınamadı. Lütfen konum iznini kontrol edin.');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );

    // Try to add compass listener (will work on non-iOS or older iOS)
    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [handleOrientation, requestPermission]);

  const combinedAngle = compassHeading !== null 
    ? (qiblaAngle - compassHeading + 360) % 360 
    : qiblaAngle;

  return {
    qiblaAngle,
    compassHeading,
    combinedAngle,
    isLoading,
    error,
    hasCompass,
    locationName,
    requestPermission,
  };
}
