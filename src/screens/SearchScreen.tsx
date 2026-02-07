import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Filter, MapPin, Truck } from 'lucide-react';

interface SearchScreenProps {
  onBack: () => void;
}

const categories = ['All', 'Fresh', 'Bakery', 'Home', 'Kids', 'Premium'];
const deliveryOptions = ['Store pickup', 'Home delivery'];

export function SearchScreen({ onBack }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [availability, setAvailability] = useState('In stock');
  const [selectedDelivery, setSelectedDelivery] = useState('Store pickup');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50">
      <Header onBack={onBack} title="Search" />

      <div className="max-w-md mx-auto px-5 py-6 space-y-5">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, or offers"
            className="w-full bg-white rounded-2xl pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-[#2E8C3B]"
          />
        </div>

        <Card className="bg-white/90 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Filter className="w-4 h-4" />
            Filters
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    activeCategory === category
                      ? 'bg-[#2E8C3B] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-2">Price</p>
              <select className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm">
                <option>All prices</option>
                <option>0₼ - 5₼</option>
                <option>5₼ - 15₼</option>
                <option>15₼+</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Availability</p>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm"
              >
                <option>In stock</option>
                <option>Limited</option>
                <option>Pre-order</option>
              </select>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Delivery options</p>
            <div className="flex gap-2">
              {deliveryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedDelivery(option)}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold ${
                    selectedDelivery === option
                      ? 'bg-[#FFB703] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Select address</p>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 text-sm">
              <MapPin className="w-4 h-4 text-[#2E8C3B]" />
              <span>28 May Street, Baku</span>
            </div>
          </div>

          <Button variant="primary" className="w-full">
            Apply Filters
          </Button>
        </Card>

        <Card className="bg-white/90">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#2E8C3B]" />
            <div>
              <p className="font-semibold text-gray-800">Smart delivery</p>
              <p className="text-sm text-gray-500">
                Results adapt to your role and real-time availability.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
