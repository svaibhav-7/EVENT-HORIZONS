
import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Event } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useEvents } from "@/contexts/EventContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EventCardProps {
  event: Event;
  showActions?: boolean;
}

export default function EventCard({ event, showActions = true }: EventCardProps) {
  const { currentUser } = useAuth();
  const { bookmarkedEvents, bookmarkEvent, removeBookmark } = useEvents();
  
  const isBookmarked = bookmarkedEvents.includes(event.id);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy • h:mm a");
  };
  
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isBookmarked) {
      removeBookmark(event.id);
    } else {
      bookmarkEvent(event.id);
    }
  };

  return (
    <Card className="event-card h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        <img
          src={event.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=869&auto=format&fit=crop"}
          alt={event.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2">
          {event.price === 0 ? (
            <Badge className="bg-green-500 hover:bg-green-600">Free</Badge>
          ) : (
            <Badge className="bg-blue-500 hover:bg-blue-600">${event.price}</Badge>
          )}
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between">
          <Badge variant="outline">{event.category}</Badge>
          <span className="text-sm text-muted-foreground">
            {`${event.currentAttendees}/${event.maxCapacity}`}
          </span>
        </div>
        <CardTitle className="mt-2 line-clamp-1">
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {formatDate(event.startDate)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2 flex-grow">
        <p className="text-sm line-clamp-2">{event.description}</p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {event.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {event.tags.length > 3 && <span className="text-xs text-muted-foreground">+{event.tags.length - 3}</span>}
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="p-4 pt-2 flex justify-between items-center">
          <Button variant="outline" size="sm" className="text-sm" asChild>
            <Link to={`/events/${event.id}`}>View Details</Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBookmarkToggle}
            className="h-8 w-8"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
