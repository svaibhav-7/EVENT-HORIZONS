
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "@/contexts/EventContext";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Play, Settings, Users, Calendar, Clock } from "lucide-react";

const HostConference = () => {
  const { id } = useParams();
  const { getEventById, updateEvent } = useEvents();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  
  const event = getEventById(id || "");
  
  if (!event) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-6">The event you're trying to host doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/events">Browse Events</a>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // Check if user is the organizer
  const isOrganizer = currentUser?.id === event.organizer.id;
  
  if (!isOrganizer) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
          <p className="mb-6">You don't have permission to host this event.</p>
          <Button asChild>
            <a href={`/events/${id}`}>View Event Details</a>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const startConference = async () => {
    // In a real app, we would create a conference room here
    toast({
      title: "Starting conference",
      description: "Initializing virtual conference room..."
    });
    
    // Update event status to "live" (in a real app)
    await updateEvent(event.id, { isLive: true });
    
    // Redirect to the conference page
    navigate(`/conference/${id}`);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <MainLayout>
      <div className="container py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Host: {event.title}</h1>
            <p className="text-muted-foreground">Prepare to start your virtual event</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700"
            size="lg"
            onClick={startConference}
          >
            <Play className="mr-2 h-4 w-4" /> Start Conference
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Event Info Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">{formatDate(event.startDate)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{event.duration || '60'} minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">Attendees</p>
                  <p className="text-sm text-muted-foreground">
                    {event.currentAttendees} registered ({event.maxCapacity - event.currentAttendees} spots remaining)
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm">{event.description}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Host Controls Card */}
          <Card>
            <CardHeader>
              <CardTitle>Host Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={`/events/${id}`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Conference Settings
                </a>
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Attendees
              </Button>
            </CardContent>
            <CardFooter className="flex-col items-stretch">
              <p className="text-sm text-muted-foreground mb-4">
                When you start the conference, registered attendees will be able to join.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default HostConference;
