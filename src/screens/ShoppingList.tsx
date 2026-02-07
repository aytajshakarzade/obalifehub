import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { ShoppingCart, Plus, Trash2, Bell, Share2 } from 'lucide-react';

interface ShoppingListProps {
  onBack: () => void;
}

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  checked: boolean;
}

export function ShoppingList({ onBack }: ShoppingListProps) {
  const { t } = useLanguage();
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: '1', name: 'Milk', quantity: 2, checked: false },
    { id: '2', name: 'Bread', quantity: 1, checked: true },
    { id: '3', name: 'Cheese', quantity: 3, checked: false },
    { id: '4', name: 'Eggs', quantity: 1, checked: false },
  ]);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          name: newItem,
          quantity: 1,
          checked: false,
        },
      ]);
      setNewItem('');
    }
  };

  const handleToggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const uncheckedCount = items.filter(i => !i.checked).length;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <Header onBack={onBack} title={t('shopping.title')} />

      <div className="max-w-md mx-auto px-6 py-6">
        <Card className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Items</p>
              <p className="text-3xl font-bold">{totalItems}</p>
            </div>
            <ShoppingCart className="w-16 h-16 opacity-50" />
          </div>
          <div className="mt-4 flex gap-2">
            <div className="flex-1">
              <p className="text-xs opacity-75">To Buy</p>
              <p className="font-bold">{uncheckedCount}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs opacity-75">Completed</p>
              <p className="font-bold">{items.length - uncheckedCount}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleAddItem()}
              placeholder={t('shopping.addItem')}
              className="flex-1 bg-white dark:bg-gray-800 border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
            />
            <Button
              variant="primary"
              className="px-4"
              onClick={handleAddItem}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{t('shopping.myList')}</h3>

          {items.length === 0 ? (
            <Card className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">{t('shopping.noItems')}</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {items.map(item => (
                <Card
                  key={item.id}
                  className={item.checked ? 'opacity-60' : ''}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggleItem(item.id)}
                      className="w-5 h-5 rounded cursor-pointer accent-green-500"
                    />
                    <div className="flex-1">
                      <p className={`font-semibold ${item.checked ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'}`}>
                        {item.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-semibold text-gray-700 dark:text-gray-300">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Button variant="primary" className="w-full flex items-center justify-center gap-2">
            <Bell className="w-5 h-5" />
            {t('shopping.alerts')}
          </Button>
          <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            {t('shopping.share')}
          </Button>
        </div>
      </div>
    </div>
  );
}
