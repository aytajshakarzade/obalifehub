import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Apple Juice', price: 2.4, safe: true },
  { id: 2, name: 'Chocolate Bar', price: 1.2, safe: true },
  { id: 3, name: 'Energy Drink', price: 3.5, safe: false },
  { id: 4, name: 'Premium Coffee', price: 12, safe: false },
];

export function ShoppingList({ onBack }: any) {
  const { profile } = useAuth();
  const [cart, setCart] = useState<number[]>([]);

  if (!profile) return null;

  const products = profile.childSafe
    ? MOCK_PRODUCTS.filter(p => p.safe)
    : MOCK_PRODUCTS;

  return (
    <div className="pb-24 px-4 pt-4">

      <button onClick={onBack} className="text-[#2E8C3B] mb-4">
        ← Back
      </button>

      <h2 className="text-xl font-bold mb-4">Market</h2>

      <div className="grid grid-cols-2 gap-3">

        {products.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow p-3 flex flex-col"
          >
            <div className="h-20 bg-gray-100 rounded mb-2" />

            <h3 className="font-semibold">{p.name}</h3>
            <span className="text-sm text-gray-500">{p.price} ₼</span>

            <button
              onClick={() => setCart([...cart, p.id])}
              className="mt-auto bg-[#2E8C3B] text-white rounded-lg py-1 mt-2"
            >
              Add
            </button>
          </div>
        ))}

      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center">
          <div className="bg-[#2E8C3B] text-white px-6 py-3 rounded-full shadow">
            Cart: {cart.length}
          </div>
        </div>
      )}

    </div>
  );
}
