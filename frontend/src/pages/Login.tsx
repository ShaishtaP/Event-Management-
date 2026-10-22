import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginUser, clearError } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';
import { Calendar, AlertCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'admin' ? '/admin' : 
                          user.role === 'organizer' ? '/organizer' : 
                          user.role === 'student' ? '/student' : from;
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate, from]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (error) {
      dispatch(clearError());
    }
  };

  const fillDemo = (email: string, pass: string) => {
    setFormData({ email, password: pass });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 selection:bg-primary/20 selection:text-primary">
      {/* Background ambient lighting */}
      <div 
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3 group">
            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm shadow-primary/30 group-hover:scale-105 transition-transform duration-150">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">
              CampusEvents
            </span>
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Sign In with Campus ID
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Access your university events dashboard
          </p>
        </div>

        <Card className="apple-card shadow-sm p-2 sm:p-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert className="rounded-xl border-danger/30 bg-danger/10 text-danger">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@university.edu"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl h-11 text-sm font-semibold shadow-sm"
                disabled={isLoading || !formData.email || !formData.password}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-3 text-center">
              <p className="text-xs text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-semibold">
                  Register here
                </Link>
              </p>
            </div>

            {/* Quick Demo Fill Buttons (Apple Agency Principle) */}
            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-primary" /> Quick Demo Fill
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo('student@example.com', 'student123')}
                  className="px-2 py-1.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[11px] font-medium text-foreground transition-colors border border-black/[0.04] dark:border-white/[0.06]"
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('organizer@example.com', 'org123')}
                  className="px-2 py-1.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[11px] font-medium text-foreground transition-colors border border-black/[0.04] dark:border-white/[0.06]"
                >
                  Organizer
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('admin@example.com', 'admin123')}
                  className="px-2 py-1.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[11px] font-medium text-foreground transition-colors border border-black/[0.04] dark:border-white/[0.06]"
                >
                  Admin
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
