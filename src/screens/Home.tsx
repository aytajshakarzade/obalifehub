import { Header } from '../components/Header';
import { ModuleCard } from '../components/ModuleCard';
import { useAuth } from '../contexts/AuthContext';
import { Gamepad2, Users, Coins } from 'lucide-react';

type Screen = 'kids' | 'grandpa' | 'wallet';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header showProfile />

      <div className="px-4 py-6 max-w-[420px] mx-auto">

        <h1 className="text-2xl font-bold mb-4">
          Salam, {profile?.full_name || 'İstifadəçi'} 👋
        </h1>

        {/* DEBUG — silə bilərsən */}
        <pre className="text-xs bg-black text-white p-2 rounded mb-4">
          {JSON.stringify(profile, null, 2)}
        </pre>

        <div className="space-y-4">

          {/* Kids Zone */}
          {profile?.kidsEnabled && (
            <ModuleCard
              icon={Gamepad2}
              title="Kids Zone"
              subtitle="Uşaq üçün təhlükəsiz zona"
              color="bg-[#FFB703]"
              onClick={() => onNavigate('kids')}
            />
          )}

          {/* Grandpa Mode */}
          {profile?.grandpaEnabled && (
            <ModuleCard
              icon={Users}
              title="Grandpa Mode"
              subtitle="Sadələşdirilmiş rejim"
              color="bg-[#4A90E2]"
              onClick={() => onNavigate('grandpa')}
            />
          )}

          {/* Green Coin — HAMIDA */}
          <ModuleCard
            icon={Coins}
            title="Green Coin"
            subtitle="Bonus və mükafatlar"
            color="bg-[#2E8C3B]"
            onClick={() => onNavigate('wallet')}
          />

        </div>
      </div>
    </div>
  );
}
