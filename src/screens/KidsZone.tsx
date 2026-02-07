import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Award, Clock, Coins, Trophy, Star } from 'lucide-react';
import { Database } from '../lib/database.types';

type Activity = Database['public']['Tables']['activities']['Row'];
type UserActivity = Database['public']['Tables']['user_activities']['Row'];

interface KidsZoneProps {
  onBack: () => void;
}

export function KidsZone({ onBack }: KidsZoneProps) {
  const { user, profile } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    const { data: activitiesData } = await supabase
      .from('activities')
      .select('*')
      .eq('active', true)
      .order('difficulty', { ascending: true });

    const { data: userActivitiesData } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', user?.id || '');

    if (activitiesData) setActivities(activitiesData);
    if (userActivitiesData) setUserActivities(userActivitiesData);
    setLoading(false);
  }

  async function completeActivity(activity: Activity) {
    if (!user) return;

    const { error: activityError } = await supabase
      .from('user_activities')
      .upsert({
        user_id: user.id,
        activity_id: activity.id,
        completed: true,
        progress: 100,
        completed_at: new Date().toISOString(),
      });

    const { error: transactionError } = await supabase
      .from('coin_transactions')
      .insert({
        user_id: user.id,
        amount: activity.coin_reward,
        transaction_type: 'earn_activity',
        description: `Completed: ${activity.title}`,
      });

    const newBalance = (profile?.coins_balance || 0) + activity.coin_reward;
    const newTotal = (profile?.total_coins_earned || 0) + activity.coin_reward;

    await supabase
      .from('profiles')
      .update({
        coins_balance: newBalance,
        total_coins_earned: newTotal,
      })
      .eq('id', user.id);

    if (!activityError && !transactionError) {
      setShowReward(true);
      setTimeout(() => {
        setShowReward(false);
        setSelectedActivity(null);
        loadActivities();
      }, 3000);
    }
  }

  const getUserProgress = (activityId: string) => {
    return userActivities.find(ua => ua.activity_id === activityId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'explorer': return 'bg-blue-100 text-blue-700';
      case 'champion': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const completedCount = userActivities.filter(ua => ua.completed).length;
  const totalCount = activities.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (showReward && selectedActivity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center px-6">
        <Card className="text-center max-w-sm animate-bounce">
          <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Great Job!</h2>
          <p className="text-xl text-gray-600 mb-6">You earned</p>
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-[#FFD700]">
            <Coins className="w-8 h-8" />
            +{selectedActivity.coin_reward}
          </div>
        </Card>
      </div>
    );
  }

  if (selectedActivity) {
    const userProgress = getUserProgress(selectedActivity.id);
    const isCompleted = userProgress?.completed;

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <Header onBack={() => setSelectedActivity(null)} title={selectedActivity.title} />

        <div className="max-w-md mx-auto px-6 py-6">
          <Card className="mb-6">
            <div className="text-6xl mb-6 text-center">
              {selectedActivity.category === 'game' ? '🎮' : selectedActivity.category === 'learning' ? '📚' : '🏆'}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {selectedActivity.title}
            </h2>

            <p className="text-gray-600 text-center mb-6">
              {selectedActivity.description}
            </p>

            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="flex items-center gap-1 text-[#FFD700] mb-1">
                  <Coins className="w-5 h-5" />
                  <span className="font-bold">+{selectedActivity.coin_reward}</span>
                </div>
                <p className="text-xs text-gray-500">Reward</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-700 mb-1">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold">5 min</span>
                </div>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
            </div>

            {isCompleted ? (
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-center font-medium">
                ✓ Completed
              </div>
            ) : (
              <Button
                variant="primary"
                className="w-full"
                onClick={() => completeActivity(selectedActivity)}
              >
                Start Activity
              </Button>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Header onBack={onBack} title="Kids Zone" />

      <div className="max-w-md mx-auto px-6 py-6">
        <Card className="mb-6 bg-gradient-to-r from-[#FFB703] to-[#FF9500] text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-1">Level Progress</h3>
              <p className="text-white/90">Keep learning and growing!</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Star className="w-8 h-8" />
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>{completedCount} completed</span>
              <span>{totalCount} total</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </Card>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Activities</h2>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading activities...</div>
          ) : (
            <div className="space-y-3">
              {activities.map(activity => {
                const userProgress = getUserProgress(activity.id);
                const isCompleted = userProgress?.completed;

                return (
                  <Card
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity)}
                    className={isCompleted ? 'opacity-60' : ''}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#FFB703] to-[#FF9500] rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                        {activity.category === 'game' ? '🎮' : activity.category === 'learning' ? '📚' : '🏆'}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {activity.title}
                          {isCompleted && ' ✓'}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(activity.difficulty)}`}>
                            {activity.difficulty}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Coins className="w-4 h-4 text-[#FFD700]" />
                            +{activity.coin_reward}
                          </span>
                        </div>
                      </div>

                      <Award className="w-6 h-6 text-gray-400" />
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
