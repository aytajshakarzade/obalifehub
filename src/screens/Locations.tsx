import { Header } from '../components/Header';
import { MapPin, Navigation } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const stores = [
  { id: 1, name: 'OBA Nizami', address: 'Nizami st. 45' },
  { id: 2, name: 'OBA Yasamal', address: 'Yasamal district' },
];

export function Locations({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onBack={onBack} title="Stores Near You" />

      <div className="px-4 py-6 space-y-3 max-w-md mx-auto">
        {stores.map(store => (
          <div
            key={store.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{store.name}</p>
              <p className="text-sm text-gray-500">{store.address}</p>
            </div>
            <a
              href={`https://www.google.com/maps/search/${store.name}`}
              target="_blank"
              className="p-2 bg-[#2E8C3B] text-white rounded-lg"
            >
              <Navigation />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
