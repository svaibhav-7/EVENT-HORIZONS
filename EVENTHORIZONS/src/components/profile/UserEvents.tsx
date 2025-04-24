
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Users, Edit, PlusCircle } from "lucide-react";
import { format } from "date-fns";

import { events, Event } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserEventsProps {
  userId: string;
  userRole: 'attendee' | 'organizer' | 'admin';
}

export default function UserEvents({ userId, userRole }: UserEventsProps) {
  const { currentUser } = useAuth();
  
  // Get user events based on role
  const userCreatedEvents = events.filter(
    (event) => event.organizer.id === userId
  );
  
  const userJoinedEvents = currentUser?.joinedEvents
    ? events.filter((event) => 
        currentUser.joinedEvents?.includes(event.id)
      )
    : [];
  
  // Format date for display
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPP");
  };

  // Format time for display
  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "h:mm a");
  };

  const renderEventCard = (event: Event) => (
    <Card key={event.id} className="overflow-hidden">
      <div 
        className="h-32 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${event.image || '/placeholder.svg'})` 
        }}
      />
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="line-clamp-1">
              {event.description}
            </CardDescription>
          </div>
          <Badge variant={event.isPublic ? "default" : "outline"}>
            {event.isPublic ? "Public" : "Private"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatEventDate(event.startDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatEventTime(event.startDate)} - {formatEventTime(event.endDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{event.currentAttendees}/{event.maxCapacity} attendees</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link to={`/events/${event.id}`}>View Details</Link>
        </Button>
        
        {userRole === 'organizer' && event.organizer.id === userId && (
          <Button asChild size="sm">
            <Link to={`/events/edit/${event.id}`}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      {(userRole === 'organizer' || userRole === 'admin') && (
        <div className="flex justify-end">
          <Button asChild>
            <Link to="/create-event">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
            </Link>
          </Button>
        </div>
      )}
      
      {userRole === 'organizer' ? (
        <Tabs defaultValue="created">
          <TabsList>
            <TabsTrigger value="created">Created Events</TabsTrigger>
            <TabsTrigger value="joined">Joined Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="created" className="mt-6">
            {userCreatedEvents.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userCreatedEvents.map(renderEventCard)}
              </div>
            ) : (
              <div className="text-center p-12 border rounded-lg">
                <h3 className="text-xl font-medium mb-2">No events created yet</h3>
                <p className="text-muted-foreground mb-6">Start organizing your first event now</p>
                <Button asChild>
                  <Link to="/create-event">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Event
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="joined" className="mt-6">
            {userJoinedEvents.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userJoinedEvents.map(renderEventCard)}
              </div>
            ) : (
              <div className="text-center p-12 border rounded-lg">
                <h3 className="text-xl font-medium mb-2">No events joined yet</h3>
                <p className="text-muted-foreground mb-6">Browse events to find something interesting</p>
                <Button asChild>
                  <Link to="/events">Browse Events</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        // For attendees, just show joined events
        <div>
          <h2 className="text-xl font-semibold mb-4">Events You've Joined</h2>
          {userJoinedEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userJoinedEvents.map(renderEventCard)}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No events joined yet</h3>
              <p className="text-muted-foreground mb-6">Browse events to find something interesting</p>
              <Button asChild>
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
