// src/components/RoleSwitcher.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from './Button';

export function RoleSwitcher() {
  const { user, profile, reloadProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user || !profile) return null;

  async function changeRole(newRole: 'parent' | 'child' | 'senior') {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', user.id);

      if (error) {
        alert('Error updating role: ' + error.message);
      } else {
        // reloadProfile will be called automatically by realtime listener,
        // but we can also force manual reload to be sure:
        await reloadProfile();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="secondary" onClick={() => changeRole('child')} disabled={loading}>
        Set Child
      </Button>
      <Button variant="secondary" onClick={() => changeRole('parent')} disabled={loading}>
        Set Parent
      </Button>
      <Button variant="secondary" onClick={() => changeRole('senior')} disabled={loading}>
        Set Senior
      </Button>
    </div>
  );
}
