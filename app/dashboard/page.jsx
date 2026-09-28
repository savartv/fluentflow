export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-card"><p>Загрузка...</p></div>
      </div>
    );
  }

  if (!user) return null;

  const name = user.user_metadata?.full_name || user.email?.split('@')[0];

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 560 }}>
        <a href="/" className="logo" style={{ marginBottom: 24 }}>
          <span className="logo-mark">FF</span>
          <span>FluentFlow</span>
        </a>

        <h1>Привет, {name} 👋</h1>
        <p className="auth-sub">Твой личный кабинет</p>

        <div className="dash-info">
          <div><span>Email:</span> <b>{user.email}</b></div>
          <div><span>Подписка:</span> <b>Не активна</b></div>
          <div><span>Тариф:</span> <b>—</b></div>
          <div><span>AI-сообщений:</span> <b>0 / 0</b></div>
        </div>

        <div className="dash-actions">
          <a href="/#pricing" className="btn btn-primary btn-lg full">
            Оформить подписку 449 ₽
          </a>
          <button onClick={handleLogout} className="btn btn-ghost">
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}