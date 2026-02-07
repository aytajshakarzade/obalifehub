import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Share2, Copy, Check, Users, Gift } from 'lucide-react';

interface ReferralProps {
  onBack: () => void;
}

interface Referral {
  id: string;
  name: string;
  date: Date;
  status: 'pending' | 'completed';
  reward: number;
}

export function Referral({ onBack }: ReferralProps) {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [copied, setCopied] = useState(false);
  const [referrals] = useState<Referral[]>([
    { id: '1', name: 'Ayshe M.', date: new Date('2026-01-15'), status: 'completed', reward: 5 },
    { id: '2', name: 'Mehdi P.', date: new Date('2026-01-10'), status: 'completed', reward: 5 },
    { id: '3', name: 'Leyla K.', date: new Date('2026-01-05'), status: 'pending', reward: 0 },
  ]);

  const referralCode = profile?.id?.slice(0, 8).toUpperCase() || 'XXXXXXXX';
  const totalEarned = referrals.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.reward, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `Join me on OBA LifeHub and earn coins together! Use my referral code: ${referralCode}`;
    if (navigator.share) {
      navigator.share({
        title: 'OBA LifeHub Referral',
        text: text,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <Header onBack={onBack} title={t('referral.title')} />

      <div className="max-w-md mx-auto px-6 py-6">
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-80">{t('referral.inviteFriends')}</p>
              <p className="text-3xl font-bold mt-2">5 coins</p>
              <p className="text-xs opacity-75 mt-1">per successful invite</p>
            </div>
            <Gift className="w-16 h-16 opacity-50" />
          </div>
        </Card>

        <Card className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-purple-200 dark:border-purple-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('referral.shareCode')}</p>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-3 mb-4">
              <code className="flex-1 font-mono font-bold text-lg text-purple-600 dark:text-purple-400">
                {referralCode}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                className="flex-1 flex items-center justify-center gap-2"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('referral.totalEarned')}</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{totalEarned} coins</p>
            </div>
            <Users className="w-12 h-12 text-green-500 opacity-50" />
          </div>
        </Card>

        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{t('referral.inviteHistory')}</h3>

        <div className="space-y-3">
          {referrals.length === 0 ? (
            <Card className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">No referrals yet. Start sharing!</p>
            </Card>
          ) : (
            referrals.map(referral => (
              <Card key={referral.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      referral.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}>
                      {referral.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{referral.name}</p>
                      <p className="text-xs text-gray-500">
                        {referral.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      referral.status === 'completed' ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
                    }`}>
                      {referral.status === 'completed' ? `+${referral.reward}` : 'Pending'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {referral.status === 'completed' ? 'Earned' : 'coins'}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
