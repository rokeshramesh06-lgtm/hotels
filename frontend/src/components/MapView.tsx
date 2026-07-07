import React from 'react';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';

interface MapViewProps {
  latitude: number;
  longitude: number;
  restaurants: any[];
}

export const MapView: React.FC<MapViewProps> = ({ latitude, longitude, restaurants }) => {
  return (
    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 mb-4">Google Maps Integration</p>
        <p className="text-sm text-gray-500">
          Your Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </p>
        <p className="text-sm text-gray-500">
          {restaurants.length} restaurants found nearby
        </p>
        <div className="mt-4 text-xs text-gray-400">
          <p>Note: Add Google Maps API key to .env for full functionality</p>
        </div>
      </div>
    </div>
  );
};
