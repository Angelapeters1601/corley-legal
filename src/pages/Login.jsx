import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); // Clear previous error

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/admin'); // Redirect to dashboard
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      style={{ maxWidth: 400, margin: 'auto', paddingTop: '100px' }}
    >
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          display: 'block',
          width: '100%',
          margin: '10px 0',
          padding: '10px',
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          display: 'block',
          width: '100%',
          margin: '10px 0',
          padding: '10px',
        }}
      />

      <button type="submit" style={{ padding: '10px 20px' }}>
        Login
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
