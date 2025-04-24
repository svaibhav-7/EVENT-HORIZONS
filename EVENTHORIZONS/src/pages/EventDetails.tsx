
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEvents } from "@/contexts/EventContext";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Share2, Bookmark, BookmarkCheck, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, registerForEvent, cancelRegistration, bookmarkEvent, removeBookmark, bookmarkedEvents } = useEvents();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const event = getEventById(id || "");
  
  if (!event) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/events">Browse Events</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const isBookmarked = bookmarkedEvents.includes(event.id);
  const isOrganizer = currentUser?.id === event.organizer.id;
  
  const handleRegister = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to register for events",
        variant: "destructive",
      });
      return;
    }
    
    const result = await registerForEvent(event.id);
    if (result) {
      toast({
        title: "Success!",
        description: `You've registered for ${event.title}`,
      });
    } else {
      toast({
        title: "Registration failed",
        description: "This event may be at capacity",
        variant: "destructive",
      });
    }
  };
  
  const handleCancelRegistration = async () => {
    const result = await cancelRegistration(event.id);
    if (result) {
      toast({
        title: "Registration cancelled",
        description: `You've cancelled your registration for ${event.title}`,
      });
    }
  };
  
  const handleBookmark = () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to bookmark events",
        variant: "destructive",
      });
      return;
    }
    
    if (isBookmarked) {
      removeBookmark(event.id);
      toast({
        title: "Bookmark removed",
        description: `${event.title} removed from your bookmarks`,
      });
    } else {
      bookmarkEvent(event.id);
      toast({
        title: "Event bookmarked",
        description: `${event.title} added to your bookmarks`,
      });
    }
  };
  
  const handleJoinConference = () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to join the conference",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/conference/${event.id}`);
  };
  
  const handleHostConference = () => {
    navigate(`/host-conference/${event.id}`);
  };
  
  // Calculate time until event
  const now = new Date();
  const eventDate = new Date(event.startDate);
  const timeUntil = eventDate.getTime() - now.getTime();
  const daysUntil = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
  
  // Check if event is live or upcoming
  const isLive = event.isLive;
  const isUpcoming = timeUntil > 0;
  
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/events" className="hover:text-primary">Events</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">{event.title}</span>
        </div>
        
        {/* Event Status */}
        {isLive && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-md inline-flex items-center mb-4">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse mr-2"></span>
            LIVE NOW
          </div>
        )}
        
        {/* Event Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <span>Hosted by {event.organizer.name}</span>
              <span className="mx-2">•</span>
              <span>{event.category}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark event"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-primary" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              aria-label="Share event"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner Image */}
            <div className="aspect-video rounded-lg bg-muted overflow-hidden">
              <img 
                src={event.image || "https://images.unsplash.com/photo-1538689621163-f5be0ad13ec7"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Description */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">About this event</h2>
                <p className="whitespace-pre-wrap">{event.description}</p>
              </CardContent>
            </Card>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/events?tags=${tag}`} 
                  className="text-sm bg-secondary rounded-full px-3 py-1 hover:bg-secondary/80"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Event Details Card */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                {/* Date & Time */}
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">{new Date(event.startDate).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}</p>
                    <p className="text-sm text-muted-foreground">
                      {daysUntil > 0 ? `${daysUntil} days from now` : 'Today!'}
                    </p>
                  </div>
                </div>
                
                {/* Time */}
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">{new Date(event.startDate).toLocaleTimeString('en-US', { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                    <p className="text-sm text-muted-foreground">
                      Duration: {event.duration || '60'} minutes
                    </p>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">Virtual Event</p>
                    <p className="text-sm text-muted-foreground">
                      Join link will be provided after registration
                    </p>
                  </div>
                </div>
                
                {/* Attendees */}
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">{event.currentAttendees} attending</p>
                    <p className="text-sm text-muted-foreground">
                      {event.maxCapacity - event.currentAttendees} spots remaining
                    </p>
                  </div>
                </div>
                
                {/* Price */}
                {event.price !== undefined && (
                  <div className="pt-2">
                    <p className="text-xl font-bold">
                      {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
                    </p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex-col items-stretch pt-2 pb-6 space-y-2">
                {isLive && !isOrganizer && (
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600" 
                    size="lg"
                    onClick={handleJoinConference}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Join Live Conference
                  </Button>
                )}
                
                {isLive && isOrganizer && (
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600" 
                    size="lg"
                    onClick={handleHostConference}
                  >
                    Manage Live Conference
                  </Button>
                )}
                
                {!isLive && isOrganizer && isUpcoming && (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleHostConference}
                  >
                    Host Conference
                  </Button>
                )}
                
                {!isLive && !isOrganizer && (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleRegister}
                  >
                    Register Now
                  </Button>
                )}
                
                {currentUser && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    You can cancel your registration up to 24 hours before the event
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetails;
