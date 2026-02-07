import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Role = 'parent' | 'child' | 'senior';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: Role;
}

export interface SmartProfile extends Profile {
  kidsEnabled: boolean;
  grandpaEnabled: boolean;
  childSafe: boolean;
}

interface AuthContextType {
  user: any;
  profile: SmartProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: Role) => Promise<void>;
  reloadProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<SmartProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadProfile(data.session.user.id);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
    });
  }, []);

  function enhanceProfile(row: Profile): SmartProfile {
    const role = row.role;

    return {
      ...row,
      kidsEnabled: role === 'child' || role === 'parent',
      grandpaEnabled: role === 'senior',
      childSafe: role === 'child',
    };
  }

  async function loadProfile(userId?: string) {
    if (!userId) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setProfile(enhanceProfile(data));
    }
  }

  async function reloadProfile() {
    if (!user) return;
    await loadProfile(user.id);
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp(email: string, password: string, name: string, role: Role) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    await supabase.from('profiles').insert({
      id: data.user?.id,
      full_name: name,
      email,
      role,
    });

    await loadProfile(data.user?.id);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, reloadProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
