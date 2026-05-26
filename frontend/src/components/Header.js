import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">AI Videos</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="nav-desktop">
            <a href="#features" className="nav-item">Features</a>
            <a href="#how" className="nav-item">How it Works</a>
            <a href="#examples" className="nav-item">Examples</a>
            <a href="#faq" className="nav-item">FAQ</a>
          </nav>

          {/* Right Section */}
          <div className="header-right">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-primary-outline">
                  Dashboard
                </Link>
                <button type="button" onClick={handleLogout} className="btn btn-ghost">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="nav-mobile">
            <a href="#features" className="nav-item-mobile">Features</a>
            <a href="#how" className="nav-item-mobile">How it Works</a>
            <a href="#examples" className="nav-item-mobile">Examples</a>
            <a href="#faq" className="nav-item-mobile">FAQ</a>
            {isAuthenticated ? (
              <button type="button" onClick={handleLogout} className="btn btn-ghost">Logout</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">Sign In</Link>
                <Link to="/signup" className="btn btn-primary">Get Started</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}