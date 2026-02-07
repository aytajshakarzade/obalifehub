import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Coins, Wallet, Trophy, QrCode } from 'lucide-react';

interface DigitalCardProps {
  onBack: () => void;
}

export function DigitalCard({ onBack }: DigitalCardProps) {
  const { t } = useLanguage();
  const { profile } = useAuth();

  const cardNumber = profile?.id?.slice(0, 16).toUpperCase() || 'XXXX-XXXX-XXXX-XXXX';
  const displayCardNumber = `${cardNumber.slice(0, 4)}-${cardNumber.slice(4, 8)}-${cardNumber.slice(8, 12)}-${cardNumber.slice(12)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Header onBack={onBack} title={t('card.title')} />

      <div className="max-w-md mx-auto px-6 py-6">
        <div className="relative">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 mb-6 shadow-2xl">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm opacity-80">{t('card.virtualCard')}</p>
                <h3 className="text-2xl font-bold mt-2">OBA LifeHub</h3>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs opacity-75 uppercase tracking-wider">{t('card.cardNumber')}</p>
              <p className="text-2xl font-mono font-bold mt-2 tracking-widest">{displayCardNumber}</p>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs opacity-75">{t('profile.name')}</p>
                <p className="font-semibold capitalize">{profile?.full_name || 'User'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-75">Valid</p>
                <p className="font-semibold">12/26</p>
              </div>
            </div>

            <div className="flex justify-center">
              <QrCode className="w-24 h-24 opacity-50" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="text-center p-4">
            <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{profile?.coins_balance || 0}₼</p>
            <p className="text-xs text-gray-500 mt-1">{t('card.walletBalance')}</p>
          </Card>

          <Card className="text-center p-4">
            <Coins className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{profile?.total_coins_earned || 0}</p>
            <p className="text-xs text-gray-500 mt-1">{t('card.greenCoins')}</p>
          </Card>

          <Card className="text-center p-4">
            <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-800 dark:text-white capitalize">{profile?.level || 'Bronze'}</p>
            <p className="text-xs text-gray-500 mt-1">{t('card.level')}</p>
          </Card>
        </div>

        <div className="space-y-3">
          <Button variant="primary" className="w-full">
            {t('card.addMoney')}
          </Button>
          <Button variant="secondary" className="w-full">
            {t('card.transfer')}
          </Button>
          <Button variant="secondary" className="w-full">
            {t('card.redeem')}
          </Button>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">💡 {t('common.welcome')}!</span> Use your card at any OBA store to earn coins automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
