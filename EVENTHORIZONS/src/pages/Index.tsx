
import React from "react";
import { Link } from "react-router-dom";
import { useEvents } from "@/contexts/EventContext";
import MainLayout from "@/components/layout/MainLayout";
import EventCard from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { featuredEvents } = useEvents();
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-background px-6 py-24 md:px-8">
        <div className="container mx-auto flex flex-col items-center text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Virtual Events That <span className="text-gradient">Connect</span> People
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Discover, create, and join engaging virtual events from anywhere in the world. 
            Connect with like-minded people and expand your horizons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button className="bg-gradient" size="lg" asChild>
              <Link to="/events">Explore Events</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/create-event">Host an Event</Link>
            </Button>
          </div>
          
          {/* Floating graphics */}
          <div className="absolute top-1/4 -left-16 w-32 h-32 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-20 w-40 h-40 rounded-full bg-event-teal/10 blur-3xl"></div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-16 px-6 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Button variant="outline" asChild>
              <Link to="/events">View All</Link>
            </Button>
          </div>
          
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredEvents.slice(0, 4).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 px-6 md:px-8 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {[
              { name: "Technology", icon: "💻" },
              { name: "Business", icon: "📊" },
              { name: "Education", icon: "🎓" },
              { name: "Health", icon: "🏥" },
              { name: "Entertainment", icon: "🎬" },
              { name: "Networking", icon: "🤝" },
              { name: "Workshop", icon: "🛠️" },
              { name: "Conference", icon: "🎤" },
              { name: "Webinar", icon: "📱" },
              { name: "Other", icon: "🔍" }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/events?category=${category.name}`}
                className="flex flex-col items-center p-4 rounded-lg bg-card hover:bg-accent transition-colors card-hover"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-8 bg-gradient">
        <div className="container mx-auto text-center text-white max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to host your own event?</h2>
          <p className="text-lg mb-8 text-white/90">
            Create engaging virtual experiences and connect with your audience from anywhere in the world.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/create-event">Get Started</Link>
          </Button>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9c0 4.97 3.27 9 9 9s9-4.03 9-9Z" />
                  <path d="M10 8v6l4 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Events</h3>
              <p className="text-muted-foreground">
                Discover upcoming events that match your interests from our curated collection.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="m16 6 4 14" />
                  <path d="M12 6v14" />
                  <path d="M8 8v12" />
                  <path d="M4 4v16" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Attend</h3>
              <p className="text-muted-foreground">
                Sign up for events with a single click and join from anywhere, on any device.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Learn</h3>
              <p className="text-muted-foreground">
                Interact with speakers and attendees, expanding your network and knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
