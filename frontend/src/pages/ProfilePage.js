import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProfileRequest } from '../services/userService';

export default function ProfilePage() {
  const authUser = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(authUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authUser) setProfile(authUser);
  }, [authUser]);

  const refreshProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchProfileRequest();
      setProfile(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to refresh profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-container">
      <div className="page-header">
        <div>
          <p className="section-title">Profile</p>
          <h1 className="page-title">Your account information</h1>
          <p className="page-subtitle">Keep your subscription, credits, and account details updated for a smooth AI experience.</p>
        </div>
        <div className="section-actions">
          <button type="button" onClick={refreshProfile} disabled={loading} className="btn btn-primary">
            {loading ? 'Refreshing…' : 'Refresh Profile'}
          </button>
        </div>
      </div>

      {error && <div className="card" style={{ borderColor: 'rgba(255, 70, 115, 0.3)', color: '#FFB3C6' }}>{error}</div>}

      <div className="profile-grid">
        <div className="profile-card">
          <span className="profile-label">Name</span>
          <h3 className="profile-value">{profile?.name || '—'}</h3>
        </div>
        <div className="profile-card">
          <span className="profile-label">Email</span>
          <h3 className="profile-value">{profile?.email || '—'}</h3>
        </div>
        <div className="profile-card">
          <span className="profile-label">Subscription</span>
          <h3 className="profile-value capitalize">{profile?.subscription || 'free'}</h3>
        </div>
        <div className="profile-card">
          <span className="profile-label">Credits</span>
          <h3 className="profile-value">{profile?.credits ?? 0}</h3>
        </div>
      </div>
    </section>
  );
}
