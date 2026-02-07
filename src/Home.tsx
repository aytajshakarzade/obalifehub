import { useAuth } from '../contexts/AuthContext';
import { Gamepad2, Users, ShoppingCart, Sparkles } from 'lucide-react';

interface Props {
  onNavigate: (screen: any) => void;
}

export function Home({ onNavigate }: Props) {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <div className="pb-24 px-4 pt-6">

      <h1 className="text-2xl font-bold mb-4">
        Hello {profile.full_name?.split(' ')[0]} 👋
      </h1>

      {/* Personalized Blocks */}

      <div className="space-y-4">

        {profile.kidsEnabled && (
          <Block
            title="Kids Zone"
            icon={<Gamepad2 />}
            color="bg-[#FFB703]"
            onClick={() => onNavigate('kids')}
          />
        )}

        {profile.grandpaEnabled && (
          <Block
            title="Grandpa Zone"
            icon={<Users />}
            color="bg-blue-400"
            onClick={() => onNavigate('grandpa')}
          />
        )}

        <Block
          title="Market"
          icon={<ShoppingCart />}
          color="bg-[#2E8C3B]"
          onClick={() => onNavigate('shopping')}
        />

        {profile.premiumAccess && (
          <Block
            title="Premium Picks"
            icon={<Sparkles />}
            color="bg-purple-500"
            onClick={() => alert('Premium coming soon')}
          />
        )}

      </div>
    </div>
  );
}

function Block({ title, icon, color, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`${color} w-full text-white rounded-2xl p-6 flex items-center gap-4 shadow active:scale-95 transition`}
    >
      <div>{icon}</div>
      <span className="text-lg font-semibold">{title}</span>
    </button>
  );
}
