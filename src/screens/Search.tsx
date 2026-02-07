import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Search as SearchIcon, Filter } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export function Search({ onBack }: Props) {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onBack={onBack} title="Search Products" />

      <div className="px-4 py-6 space-y-4 max-w-md mx-auto">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, orders..."
            className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#2E8C3B]"
          />
          <button className="p-3 bg-[#FFB703] rounded-xl">
            <Filter />
          </button>
        </div>

        <Card>
          <p className="text-sm text-gray-600">
            Smart filters: category, price, delivery, availability
          </p>
        </Card>

        {query && (
          <Card className="text-sm">
            Showing results for: <b>{query}</b>
          </Card>
        )}
      </div>
    </div>
  );
}
