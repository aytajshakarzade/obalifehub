import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { Trophy, Flame, Target, Zap, Award } from 'lucide-react';

interface WeeklyChallengesProps {
  onBack: () => void;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  target: number;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

export function WeeklyChallenges({ onBack }: WeeklyChallengesProps) {
  const { t } = useLanguage();
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Visit 3 Times',
      description: 'Visit an OBA store 3 times this week',
      reward: 10,
      progress: 2,
      target: 3,
      icon: '🏪',
      difficulty: 'easy',
      completed: false,
    },
    {
      id: '2',
      title: 'Complete All Tasks',
      description: 'Finish all Kids Zone activities',
      reward: 15,
      progress: 5,
      target: 8,
      icon: '🎮',
      difficulty: 'medium',
      completed: false,
    },
    {
      id: '3',
      title: 'Spend & Save',
      description: 'Make 5 purchases using Green Coins',
      reward: 20,
      progress: 2,
      target: 5,
      icon: '💰',
      difficulty: 'hard',
      completed: false,
    },
    {
      id: '4',
      title: 'Daily Streak',
      description: 'Log in for 7 consecutive days',
      reward: 25,
      progress: 4,
      target: 7,
      icon: '🔥',
      difficulty: 'medium',
      completed: false,
    },
  ]);

  const totalRewards = challenges.reduce((sum, c) => sum + c.reward, 0);
  const completedChallenges = challenges.filter(c => c.completed).length;
  const inProgressChallenges = challenges.filter(c => !c.completed && c.progress > 0).length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Target className="w-4 h-4" />;
      case 'medium':
        return <Zap className="w-4 h-4" />;
      case 'hard':
        return <Flame className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <Header onBack={onBack} title={t('challenges.title')} />

      <div className="max-w-md mx-auto px-6 py-6">
        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-80">Weekly Rewards</p>
              <p className="text-3xl font-bold">{totalRewards}</p>
              <p className="text-xs opacity-75 mt-1">coins available</p>
            </div>
            <Trophy className="w-16 h-16 opacity-50" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-xs opacity-75">Active</p>
              <p className="text-xl font-bold">{inProgressChallenges}/{challenges.length}</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Completed</p>
              <p className="text-xl font-bold">{completedChallenges}/{challenges.length}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-3 mb-6">
          {challenges.map(challenge => {
            const progressPercent = (challenge.progress / challenge.target) * 100;

            return (
              <Card key={challenge.id}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{challenge.icon}</div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {challenge.title}
                        {challenge.completed && ' ✓'}
                      </h3>
                      <div className="flex items-center gap-1 bg-[#FFD700] text-gray-800 px-2 py-1 rounded-lg text-sm font-bold">
                        <Award className="w-4 h-4" />
                        +{challenge.reward}
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {challenge.description}
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getDifficultyColor(challenge.difficulty)}`}>
                        {getDifficultyIcon(challenge.difficulty)}
                        {challenge.difficulty}
                      </span>
                      {challenge.completed ? (
                        <span className="text-xs font-semibold text-green-600">Completed!</span>
                      ) : (
                        <span className="text-xs text-gray-500">
                          {challenge.target - challenge.progress} to go
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-yellow-500">
          <div className="flex items-start gap-3">
            <Flame className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-800 dark:text-white mb-1">Weekly Bonus!</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Complete all 4 challenges to earn a 50 coin bonus!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
