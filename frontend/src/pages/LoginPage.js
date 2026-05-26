import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { alert('Fill all fields'); return; }
    const result = await dispatch(login({ email, password }));
    if (result.payload?.token) navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <span className="login-brand-name">AI Videos</span>
        </div>

        {/* Heading */}
        <h1 className="login-heading">Welcome <em>back</em></h1>
        <p className="login-subheading">Sign in to continue creating</p>

        <div className="login-divider" />

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>

          {error && (
            <div className="login-error">
              <svg className="login-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Email */}
          <div className="login-field">
            <label className="login-label" htmlFor="email">Email</label>
            <div className="login-input-wrap">
              <input
                id="email"
                type="email"
                className="login-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <label className="login-label" htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <input
                id="password"
                type="password"
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <a href="#" className="login-forgot">Forgot password?</a>
          </div>

          {/* Submit */}
          <button type="submit" className="login-submit" disabled={isLoading}>
            <span className="login-submit-inner">
              {isLoading && <span className="login-spinner" />}
              {isLoading ? 'Signing in…' : 'Sign In'}
            </span>
          </button>

        </form>

        {/* Footer */}
        <div className="login-footer">
          Don't have an account?{' '}
          <Link to="/signup">Create one</Link>
        </div>

      </div>
    </div>
  );
}