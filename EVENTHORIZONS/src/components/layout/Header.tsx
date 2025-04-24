
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-medium" : "text-muted-foreground";
  };
  
  return (
    <header className="border-b sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient text-white flex items-center justify-center font-bold">
              E
            </div>
            <span className="text-xl font-bold">EventHorizons</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/events" className={`text-sm ${isActive('/events')}`}>
            Browse Events
          </Link>
          <Link to="/create-event" className={`text-sm ${isActive('/create-event')}`}>
            Create Event
          </Link>
          {currentUser && (
            <Link to="/dashboard" className={`text-sm ${isActive('/dashboard')}`}>
              Dashboard
            </Link>
          )}
          <Link to="/about" className={`text-sm ${isActive('/about')}`}>
            About
          </Link>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden md:inline-block">
                Hi, {currentUser.name}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
