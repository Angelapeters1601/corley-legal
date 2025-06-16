import { Outlet } from 'react-router-dom';
import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
