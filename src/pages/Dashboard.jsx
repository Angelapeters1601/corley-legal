import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    }
    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  return (
    <div style={{ padding: '30px', maxWidth: '700px', margin: 'auto' }}>
      <h1>Welcome, Admin 👋</h1>
      <p>
        Logged in as: <strong>{userEmail}</strong>
      </p>

      <button
        onClick={handleLogout}
        style={{ padding: '10px 20px', marginTop: '20px' }}
      >
        Logout
      </button>

      <div style={{ marginTop: '40px' }}>
        <h2>Dashboard</h2>
        <ul>
          <li>📄 View Form Submissions</li>
          <li>🌍 Website Visitor Info</li>
          <li>💬 Live Chat Portal</li>
          <li>💸 Orders & Payments</li>
          <li>📤 Upload Legal PDFs</li>
          <li>📨 Prisoner Messaging</li>
          <li>🎥 Legal Briefings / YouTube DB</li>
        </ul>
      </div>
    </div>
  );
}
