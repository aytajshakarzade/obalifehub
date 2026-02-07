import { Header } from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { Gamepad2, Users, Coins, MapPin, Award, ShoppingBag, Search, MapPinned, Sparkles } from 'lucide-react';
import { Card } from '../components/Card';

type Screen = 'kids' | 'grandpa' | 'market' | 'search' | 'locations' | 'profile';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { profile } = useAuth();

  const personalizedLabel = profile?.premiumAccess ? 'Premium picks for you' : 'Recommended for you';

  const banners = [
    {
      title: 'Family Savings Week',
      subtitle: 'Up to 40% off daily essentials',
      color: 'from-[#2E8C3B] to-[#4A90E2]',
    },
    {
      title: 'Kids Zone Rewards',
      subtitle: 'Earn badges with every healthy choice',
      color: 'from-[#FFB703] to-[#FB8500]',
    },
    {
      title: 'Grandpa Zone Care',
      subtitle: 'Comfort-first bundles for seniors',
      color: 'from-[#4A90E2] to-[#5774C8]',
    },
  ];

  const discounts = [
    { name: 'Fresh produce', value: '25% OFF' },
    { name: 'Bakery favorites', value: 'Buy 1 Get 1' },
    { name: 'Household care', value: 'Save 15₼' },
  ];

  const promos = [
    { title: 'Smart cart bonus', detail: 'Earn 2x points today' },
    { title: 'Family shared cart', detail: 'Invite members in one tap' },
  ];

  const recommendations = [
    { name: 'Organic milk', tag: profile?.childSafe ? 'Kid-safe' : 'Best seller' },
    { name: 'Premium olive oil', tag: profile?.premiumAccess ? 'Premium' : 'Editor pick' },
    { name: 'Healthy snack box', tag: 'Weekly challenge' },
  ].filter((item) => (profile?.childSafe ? item.tag !== 'Premium' : true));

  const getLevelIcon = () => {
    switch (profile?.level) {
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      default: return '🥉';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header showSearch showNotifications showProfile />

   <div className="w-full max-w-[420px] mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Hello, {profile?.full_name?.split(' ')[0] || 'Friend'} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You saved {profile?.monthly_savings || 0}₼ this month
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FFD700]" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {getLevelIcon()} {profile?.level?.charAt(0).toUpperCase()}{profile?.level?.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#FFD700]" />
            <span className="font-semibold text-gray-800 dark:text-white">
              {profile?.coins_balance || 0} Coins
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2E8C3B]" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">0.8 km</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Interactive Banners</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {banners.map((banner) => (
            <div
              key={banner.title}
              className={`min-w-[240px] bg-gradient-to-r ${banner.color} rounded-2xl p-4 text-white shadow-md`}
            >
              <p className="text-sm uppercase tracking-wide opacity-80">Campaign</p>
              <h3 className="text-lg font-semibold">{banner.title}</h3>
              <p className="text-sm opacity-90">{banner.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card onClick={() => onNavigate('market')} className="cursor-pointer hover:shadow-md transition-all">
            <div className="flex flex-col items-center text-center gap-2">
              <ShoppingBag className="w-8 h-8 text-[#2E8C3B]" />
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Market</p>
            </div>
          </Card>
          <Card onClick={() => onNavigate('search')} className="cursor-pointer hover:shadow-md transition-all">
            <div className="flex flex-col items-center text-center gap-2">
              <Search className="w-8 h-8 text-[#FFB703]" />
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Search</p>
            </div>
          </Card>
          <Card onClick={() => onNavigate('locations')} className="cursor-pointer hover:shadow-md transition-all">
            <div className="flex flex-col items-center text-center gap-2">
              <MapPinned className="w-8 h-8 text-[#4A90E2]" />
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Locations</p>
            </div>
          </Card>
          <Card onClick={() => onNavigate('profile')} className="cursor-pointer hover:shadow-md transition-all">
            <div className="flex flex-col items-center text-center gap-2">
              <Sparkles className="w-8 h-8 text-[#6C63FF]" />
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Profile</p>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 mb-6">
          <Card className="bg-white/90">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Discounts</h3>
              <span className="text-xs text-[#2E8C3B] font-semibold">Live</span>
            </div>
            <div className="space-y-2">
              {discounts.map((deal) => (
                <div key={deal.name} className="flex items-center justify-between text-sm text-gray-600">
                  <span>{deal.name}</span>
                  <span className="font-semibold text-gray-800">{deal.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Kids Zone</h3>
            <p className="text-sm text-gray-600">
              {profile?.kidsEnabled ? 'Active: new learning quests and family games.' : 'Unavailable for your profile.'}
            </p>
            {profile?.kidsEnabled && (
              <button
                onClick={() => onNavigate('kids')}
                className="mt-3 text-sm font-semibold text-[#2E8C3B]"
              >
                Open Kids Zone →
              </button>
            )}
          </Card>

          <Card className="bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Grandpa Zone</h3>
            <p className="text-sm text-gray-600">
              {profile?.grandpaEnabled
                ? 'Active: simplified shopping with bigger text.'
                : 'Only available to parent and senior roles.'}
            </p>
            {profile?.grandpaEnabled && (
              <button
                onClick={() => onNavigate('grandpa')}
                className="mt-3 text-sm font-semibold text-[#2E8C3B]"
              >
                Open Grandpa Zone →
              </button>
            )}
          </Card>
        </div>

        <div className="grid gap-4 mb-6">
          <Card className="bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">News</h3>
            <p className="text-sm text-gray-600">
              OBA LifeHub launches offline mode and faster checkout for every family.
            </p>
          </Card>
          <Card className="bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Campaigns</h3>
            <p className="text-sm text-gray-600">
              Join the Weekly Challenge and win bonus points every Friday.
            </p>
          </Card>
          <Card className="bg-white/90">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Promotions</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              {promos.map((promo) => (
                <li key={promo.title} className="flex items-center justify-between">
                  <span>{promo.title}</span>
                  <span className="text-[#2E8C3B] font-semibold">{promo.detail}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="bg-white/90 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{personalizedLabel}</h3>
          <div className="space-y-2">
            {recommendations.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm text-gray-600">
                <span>{item.name}</span>
                <span className="text-xs font-semibold text-[#FFB703]">{item.tag}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
