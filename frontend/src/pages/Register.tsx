import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { registerUser, clearError } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';
import { Calendar, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'admin' ? '/admin' : 
                          user.role === 'organizer' ? '/organizer' : 
                          user.role === 'student' ? '/student' : '/';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (error) dispatch(clearError());
    if (validationError) setValidationError('');
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
    if (validationError) setValidationError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setValidationError('Please enter your full name');
      return false;
    }
    
    if (!formData.email.trim()) {
      setValidationError('Please provide a valid email address');
      return false;
    }

    if (!formData.password) {
      setValidationError('Please enter a password');
      return false;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }

    if (!formData.role) {
      setValidationError('Please choose a role to proceed');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const { confirmPassword, ...submitData } = formData;
    dispatch(registerUser(submitData));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 selection:bg-primary/20 selection:text-primary py-12">
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
            Create Your Account
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Join the campus community platform
          </p>
        </div>

        <Card className="apple-card shadow-sm p-2 sm:p-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Registration</CardTitle>
            <CardDescription>
              Select your university role and get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {(error || validationError) && (
              <Alert className="rounded-xl border-danger/30 bg-danger/10 text-danger">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs font-medium">
                  {error || validationError}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Alex Morgan"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                  University Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="alex@university.edu"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-semibold text-foreground">
                  Select Role
                </Label>
                <Select onValueChange={handleRoleChange} value={formData.role}>
                  <SelectTrigger id="role" className="h-11 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.08] dark:border-white/[0.12] text-sm">
                    <SelectValue placeholder="Choose your campus role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="student">Student (Attendee)</SelectItem>
                    <SelectItem value="organizer">Event Organizer</SelectItem>
                    <SelectItem value="admin">Campus Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-xs font-semibold text-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Repeat your password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl h-11 text-sm font-semibold shadow-sm mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-3 text-center border-t border-black/[0.06] dark:border-white/[0.08]">
              <p className="text-xs text-muted-foreground">
                Already registered?{' '}
                <Link to="/login" className="text-primary hover:underline font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
