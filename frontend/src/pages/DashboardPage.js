import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DashboardPage.css';

/* ── Icons ──────────────────────────── */
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconVideo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconImage = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Helpers ─────────────────────────── */
function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

/* ── Component ──────────────────────── */
export default function DashboardPage() {
  const { user } = useSelector(state => state.auth);

  const credits      = user?.credits ?? 0;
  const videosCount  = user?.videosCreated ?? 0;
  const subscription = user?.subscription || 'free';
  const firstName    = user?.name?.split(' ')[0] || 'Creator';

  return (
    <div className="db-page">
      <div className="db-inner">

        {/* ── Hero ── */}
        <div className="db-hero">
          <div className="db-hero-left">
            <div className="db-avatar">{getInitials(user?.name)}</div>
            <div>
              <p className="db-eyebrow">{getGreeting()}</p>
              <h1 className="db-title">
                Welcome back, <em>{firstName}</em>
              </h1>
              <p className="db-subtitle">
                Your AI studio is ready. Create videos, manage credits, and track your creations.
              </p>
            </div>
          </div>
          <Link to="/create" className="db-cta">
            <IconPlus />
            Create New Video
          </Link>
        </div>

        {/* ── Stats ── */}
        <div>
          <p className="db-section-label">Overview</p>
          <div className="db-stats">

            <div className="db-stat s-purple">
              <div className="db-stat-top">
                <div className="db-stat-icon ico-purple"><IconVideo /></div>
                <span className="db-stat-label">Videos Created</span>
              </div>
              <div>
                <div className="db-stat-value">{videosCount}</div>
                <div className="db-stat-hint">all time</div>
              </div>
            </div>

            <div className="db-stat s-green">
              <div className="db-stat-top">
                <div className="db-stat-icon ico-green"><IconZap /></div>
                <span className="db-stat-label">Credits Remaining</span>
              </div>
              <div>
                <div className="db-stat-value">{credits}</div>
                <div className="db-stat-hint">available to spend</div>
              </div>
            </div>

            <div className="db-stat s-amber">
              <div className="db-stat-top">
                <div className="db-stat-icon ico-amber"><IconStar /></div>
                <span className="db-stat-label">Current Plan</span>
              </div>
              <div>
                <div className={`db-stat-value${subscription.length > 5 ? ' sm' : ''}`}>
                  {subscription}
                </div>
                <div className="db-stat-hint">subscription tier</div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div>
          <p className="db-section-label">Quick Actions</p>
          <div className="db-actions">

            <Link to="/create" className="db-action-card primary">
              <div className="db-action-icon aico-purple"><IconImage /></div>
              <div className="db-action-body">
                <div className="db-action-title">Create a new video</div>
                <div className="db-action-desc">
                  Upload an image, describe the action, and let AI generate your next masterpiece.
                </div>
              </div>
              <div className="db-action-footer">
                <span className="db-action-link">
                  Start creating <IconArrow />
                </span>
              </div>
            </Link>

            <Link to="/my-videos" className="db-action-card">
              <div className="db-action-icon aico-green"><IconVideo /></div>
              <div className="db-action-body">
                <div className="db-action-title">Review my videos</div>
                <div className="db-action-desc">
                  Browse recent creations, check status updates, and download your finished videos.
                </div>
              </div>
              <div className="db-action-footer">
                <span className="db-action-link">
                  Go to library <IconArrow />
                </span>
              </div>
            </Link>

            <Link to="/profile" className="db-action-card">
              <div className="db-action-icon aico-amber"><IconUser /></div>
              <div className="db-action-body">
                <div className="db-action-title">Update profile</div>
                <div className="db-action-desc">
                  Keep your subscription, credits, and account details up to date.
                </div>
              </div>
              <div className="db-action-footer">
                <span className="db-action-link">
                  View profile <IconArrow />
                </span>
              </div>
            </Link>

          </div>
        </div>

        {/* ── Recent activity ── */}
        <div>
          <p className="db-section-label">Recent Activity</p>
          <div className="db-activity">
            <div className="db-activity-header">
              <span className="db-activity-title">Latest events</span>
              <Link to="/my-videos" className="db-activity-link">View all →</Link>
            </div>
            {videosCount === 0 ? (
              <div className="db-activity-row">
                <span className="db-activity-dot dot-purple" />
                <span className="db-activity-text">
                  <strong>Account created</strong> — welcome to AI Videos!
                </span>
                <span className="db-activity-time">Just now</span>
              </div>
            ) : (
              <>
                <div className="db-activity-row">
                  <span className="db-activity-dot dot-green" />
                  <span className="db-activity-text">
                    <strong>Video completed</strong> — your latest AI video is ready to download.
                  </span>
                  <span className="db-activity-time">2h ago</span>
                </div>
                <div className="db-activity-row">
                  <span className="db-activity-dot dot-amber" />
                  <span className="db-activity-text">
                    <strong>Credits used</strong> — 1 credit spent on video generation.
                  </span>
                  <span className="db-activity-time">2h ago</span>
                </div>
                <div className="db-activity-row">
                  <span className="db-activity-dot dot-purple" />
                  <span className="db-activity-text">
                    <strong>Video submitted</strong> — processing started for your creation.
                  </span>
                  <span className="db-activity-time">3h ago</span>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}