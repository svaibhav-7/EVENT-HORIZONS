
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient text-white flex items-center justify-center font-bold">
                E
              </div>
              <span className="text-xl font-bold">EventHorizons</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting people through virtual events. Join us and expand your horizons.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Platform</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link>
              <Link to="/events" className="text-sm text-muted-foreground hover:text-primary">Browse Events</Link>
              <Link to="/create-event" className="text-sm text-muted-foreground hover:text-primary">Create Event</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Resources</h3>
            <div className="flex flex-col gap-2">
              <Link to="/help" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {currentYear} EventHorizons. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
