import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { 
  Calendar, 
  LogOut, 
  User, 
  Settings, 
  BookOpen,
  Menu,
  X,
  Compass,
} from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ 
    to, 
    children, 
    className = '' 
  }: { 
    to: string; 
    children: React.ReactNode; 
    className?: string;
  }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ease-out active:scale-[0.98] ${
          active
            ? 'bg-foreground/10 text-foreground font-semibold shadow-none'
            : 'text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
        } ${className}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full liquid-glass border-b transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2.5 group transition-transform duration-150 active:scale-[0.98]"
          >
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm shadow-primary/30">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
              CampusEvents
            </span>
          </Link>

          {/* Desktop Navigation - Apple Segmented Navigation */}
          <div className="hidden md:flex items-center space-x-1.5 bg-black/[0.03] dark:bg-white/[0.04] p-1 rounded-full border border-black/[0.04] dark:border-white/[0.06]">
            <NavLink to="/events">
              <Compass className="inline h-4 w-4 mr-1.5 -mt-0.5" />
              Public Events
            </NavLink>
            
            {isAuthenticated && (
              <>
                {user?.role === 'admin' && (
                  <NavLink to="/admin">
                    <Settings className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                    Admin Panel
                  </NavLink>
                )}
                {user?.role === 'organizer' && (
                  <NavLink to="/organizer">
                    <BookOpen className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                    My Events
                  </NavLink>
                )}
                {user?.role === 'student' && (
                  <NavLink to="/student">
                    <User className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                    Dashboard
                  </NavLink>
                )}
              </>
            )}
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06]">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {user?.name}
                  </span>
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider py-0 px-2 font-semibold">
                    {user?.role}
                  </Badge>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-muted-foreground hover:text-danger hover:bg-danger/10"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm" className="rounded-full font-medium">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="rounded-full px-4 font-medium shadow-sm">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-black/[0.06] dark:border-white/[0.08] py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-1">
              <NavLink to="/events">
                <Compass className="inline h-4 w-4 mr-2" />
                Public Events
              </NavLink>
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' && (
                    <NavLink to="/admin">
                      <Settings className="inline h-4 w-4 mr-2" />
                      Admin Panel
                    </NavLink>
                  )}
                  {user?.role === 'organizer' && (
                    <NavLink to="/organizer">
                      <BookOpen className="inline h-4 w-4 mr-2" />
                      My Events
                    </NavLink>
                  )}
                  {user?.role === 'student' && (
                    <NavLink to="/student">
                      <User className="inline h-4 w-4 mr-2" />
                      Dashboard
                    </NavLink>
                  )}
                  
                  <div className="pt-3 mt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between px-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <Badge variant="secondary" className="text-[10px] uppercase font-semibold">
                        {user?.role}
                      </Badge>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="rounded-full text-danger hover:bg-danger/10"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="pt-3 mt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col space-y-2 px-2">
                  <Button asChild variant="outline" className="w-full rounded-xl">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full rounded-xl">
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
