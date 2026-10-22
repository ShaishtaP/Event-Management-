import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "../components/Navbar";
import {
  Calendar,
  Users,
  BookOpen,
  Settings,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Compass,
} from "lucide-react";

const Home: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: "Event Management",
      description: "Create, curate, and publish campus events with structured workflows and instant live updates.",
      badge: "Fast & Intuitive",
    },
    {
      icon: Users,
      title: "One-Tap Registration",
      description: "Frictionless student registration with live capacity tracking and calendar-ready event passes.",
      badge: "Real-Time",
    },
    {
      icon: BookOpen,
      title: "Organizer Workspace",
      description: "Comprehensive dashboard for tracking attendance metrics, attendee lists, and event lifecycle.",
      badge: "Data-Driven",
    },
    {
      icon: ShieldCheck,
      title: "Verified Admin Oversight",
      description: "Role-based approval queues and governance ensuring safe, campus-compliant student activities.",
      badge: "Secure",
    },
  ];

  const stats = [
    { label: "Active Campus Events", value: "50+" },
    { label: "Verified Students", value: "1,200+" },
    { label: "Student Organizations", value: "85+" },
    { label: "Campus Venues", value: "25+" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section - Apple Keynote Aesthetic */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Subtle Apple Ambient Glow */}
        <div 
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 dark:bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Release Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-xs font-medium text-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Next-Generation Campus Experience</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-primary font-semibold">2026 Edition</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08] mb-6">
            Campus events, <br className="hidden sm:inline" />
            <span className="text-primary">elevated to perfection.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            A unified, role-based platform designed with purposeful simplicity to discover, host, and manage university gatherings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8 text-sm font-semibold shadow-sm shadow-primary/25">
              <Link to="/events">
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 text-sm font-medium border-black/[0.1] dark:border-white/[0.15] bg-black/[0.02] dark:bg-white/[0.04]"
            >
              <Link to="/register">Create Account</Link>
            </Button>
          </div>

          {/* Frosted Glass Stats Surface */}
          <div className="max-w-4xl mx-auto liquid-glass border rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-black/[0.06] dark:divide-white/[0.08]">
              {stats.map((stat, index) => (
                <div key={index} className={`pt-4 md:pt-0 ${index > 0 ? "md:pl-6" : ""}`}>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-black/[0.015] dark:bg-white/[0.02] border-y border-black/[0.04] dark:border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Designed with Purpose.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Every detail engineered to stay out of your way and let the campus community thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="apple-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-[10px] uppercase font-semibold tracking-wider mb-2">
                    {feature.badge}
                  </Badge>
                  <CardTitle className="text-lg font-semibold tracking-tight text-foreground mb-2">
                    {feature.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Three Steps */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Simplicity in Motion.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Three seamless steps from initial onboarding to participating in live college events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-5 shadow-sm shadow-primary/30">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">
                Join with Role
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Register as a Student, Organizer, or Administrator with dedicated authentication.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] text-center">
              <div className="w-12 h-12 rounded-2xl bg-foreground text-background font-bold text-lg flex items-center justify-center mx-auto mb-5">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">
                Discover & Create
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Filter approved campus events by date and venue, or draft new events with built-in capacity controls.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-5">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">
                Connect & Attend
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Secure your spot with instant registration feedback and manage your personal event schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Specific Capabilities */}
      <section className="py-20 sm:py-28 bg-black/[0.015] dark:bg-white/[0.02] border-t border-black/[0.04] dark:border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Tailored for Every Role.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Every persona gets an interface tuned specifically for their responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Students */}
            <Card className="apple-card p-6 flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Users className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-semibold tracking-tight text-foreground mb-3">
                  Students
                </CardTitle>
                <ul className="space-y-2.5 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    Browse approved university events
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    One-click registration & spots counter
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    Personal schedule & cancellations
                  </li>
                </ul>
              </div>
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link to="/register">Register as Student</Link>
              </Button>
            </Card>

            {/* Organizers */}
            <Card className="apple-card p-6 flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-semibold tracking-tight text-foreground mb-3">
                  Organizers
                </CardTitle>
                <ul className="space-y-2.5 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    Publish events with venue details
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    Capacity & attendee management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    Edit or cancel scheduled sessions
                  </li>
                </ul>
              </div>
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link to="/register">Create as Organizer</Link>
              </Button>
            </Card>

            {/* Administrators */}
            <Card className="apple-card p-6 flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center mb-4">
                  <Settings className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-semibold tracking-tight text-foreground mb-3">
                  Administrators
                </CardTitle>
                <ul className="space-y-2.5 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    Approval & moderation queue
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    Campus-wide user directory
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    Role assignment & platform controls
                  </li>
                </ul>
              </div>
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link to="/login">Admin Sign In</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Clean Apple Call To Action */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-14 rounded-3xl liquid-glass border border-black/[0.08] dark:border-white/[0.1] shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Get Started with CampusEvents.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Explore open events across your university or log in to manage your campus organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8 shadow-sm">
                <Link to="/register">Create Free Account</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto rounded-full px-8">
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Apple Style Footer */}
      <footer className="mt-auto border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.01] py-12 text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              C
            </div>
            <span className="font-semibold text-foreground text-sm">CampusEvents</span>
            <span>· Campus Event Management Portal</span>
          </div>
          <div>
            <p>© 2026 CampusEvents. Crafted with Apple Human Interface Guidelines.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
