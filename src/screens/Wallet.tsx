import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Coins, TrendingUp, Award, Gift, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Database } from '../lib/database.types';

type Reward = Database['public']['Tables']['rewards']['Row'];
type Transaction = Database['public']['Tables']['coin_transactions']['Row'];

interface WalletProps {
  onBack: () => void;
}

export function Wallet({ onBack }: WalletProps) {
  const { user, profile } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: rewardsData } = await supabase
      .from('rewards')
      .select('*')
      .eq('active', true)
      .order('coin_cost', { ascending: true });

    const { data: transactionsData } = await supabase
      .from('coin_transactions')
      .select('*')
      .eq('user_id', user?.id || '')
      .order('created_at', { ascending: false })
      .limit(10);

    if (rewardsData) setRewards(rewardsData);
    if (transactionsData) setTransactions(transactionsData);
    setLoading(false);
  }

  async function claimReward(reward: Reward) {
    if (!user || !profile) return;

    if (profile.coins_balance < reward.coin_cost) {
      alert('Not enough coins!');
      return;
    }

    const { error: rewardError } = await supabase
      .from('user_rewards')
      .insert({
        user_id: user.id,
        reward_id: reward.id,
      });

    const { error: transactionError } = await supabase
      .from('coin_transactions')
      .insert({
        user_id: user.id,
        amount: -reward.coin_cost,
        transaction_type: 'spend_reward',
        description: `Claimed: ${reward.title}`,
      });

    const newBalance = profile.coins_balance - reward.coin_cost;

    await supabase
      .from('profiles')
      .update({ coins_balance: newBalance })
      .eq('id', user.id);

    if (!rewardError && !transactionError) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedReward(null);
        loadData();
      }, 2500);
    }
  }

  const getLevelProgress = () => {
    const total = profile?.total_coins_earned || 0;
    if (total >= 150) return { next: 'Max Level', progress: 100, target: 150 };
    if (total >= 51) return { next: 'Gold', progress: ((total - 51) / 99) * 100, target: 150 };
    return { next: 'Silver', progress: (total / 51) * 100, target: 51 };
  };

  const levelInfo = getLevelProgress();

  if (showSuccess && selectedReward) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center px-6">
        <Card className="text-center max-w-sm animate-bounce">
          <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Gift className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Reward Claimed!</h2>
          <p className="text-xl text-gray-600 mb-4">{selectedReward.title}</p>
          <p className="text-gray-500">Check your rewards in the app</p>
        </Card>
      </div>
    );
  }

  if (selectedReward) {
    const canAfford = (profile?.coins_balance || 0) >= selectedReward.coin_cost;

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <Header onBack={() => setSelectedReward(null)} title="Claim Reward" />

        <div className="max-w-md mx-auto px-6 py-6">
          <Card className="mb-6">
            <div className="text-6xl mb-6 text-center">
              {selectedReward.category === 'gift' ? '🎁' : selectedReward.category === 'discount' ? '🎟️' : '⭐'}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {selectedReward.title}
            </h2>

            <p className="text-gray-600 text-center mb-6">
              {selectedReward.description}
            </p>

            <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-4 mb-6 text-white text-center">
              <p className="text-sm mb-1">Cost</p>
              <div className="flex items-center justify-center gap-2 text-3xl font-bold">
                <Coins className="w-8 h-8" />
                {selectedReward.coin_cost}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Your Balance</span>
                <div className="flex items-center gap-1 font-bold text-gray-800">
                  <Coins className="w-5 h-5 text-[#FFD700]" />
                  {profile?.coins_balance || 0}
                </div>
              </div>
            </div>

            {canAfford ? (
              <Button
                variant="primary"
                className="w-full"
                onClick={() => claimReward(selectedReward)}
              >
                Claim Reward
              </Button>
            ) : (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-center font-medium">
                Not enough coins
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Header onBack={onBack} title="Green Coin Wallet" />

      <div className="max-w-md mx-auto px-6 py-6">
        <Card className="mb-6 bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/90 mb-1">Total Balance</p>
              <div className="flex items-center gap-2">
                <Coins className="w-10 h-10" />
                <span className="text-4xl font-bold">{profile?.coins_balance || 0}</span>
              </div>
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center">
              <Award className="w-10 h-10" />
            </div>
          </div>

          <div className="bg-white/20 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Level: {profile?.level?.toUpperCase()}</span>
              <span className="text-sm">{profile?.total_coins_earned || 0} / {levelInfo.target}</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${levelInfo.progress}%` }}
              />
            </div>
            <p className="text-xs text-white/80 mt-2">
              {levelInfo.next !== 'Max Level' ? `Next: ${levelInfo.next}` : levelInfo.next}
            </p>
          </div>
        </Card>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Savings</p>
              <p className="text-2xl font-bold text-gray-800">{profile?.monthly_savings || 0}₼</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Rewards</h2>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading rewards...</div>
          ) : (
            <div className="space-y-3">
              {rewards.map(reward => {
                const canAfford = (profile?.coins_balance || 0) >= reward.coin_cost;

                return (
                  <Card
                    key={reward.id}
                    onClick={() => setSelectedReward(reward)}
                    className={!canAfford ? 'opacity-50' : ''}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                        {reward.category === 'gift' ? '🎁' : reward.category === 'discount' ? '🎟️' : '⭐'}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{reward.title}</h3>
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-[#FFD700]" />
                          <span className="font-medium text-gray-700">{reward.coin_cost} Coins</span>
                        </div>
                      </div>

                      <Gift className="w-6 h-6 text-gray-400" />
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>

          {transactions.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-gray-500">No transactions yet</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {transactions.map(transaction => (
                <div
                  key={transaction.id}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.amount > 0 ? (
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{transaction.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
