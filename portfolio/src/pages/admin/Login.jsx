import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import '../../components/admin/admin.css';

export default function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Already authenticated → skip the form.
  useEffect(() => {
    if (!loading && isAuthenticated) navigate('/admin', { replace: true });
  }, [loading, isAuthenticated, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__logo">
          Admin <span />
        </div>
        <p className="login__sub">Sign in to manage your portfolio content.</p>

        <form className="login__form" onSubmit={submit}>
          {error && (
            <div className="login__error">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@yoursite.dev"
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
            <LogIn size={16} />
          </button>
        </form>

        <p className="login__hint">Use the ADMIN_EMAIL / ADMIN_PASSWORD from your server&apos;s .env.</p>
        <div style={{ textAlign: 'center' }}>
          <Link to="/" className="login__back">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
