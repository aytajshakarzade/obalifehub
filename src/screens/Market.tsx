import { useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import {
  ShoppingCart,
  LayoutGrid,
  List,
  Columns2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface MarketProps {
  onBack: () => void;
}

type ViewMode = 'grid' | 'list' | 'compact';

const categories = ['All', 'Fresh', 'Bakery', 'Home', 'Kids', 'Premium'];

const products = [
  { id: '1', name: 'Organic Apples', category: 'Fresh', price: 3.4, premium: false, childSafe: true },
  { id: '2', name: 'Whole Wheat Bread', category: 'Bakery', price: 2.2, premium: false, childSafe: true },
  { id: '3', name: 'Premium Olive Oil', category: 'Premium', price: 12.8, premium: true, childSafe: true },
  { id: '4', name: 'Family Detergent Pack', category: 'Home', price: 8.5, premium: false, childSafe: false },
  { id: '5', name: 'Kids Snack Box', category: 'Kids', price: 4.9, premium: false, childSafe: true },
  { id: '6', name: 'Senior Care Tea', category: 'Premium', price: 6.4, premium: true, childSafe: true },
];

export function Market({ onBack }: MarketProps) {
  const { profile } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [compactColumns, setCompactColumns] = useState<1 | 2 | 3>(2);
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeCategory !== 'All' && product.category !== activeCategory) {
        return false;
      }
      if (profile?.childSafe && !product.childSafe) {
        return false;
      }
      return true;
    });
  }, [activeCategory, profile?.childSafe]);

  const compactGridClass =
    compactColumns === 1 ? 'grid-cols-1' : compactColumns === 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Header onBack={onBack} title="Market" />

      <div className="max-w-md mx-auto px-5 py-6 space-y-6">
        {profile?.premiumAccess && (
          <Card className="bg-gradient-to-r from-[#2E8C3B] to-[#4A90E2] text-white">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <div>
                <p className="text-sm opacity-90">Premium Recommendations</p>
                <p className="text-lg font-semibold">Exclusive deals for seniors</p>
              </div>
            </div>
          </Card>
        )}

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-[#2E8C3B] text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#2E8C3B] text-white' : 'bg-white text-gray-500'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#2E8C3B] text-white' : 'bg-white text-gray-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-2 rounded-lg ${viewMode === 'compact' ? 'bg-[#2E8C3B] text-white' : 'bg-white text-gray-500'}`}
            >
              <Columns2 className="w-4 h-4" />
            </button>
          </div>

          {viewMode === 'compact' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompactColumns(1)}
                className={`p-2 rounded-lg ${compactColumns === 1 ? 'bg-[#FFB703] text-white' : 'bg-white text-gray-500'}`}
              >
                1
              </button>
              <button
                onClick={() => setCompactColumns(2)}
                className={`p-2 rounded-lg ${compactColumns === 2 ? 'bg-[#FFB703] text-white' : 'bg-white text-gray-500'}`}
              >
                2
              </button>
              <button
                onClick={() => setCompactColumns(3)}
                className={`p-2 rounded-lg ${compactColumns === 3 ? 'bg-[#FFB703] text-white' : 'bg-white text-gray-500'}`}
              >
                3
              </button>
            </div>
          )}
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  {product.premium && (
                    <span className="text-xs text-[#FFB703] font-semibold">Premium</span>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{product.price.toFixed(2)}₼</p>
                  <Button
                    variant="primary"
                    className="mt-2 px-3 py-1 text-xs"
                    onClick={() => setCartCount((count) => count + 1)}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className={`grid gap-3 ${viewMode === 'compact' ? compactGridClass : 'grid-cols-2'}`}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col gap-2">
                <div className="h-20 bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">{product.price.toFixed(2)}₼</p>
                  <button
                    onClick={() => setCartCount((count) => count + 1)}
                    className="text-xs font-semibold text-[#2E8C3B]"
                  >
                    Add
                  </button>
                </div>
                {product.premium && (
                  <span className="text-[10px] font-semibold text-[#FFB703] uppercase tracking-wide">
                    Premium
                  </span>
                )}
              </Card>
            ))}
          </div>
        )}

        <Card className="bg-white/90">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cart items</p>
              <p className="text-2xl font-semibold text-gray-800">{cartCount}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-[#2E8C3B]" />
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p className="font-semibold text-gray-800">Checkout</p>
            <p>Apple Pay · Card · Wallet</p>
            <Button variant="primary" className="w-full mt-2">
              Proceed to Payment
            </Button>
          </div>
        </Card>

        <Card className="bg-white/90">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2E8C3B]" />
            <div>
              <p className="font-semibold text-gray-800">Order Tracking</p>
              <p className="text-sm text-gray-500">Track delivery and pickup status in real time.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
