import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Sidebar({ sidebarOpen }) {
  const navItems = [
    { path: '/dashboard', label: '🏠 Home' },
    { path: '/create', label: '🎬 Create Video' },
    { path: '/my-videos', label: '🎥 My Videos' },
    { path: '/profile', label: '👤 Profile' },
    { path: '/subscription', label: '⚡ Subscription' },
    { path: '/settings', label: '⚙️ Settings' },
  ];
  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">AI Videos</h1>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
