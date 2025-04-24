
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Users, Video, Calendar, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About EventHorizons</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Revolutionizing virtual events by connecting people worldwide 
            through seamless video conferencing and event management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/events">Browse Events</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 px-6 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At EventHorizons, we believe that meaningful connections shouldn't be limited by physical distance. 
                Our platform is designed to break down geographical barriers and create immersive virtual event 
                experiences that rival in-person gatherings.
              </p>
              <p className="text-muted-foreground">
                Our mission is to democratize access to knowledge sharing, networking, and community building 
                through a platform that puts user experience and connection at its core.
              </p>
            </div>
            <div className="bg-accent p-8 rounded-lg">
              <blockquote className="text-xl italic">
                EventHorizons transforms how we think about virtual events. It's not just about video calling; 
                it's about creating meaningful connections in a digital space.
                <footer className="mt-4 font-medium"></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 md:px-8 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose EventHorizons</h2>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="bg-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">HD Video & Audio</h3>
              <p className="text-muted-foreground">
                Crystal clear video and audio quality ensures your virtual events feel as engaging as in-person meetings.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community-Focused</h3>
              <p className="text-muted-foreground">
                Our platform emphasizes engagement and interaction, helping you build and nurture your community.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">
                Connect with participants from around the world without geographical limitations.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-muted-foreground">
                Our intuitive tools make scheduling and managing events effortless for hosts and attendees alike.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security ensures your events and data remain protected at all times.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Low Latency</h3>
              <p className="text-muted-foreground">
                Our optimized infrastructure provides seamless experiences with minimal delay.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-6 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Vaibhav", avatar: "V" },
              { name: "Pushpa",  avatar: "P" },
              
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 md:px-8 bg-gradient">
        <div className="container mx-auto text-center text-white max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to host your next virtual event?</h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of organizers who trust EventHorizons to connect with their audiences.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
