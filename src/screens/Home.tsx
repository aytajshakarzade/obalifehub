import { Header } from '../components/Header';
import { ModuleCard } from '../components/ModuleCard';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import {
  Gamepad2,
  Users,
  Coins,
  ShoppingCart,
  Gift,
  Star,
  Sparkles,
} from 'lucide-react';

type Screen = 'kids' | 'grandpa' | 'wallet' | 'shopping';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      <Header showProfile />

      <div className="px-4 py-6 max-w-[420px] mx-auto space-y-6">

        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Salam, {profile?.full_name?.split(' ')[0] || 'Dost'} 👋
          </h1>
          <p className="text-gray-600 text-sm">
            OBA LifeHub — ailə üçün ağıllı alış-veriş platforması
          </p>
        </div>

        {/* Big Promo Banner */}
        <div className="bg-gradient-to-r from-[#2E8C3B] to-[#FFB703] text-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles />
            <h2 className="text-lg font-bold">
              Daha çox qənaət et
            </h2>
          </div>

          <p className="text-white/90 text-sm mb-3">
            Marketdən alış et, Green Coin qazan və mükafat əldə et
          </p>

          <button className="bg-white text-[#2E8C3B] px-4 py-2 rounded-xl text-sm font-semibold">
            Kampaniyaları gör
          </button>
        </div>

        {/* Feature Modules */}
        <div className="space-y-4">

          {/* Kids Zone */}
          {profile?.kidsEnabled && (
            <ModuleCard
              icon={Gamepad2}
              title="Kids Zone"
              subtitle="Uşaqlar üçün oyun və öyrənmə zonası"
              color="bg-[#FFB703]"
              onClick={() => onNavigate('kids')}
            />
          )}

          {/* Grandpa Mode — yalnız senior */}
          {profile?.grandpaEnabled && (
            <ModuleCard
              icon={Users}
              title="Grandpa Mode"
              subtitle="Sadələşdirilmiş və rahat interfeys"
              color="bg-[#4A90E2]"
              onClick={() => onNavigate('grandpa')}
            />
          )}

          {/* Green Coin — HAMIDA */}
          <ModuleCard
            icon={Coins}
            title="Green Coin"
            subtitle="Bonus, cashback və mükafat sistemi"
            color="bg-[#2E8C3B]"
            onClick={() => onNavigate('wallet')}
          />

        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Tez giriş
          </h3>

          <div className="grid grid-cols-3 gap-3">

            <Card onClick={() => onNavigate('shopping')} className="cursor-pointer hover:scale-[1.02] transition">
              <div className="flex flex-col items-center gap-2 py-3">
                <ShoppingCart className="text-green-600" />
                <span className="text-xs font-medium">Market</span>
              </div>
            </Card>

            <Card className="hover:scale-[1.02] transition">
              <div className="flex flex-col items-center gap-2 py-3">
                <Gift className="text-orange-500" />
                <span className="text-xs font-medium">Hədiyyələr</span>
              </div>
            </Card>

            <Card className="hover:scale-[1.02] transition">
              <div className="flex flex-col items-center gap-2 py-3">
                <Star className="text-yellow-500" />
                <span className="text-xs font-medium">VIP</span>
              </div>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}
