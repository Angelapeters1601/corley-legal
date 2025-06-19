import React, { useState, useEffect, use } from 'react';

import useVisitorTracking from './hooks/useVisitorTracking';
import { Toaster } from 'react-hot-toast';
import { supabase } from './services/supabaseClient';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Team from './pages/Team';
import PracticeAreas from './pages/PracticeAreas';
import Testimonials from './pages/Testimonials';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './admin/Dashboard';
import FormSubmissions from './admin/FormSubmissions';
import LegalBriefings from './admin/LegalBriefings';
import LiveChat from './admin/LiveChat';
import LiveChatSessions from './admin/LiveChatSession';
import Orders from './admin/Orders';
import PrisonerMessaging from './admin/PrisonerMessaging';
import ProtectedRoute from './admin/ProtectedRoute';
import SubmissionDetail from './admin/SubmissionDetail';
import Uploads from './admin/Uploads';
import VisitorDashboard from './admin/VisitorDashboard';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  useVisitorTracking();
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
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/practice-areas" element={<PracticeAreas />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/admin"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route path="/admin/forms" element={<FormSubmissions />} />
              <Route path="/admin/visitors" element={<VisitorDashboard />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/uploads" element={<Uploads />} />
              <Route path="/admin/messaging" element={<PrisonerMessaging />} />
              <Route path="/admin/briefings" element={<LegalBriefings />} />
              <Route path="/admin/live-chats" element={<LiveChatSessions />} />
              <Route
                path="/admin/live-chat/:sessionId"
                element={<LiveChat />}
              />

              <Route
                path="/admin/submission/:id"
                element={<SubmissionDetail />}
              />
              <Route path="/admin/visitors" element={<VisitorDashboard />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
