import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface SmartProfile extends Profile {
  kidsEnabled: boolean;
  grandpaEnabled: boolean;
  premiumAccess: boolean;
  childSafe: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: SmartProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: 'parent' | 'child' | 'senior'
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<SmartProfile | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= INIT ================= */

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        loadProfile(data.session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  /* ================= SMART ROLE ================= */

  function enhanceProfile(profile: Profile): SmartProfile {
    const role = profile.role?.toLowerCase();

    // SENIOR
    if (role === 'senior') {
      return {
        ...profile,
        kidsEnabled: true,
        grandpaEnabled: true,
        premiumAccess: true,
        childSafe: false,
      };
    }

    // PARENT
    if (role === 'parent') {
      return {
        ...profile,
        kidsEnabled: true,
        grandpaEnabled: true,
        premiumAccess: false,
        childSafe: false,
      };
    }

    // CHILD (default)
    return {
      ...profile,
      kidsEnabled: true,
      grandpaEnabled: false,
      premiumAccess: false,
      childSafe: true,
    };
  }

  /* ================= LOAD PROFILE ================= */

  async function loadProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(enhanceProfile(data));
    }

    setLoading(false);
  }

  /* ================= AUTH ================= */

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  }

  async function signUp(
    email: string,
    password: string,
    fullName: string,
    role: 'parent' | 'child' | 'senior'
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Signup failed');

    await supabase.from('profiles').insert({
      id: data.user.id,
      email,
      full_name: fullName,
      role: role.toLowerCase(),
      family_id: crypto.randomUUID(),
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  /* ================= PROVIDER ================= */

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
