import { Header } from '../components/Header';
import { ModuleCard } from '../components/ModuleCard';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import {
  Gamepad2,
  Users,
  Coins,
  MapPin,
  Award,
  CreditCard,
  Settings,
  ShoppingCart,
  Zap,
  Share2,
} from 'lucide-react';

type Screen =
  | 'kids'
  | 'grandpa'
  | 'wallet'
  | 'card'
  | 'shopping'
  | 'challenges'
  | 'referral'
  | 'settings'
  | 'profile';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { profile } = useAuth();
  if (!profile) return null;

  const getLevelIcon = () => {
    switch (profile.level) {
      case 'gold':
        return '🥇';
      case 'silver':
        return '🥈';
      default:
        return '🥉';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header showSearch showNotifications showProfile />

      <div className="w-full max-w-[420px] mx-auto px-4 py-6">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Salam, {profile.full_name?.split(' ')[0] || 'Dost'} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bu ay {profile.monthly_savings || 0}₼ qənaət etmisən
          </p>
        </div>

        {/* Status Bar */}
        <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FFD700]" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {getLevelIcon()} {profile.level?.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#FFD700]" />
            <span className="font-semibold text-gray-800 dark:text-white">
              {profile.coins_balance || 0} Coins
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2E8C3B]" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              0.8 km
            </span>
          </div>
        </div>

        {/* MAIN MODULES */}
        <div className="space-y-4 mb-6">
          {/* Parent → Kids Zone */}
          {profile.kidsEnabled && (
            <ModuleCard
              icon={Gamepad2}
              title="Kids Zone"
              subtitle="Learn & Earn"
              color="bg-[#FFB703]"
              onClick={() => onNavigate('kids')}
            />
          )}

          {/* Senior → Grandpa Mode */}
          {profile.grandpaEnabled && (
            <ModuleCard
              icon={Users}
              title="Grandpa Mode"
              subtitle="Easy Access"
              color="bg-[#4A90E2]"
              onClick={() => onNavigate('grandpa')}
            />
          )}

          {/* Everyone except Senior */}
          {!profile.grandpaEnabled && (
            <ModuleCard
              icon={Coins}
              title="Green Coin"
              subtitle="Your Rewards"
              color="bg-[#FFD700]"
              onClick={() => onNavigate('wallet')}
            />
          )}
        </div>

        {/* QUICK ACCESS */}
        {!profile.grandpaEnabled && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Quick Access
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card
                onClick={() => onNavigate('card')}
                className="cursor-pointer hover:shadow-md transition"
              >
                <div className="flex flex-col items-center gap-2">
                  <CreditCard className="w-8 h-8 text-blue-500" />
                  <p className="text-sm font-semibold">My Card</p>
                </div>
              </Card>

              <Card
                onClick={() => onNavigate('shopping')}
                className="cursor-pointer hover:shadow-md transition"
              >
                <div className="flex flex-col items-center gap-2">
                  <ShoppingCart className="w-8 h-8 text-green-500" />
                  <p className="text-sm font-semibold">Shopping</p>
                </div>
              </Card>

              <Card
                onClick={() => onNavigate('challenges')}
                className="cursor-pointer hover:shadow-md transition"
              >
                <div className="flex flex-col items-center gap-2">
                  <Zap className="w-8 h-8 text-orange-500" />
                  <p className="text-sm font-semibold">Challenges</p>
                </div>
              </Card>

              <Card
                onClick={() => onNavigate('referral')}
                className="cursor-pointer hover:shadow-md transition"
              >
                <div className="flex flex-col items-center gap-2">
                  <Share2 className="w-8 h-8 text-purple-500" />
                  <p className="text-sm font-semibold">Invite</p>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* PROMO */}
        {!profile.grandpaEnabled && (
          <div className="bg-gradient-to-r from-[#2E8C3B] to-[#4A90E2] rounded-3xl p-6 text-white shadow-xl mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Market deyil — LifeHub
            </h3>
            <p className="text-white/90 text-sm mb-4">
              Ailə üçün alış, motivasiya və idarəetmə bir yerdə
            </p>
            <button className="bg-white text-[#2E8C3B] px-6 py-2 rounded-xl font-medium">
              Kəşf et
            </button>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('profile')}
            className="flex-1 bg-white dark:bg-gray-800 rounded-xl py-2 font-medium"
          >
            Profil
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="flex-1 bg-white dark:bg-gray-800 rounded-xl py-2 font-medium flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
