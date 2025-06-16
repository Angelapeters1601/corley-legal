import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Team from './pages/Team';
import PracticeAreas from './pages/PracticeAreas';
import Testimonials from './pages/Testimonials';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/practice-areas" element={<PracticeAreas />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
