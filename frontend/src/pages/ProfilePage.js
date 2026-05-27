import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProfileRequest } from '../services/userService';
import './ProfilePage.css';

/* ── Icon helpers ───────────────────── */
const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconVideo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ── Helpers ────────────────────────── */
function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';
}

function getSubBadgeClass(sub = 'free') {
  const s = sub.toLowerCase();
  if (s === 'pro') return 'sub-badge pro';
  if (s === 'enterprise') return 'sub-badge enterprise';
  return 'sub-badge free';
}

/* ── Component ──────────────────────── */
export default function ProfilePage() {
  const authUser = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(authUser);
  const [loading, setLoading] = useState(false);
  const [error, setError]  = useState(null);
  const [copied, setCopied] = useState(false);

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

  const copyEmail = () => {
    if (!profile?.email) return;
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const credits     = profile?.credits ?? 0;
  const creditLimit = profile?.creditLimit ?? 100;
  const creditPct   = Math.min(100, Math.round((credits / creditLimit) * 100));
  const subscription = profile?.subscription || 'free';

  return (
    <div className="profile-page">
      <div className="profile-inner">

        {/* ── Header ── */}
        <div className="profile-header">
          <div className="profile-header-left">
            <div className="profile-avatar">
              {getInitials(profile?.name)}
            </div>
            <div className="profile-header-text">
              <span className="profile-eyebrow">Account</span>
              <h1 className="profile-title">
                {profile?.name
                  ? <><em>{profile.name.split(' ')[0]}</em>{profile.name.includes(' ') ? ` ${profile.name.split(' ').slice(1).join(' ')}` : ''}</>
                  : 'Your Profile'}
              </h1>
              <p className="profile-subtitle">Manage your account, subscription & credits</p>
            </div>
          </div>

          <button
            type="button"
            onClick={refreshProfile}
            disabled={loading}
            className={`profile-refresh-btn${loading ? ' spinning' : ''}`}
          >
            <IconRefresh />
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="profile-error">
            <IconAlert />
            {error}
          </div>
        )}

        {/* ── Stat cards ── */}
        <p className="profile-section-label">Overview</p>
        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-top">
              <div className="profile-stat-icon icon-purple"><IconZap /></div>
              <span className="profile-stat-label">Credits</span>
            </div>
            <div className="profile-stat-value">{credits}</div>
            <div className="profile-stat-sub">of {creditLimit} available</div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-top">
              <div className="profile-stat-icon icon-green"><IconVideo /></div>
              <span className="profile-stat-label">Videos</span>
            </div>
            <div className="profile-stat-value">{profile?.videosGenerated ?? 0}</div>
            <div className="profile-stat-sub">generated all time</div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-top">
              <div className="profile-stat-icon icon-amber"><IconStar /></div>
              <span className="profile-stat-label">Plan</span>
            </div>
            <div className="profile-stat-value" style={{ textTransform: 'capitalize' }}>{subscription}</div>
            <div className="profile-stat-sub">current subscription</div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-top">
              <div className="profile-stat-icon icon-blue"><IconClock /></div>
              <span className="profile-stat-label">Member since</span>
            </div>
            <div className="profile-stat-value" style={{ fontSize: '1.15rem' }}>
              {profile?.createdAt
                ? new Date(profile.createdAt).getFullYear()
                : '—'}
            </div>
            <div className="profile-stat-sub">
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : 'Account age'}
            </div>
          </div>
        </div>

        {/* ── Account info ── */}
        <p className="profile-section-label">Account Details</p>
        <div className="profile-info-card">

          {/* Name */}
          <div className="profile-info-row">
            <div className="profile-info-left">
              <div className="profile-info-icon"><IconUser /></div>
              <div>
                <div className="profile-info-key">Full name</div>
                <div className="profile-info-val">{profile?.name || '—'}</div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="profile-info-row">
            <div className="profile-info-left">
              <div className="profile-info-icon"><IconMail /></div>
              <div>
                <div className="profile-info-key">Email address</div>
                <div className="profile-info-val">{profile?.email || '—'}</div>
              </div>
            </div>
            <button type="button" className="profile-copy-btn" onClick={copyEmail}>
              <IconCopy />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Subscription */}
          <div className="profile-info-row">
            <div className="profile-info-left">
              <div className="profile-info-icon"><IconStar /></div>
              <div>
                <div className="profile-info-key">Subscription</div>
                <div className="profile-info-val" style={{ marginTop: '4px' }}>
                  <span className={getSubBadgeClass(subscription)}>
                    <span className="sub-badge-dot" />
                    {subscription}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Credits progress ── */}
        <p className="profile-section-label">Credits</p>
        <div className="profile-credits-card">
          <div className="profile-credits-header">
            <span className="profile-credits-title">Available credits</span>
            <span className="profile-credits-count">
              {credits}<span>/ {creditLimit}</span>
            </span>
          </div>
          <div className="credits-bar-track">
            <div
              className="credits-bar-fill"
              style={{ width: `${creditPct}%` }}
            />
          </div>
          <div className="credits-bar-labels">
            <span>{creditPct}% remaining</span>
            <span>{creditLimit - credits} used</span>
          </div>
        </div>

      </div>
    </div>
  );
}