import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-body"><Outlet /></main>
    </div>
  );
}
