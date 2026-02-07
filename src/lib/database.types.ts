export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'parent' | 'child' | 'senior'
          family_id: string
          avatar_url: string | null
          coins_balance: number
          level: 'bronze' | 'silver' | 'gold'
          total_coins_earned: number
          monthly_savings: number
          preferred_language: string
          accessibility_mode: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'parent' | 'child' | 'senior'
          family_id: string
          avatar_url?: string | null
          coins_balance?: number
          level?: 'bronze' | 'silver' | 'gold'
          total_coins_earned?: number
          monthly_savings?: number
          preferred_language?: string
          accessibility_mode?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'parent' | 'child' | 'senior'
          family_id?: string
          avatar_url?: string | null
          coins_balance?: number
          level?: 'bronze' | 'silver' | 'gold'
          total_coins_earned?: number
          monthly_savings?: number
          preferred_language?: string
          accessibility_mode?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      coin_transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          transaction_type: 'earn_purchase' | 'earn_activity' | 'spend_reward' | 'bonus'
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          transaction_type: 'earn_purchase' | 'earn_activity' | 'spend_reward' | 'bonus'
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          transaction_type?: 'earn_purchase' | 'earn_activity' | 'spend_reward' | 'bonus'
          description?: string
          created_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          title: string
          description: string
          category: 'game' | 'learning' | 'challenge'
          difficulty: 'beginner' | 'explorer' | 'champion'
          coin_reward: number
          icon: string
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: 'game' | 'learning' | 'challenge'
          difficulty?: 'beginner' | 'explorer' | 'champion'
          coin_reward?: number
          icon: string
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'game' | 'learning' | 'challenge'
          difficulty?: 'beginner' | 'explorer' | 'champion'
          coin_reward?: number
          icon?: string
          active?: boolean
          created_at?: string
        }
      }
      user_activities: {
        Row: {
          id: string
          user_id: string
          activity_id: string
          completed: boolean
          progress: number
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_id: string
          completed?: boolean
          progress?: number
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_id?: string
          completed?: boolean
          progress?: number
          completed_at?: string | null
          created_at?: string
        }
      }
      rewards: {
        Row: {
          id: string
          title: string
          description: string
          coin_cost: number
          icon: string
          category: 'discount' | 'gift' | 'special'
          active: boolean
          stock: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          coin_cost: number
          icon: string
          category: 'discount' | 'gift' | 'special'
          active?: boolean
          stock?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          coin_cost?: number
          icon?: string
          category?: 'discount' | 'gift' | 'special'
          active?: boolean
          stock?: number | null
          created_at?: string
        }
      }
      user_rewards: {
        Row: {
          id: string
          user_id: string
          reward_id: string
          claimed_at: string
          used: boolean
          used_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          reward_id: string
          claimed_at?: string
          used?: boolean
          used_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          reward_id?: string
          claimed_at?: string
          used?: boolean
          used_at?: string | null
        }
      }
    }
  }
}
