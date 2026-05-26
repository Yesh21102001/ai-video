import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function DashboardPage() {
  const { user } = useSelector(state => state.auth);

  return (
    <section className="page-container">
      <div className="page-header">
        <div>
          <p className="section-title">Dashboard</p>
          <h1 className="page-title">Welcome back, {user?.name || 'Creator'}!</h1>
          <p className="page-subtitle">Your AI video dashboard is ready. Manage credits, view your videos, and create new content in seconds.</p>
        </div>
        <div className="section-actions">
          <Link to="/create" className="btn btn-primary">Create New Video</Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Videos Created</p>
          <p className="stat-value">{user?.videosCreated || 0}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Credits Remaining</p>
          <p className="stat-value">{user?.credits || 0}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Current Plan</p>
          <p className="stat-value">{user?.subscription || 'free'}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="page-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Quick Actions</h2>
        <div className="stats-grid">
          <div className="profile-card">
            <h3>Upload a new image</h3>
            <p className="page-subtitle">Add your latest photo, describe the action, and generate a fresh AI video.</p>
            <Link to="/create" className="btn btn-primary">Start Create</Link>
          </div>
          <div className="profile-card">
            <h3>Review my videos</h3>
            <p className="page-subtitle">See your recent creations, status updates, and video previews in one place.</p>
            <Link to="/my-videos" className="btn btn-secondary">Go to My Videos</Link>
          </div>
          <div className="profile-card">
            <h3>Update profile</h3>
            <p className="page-subtitle">Keep your subscription and credits in check by updating your account details.</p>
            <Link to="/profile" className="btn btn-secondary">View Profile</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
