import { Toaster } from 'react-hot-toast';
import { supabase } from './services/supabaseClient';
import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Team from './pages/Team';
import PracticeAreas from './pages/PracticeAreas';
import Testimonials from './pages/Testimonials';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      {/* <Router basename="/"> for deployment*/}
      <Router basename="/corley-legal">
        {/* <Router basename="/"> */}
        {/* <Router basename="/corley-legal"> //production only */}
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/practice-areas" element={<PracticeAreas />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={user ? <Dashboard /> : <Navigate to="/admin/login" />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
