import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface LocationsProps {
  onBack: () => void;
}

const locations = [
  {
    id: '1',
    name: 'OBA Central',
    address: '28 May Street, Baku',
    distance: '0.8 km',
  },
  {
    id: '2',
    name: 'OBA Green Park',
    address: 'Nizami Street, Baku',
    distance: '1.4 km',
  },
  {
    id: '3',
    name: 'OBA Family Hub',
    address: 'Khatai Avenue, Baku',
    distance: '2.1 km',
  },
];

export function Locations({ onBack }: LocationsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header onBack={onBack} title="Locations" />

      <div className="max-w-md mx-auto px-5 py-6 space-y-5">
        <Card className="bg-white/90">
          <div className="h-40 rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-gray-500">
            Interactive Map Preview
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="primary" className="flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" />
              Navigate
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Open in Maps
            </Button>
          </div>
        </Card>

        <div className="space-y-3">
          {locations.map((location) => (
            <Card key={location.id} className="bg-white/90">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-800">{location.name}</p>
                  <p className="text-sm text-gray-500">{location.address}</p>
                </div>
                <div className="text-sm text-[#2E8C3B] font-semibold">{location.distance}</div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-4 h-4 text-[#2E8C3B]" />
                Google Maps · Waze integration
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
