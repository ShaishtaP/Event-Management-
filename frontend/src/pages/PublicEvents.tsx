import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import { fetchPublicEvents, registerForEvent } from '../store/slices/eventsSlice';
import { RootState, AppDispatch } from '../store/store';
import { Calendar, Search, Filter, Users, MapPin, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublicEvents: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, registeredEvents, isLoading } = useSelector((state: RootState) => state.events);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    dispatch(fetchPublicEvents());
  }, [dispatch]);

  const handleRegister = (eventId: string) => {
    if (isAuthenticated) {
      dispatch(registerForEvent(eventId));
    }
  };

  const isUserRegistered = (eventId: string) => {
    return registeredEvents.some(event => event.id === eventId);
  };

  // Filter and sort events
  const filteredEvents = events
    .filter(event => {
      if (event.status !== 'approved' || !event.isPublic) return false;
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower) ||
          event.organizerName.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(event => {
      if (filterBy === 'available') {
        return event.registeredCount < event.capacity;
      } else if (filterBy === 'full') {
        return event.registeredCount >= event.capacity;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'capacity':
          return (b.capacity - b.registeredCount) - (a.capacity - a.registeredCount);
        default:
          return 0;
      }
    });

  const availableCount = events.filter(e => e.registeredCount < e.capacity).length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                <Sparkles className="h-3 w-3" />
                Live Campus Calendar
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Public Events
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-xl">
                Explore, bookmark, and register for university workshops, fests, and hackathons.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-center">
                <div className="text-xs text-muted-foreground font-medium">All Events</div>
                <div className="text-xl font-bold tracking-tight text-foreground">{events.length}</div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-center">
                <div className="text-xs text-muted-foreground font-medium">Open Spots</div>
                <div className="text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">{availableCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar - Floating Glass Surface */}
        <div className="mb-10 p-2.5 rounded-2xl liquid-glass border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by title, location, description, or host..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-9 h-10 rounded-xl bg-transparent border-0 focus-visible:ring-1 focus-visible:ring-primary/40"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-36 h-10 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/[0.08] text-xs font-medium">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="capacity">Available Spots</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-36 h-10 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/[0.08] text-xs font-medium">
                <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="available">Spots Available</SelectItem>
                <SelectItem value="full">Event Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading campus events...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                showRegistration={isAuthenticated && user?.role === 'student'}
                isRegistered={isUserRegistered(event.id)}
                onRegister={handleRegister}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center mx-auto mb-4 text-muted-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground tracking-tight mb-1">
              {searchTerm ? 'No matching events found' : 'No upcoming events'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-5 leading-relaxed">
              {searchTerm 
                ? 'Try adjusting your search terms or resetting the active filters.'
                : 'New events are published regularly by campus organizers. Check back soon!'
              }
            </p>
            {searchTerm && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-5"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}

        {/* Prompt for Non-Authenticated Visitors */}
        {!isAuthenticated && filteredEvents.length > 0 && (
          <div className="mt-16 p-8 rounded-3xl liquid-glass border border-black/[0.08] dark:border-white/[0.1] text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
              Ready to attend?
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Create a free student or organizer account to register for events, receive updates, and host your own gatherings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild className="w-full sm:w-auto rounded-full px-7 shadow-sm">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto rounded-full px-7">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicEvents;
