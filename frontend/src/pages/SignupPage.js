import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import './SignupPage.css';

function getStrength(password) {
  if (!password) return { level: 0, label: '', cls: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { level: 1, label: 'Weak', cls: 'weak' };
  if (score <= 2) return { level: 2, label: 'Fair', cls: 'fair' };
  return { level: 3, label: 'Strong', cls: 'strong' };
}

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

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconAlert = () => (
  <svg className="signup-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);

  const strength = getStrength(formData.password);
  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;
  const passwordsMismatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  // Step progress: count filled fields (max 4)
  const filledCount = [
    formData.name,
    formData.email,
    formData.password,
    formData.confirmPassword && passwordsMatch,
  ].filter(Boolean).length;

  const update = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const blur = (field) => () =>
    setTouched({ ...touched, [field]: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) return;
    if (formData.password !== formData.confirmPassword) return;
    const result = await dispatch(register(formData));
    if (result.payload?.token) navigate('/dashboard');
  };

  const confirmClass = passwordsMatch
    ? 'signup-input match-ok'
    : passwordsMismatch
    ? 'signup-input match-err'
    : 'signup-input';

  return (
    <div className="signup-page">
      <div className="signup-card">

        {/* Brand */}
        <div className="signup-brand">
          <div className="signup-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
          </div>
          <span className="signup-brand-name">AI Videos</span>
        </div>

        {/* Heading */}
        <h1 className="signup-heading">Start <em>creating</em></h1>
        <p className="signup-subheading">Create your free account in seconds</p>

        {/* Step progress */}
        <div className="signup-steps" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`signup-step-dot ${
                i < filledCount ? 'done' : i === filledCount ? 'active' : ''
              }`}
            />
          ))}
        </div>

        <div className="signup-divider" />

        {/* Form */}
        <form className="signup-form" onSubmit={handleSubmit} noValidate>

          {error && (
            <div className="signup-error">
              <IconAlert />
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="name">Full Name</label>
            <div className="signup-input-wrap">
              <input
                id="name"
                type="text"
                className="signup-input no-toggle"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={update('name')}
                onBlur={blur('name')}
                autoComplete="name"
              />
              <span className="signup-input-icon"><IconUser /></span>
            </div>
          </div>

          {/* Email */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="email">Email</label>
            <div className="signup-input-wrap">
              <input
                id="email"
                type="email"
                className="signup-input no-toggle"
                placeholder="you@example.com"
                value={formData.email}
                onChange={update('email')}
                onBlur={blur('email')}
                autoComplete="email"
              />
              <span className="signup-input-icon"><IconMail /></span>
            </div>
          </div>

          {/* Password */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="password">Password</label>
            <div className="signup-input-wrap">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="signup-input"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={update('password')}
                onBlur={blur('password')}
                autoComplete="new-password"
              />
              <span className="signup-input-icon"><IconLock /></span>
              <button
                type="button"
                className="signup-pwd-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {formData.password.length > 0 && (
              <>
                <div className="strength-bar-wrap" aria-hidden="true">
                  <div className={`strength-seg ${strength.level >= 1 ? strength.cls : ''}`} />
                  <div className={`strength-seg ${strength.level >= 2 ? strength.cls : ''}`} />
                  <div className={`strength-seg ${strength.level >= 3 ? strength.cls : ''}`} />
                </div>
                <span className={`strength-label ${strength.cls}`}>{strength.label} password</span>
              </>
            )}
          </div>

          {/* Confirm Password */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="signup-input-wrap">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                className={confirmClass}
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={update('confirmPassword')}
                onBlur={blur('confirmPassword')}
                autoComplete="new-password"
              />
              <span className="signup-input-icon"><IconLock /></span>
              <button
                type="button"
                className="signup-pwd-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {passwordsMatch && (
              <span className="signup-hint ok">Passwords match</span>
            )}
            {passwordsMismatch && touched.confirmPassword && (
              <span className="signup-hint err">Passwords do not match</span>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="signup-submit" disabled={isLoading}>
            <span className="signup-submit-inner">
              {isLoading && <span className="signup-spinner" />}
              {isLoading ? 'Creating account…' : 'Create Account'}
            </span>
          </button>

          {/* Terms */}
          <p className="signup-terms">
            By signing up you agree to our{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>.
          </p>

        </form>

        {/* Footer */}
        <div className="signup-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>

      </div>
    </div>
  );
}