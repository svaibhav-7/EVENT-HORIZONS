import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, events as mockEvents, saveToLocalStorage, getFromLocalStorage } from '@/data/mockData';
import { useAuth } from './AuthContext';

interface EventContextType {
  events: Event[];
  featuredEvents: Event[];
  userEvents: Event[];
  registeredEvents: Event[];
  bookmarkedEvents: string[];
  isLoading: boolean;
  createEvent: (eventData: Omit<Event, 'id' | 'currentAttendees' | 'organizer'>) => Promise<Event>;
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<Event | null>;
  deleteEvent: (id: string) => Promise<boolean>;
  registerForEvent: (eventId: string) => Promise<boolean>;
  cancelRegistration: (eventId: string) => Promise<boolean>;
  bookmarkEvent: (eventId: string) => void;
  removeBookmark: (eventId: string) => void;
  getEventById: (id: string) => Event | undefined;
  filterEvents: (filters: EventFilters) => Event[];
}

export interface EventFilters {
  category?: string;
  tags?: string[];
  search?: string;
  startDate?: string;
  endDate?: string;
  price?: 'free' | 'paid' | 'all';
  sortBy?: 'date' | 'popularity' | 'price';
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load saved data on mount
  useEffect(() => {
    const savedEvents = getFromLocalStorage('events');
    if (savedEvents) {
      setEvents(savedEvents);
    } else {
      saveToLocalStorage('events', mockEvents);
    }

    if (currentUser) {
      const savedBookmarks = getFromLocalStorage(`bookmarks_${currentUser.id}`);
      if (savedBookmarks) {
        setBookmarkedEvents(savedBookmarks);
      }

      const savedRegistrations = getFromLocalStorage(`registrations_${currentUser.id}`);
      if (savedRegistrations) {
        setRegisteredEventIds(savedRegistrations);
      }
    }

    setIsLoading(false);
  }, [currentUser]);

  // Computed properties
  const featuredEvents = events.filter(event => event.isFeatured);
  
  const userEvents = currentUser && currentUser.role === 'organizer' 
    ? events.filter(event => event.organizer.id === currentUser.id)
    : [];
  
  const registeredEvents = events.filter(event => 
    registeredEventIds.includes(event.id)
  );

  // Event CRUD operations
  const createEvent = async (eventData: Omit<Event, 'id' | 'currentAttendees' | 'organizer'>): Promise<Event> => {
    if (!currentUser) {
      throw new Error('You must be logged in to create an event');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newEvent: Event = {
      ...eventData,
      id: `event_${Date.now()}`,
      currentAttendees: 0,
      organizer: {
        id: currentUser.id,
        name: currentUser.name
      }
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveToLocalStorage('events', updatedEvents);

    return newEvent;
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) return null;

    const updatedEvent = { ...events[eventIndex], ...eventData };
    const updatedEvents = [...events];
    updatedEvents[eventIndex] = updatedEvent;

    setEvents(updatedEvents);
    saveToLocalStorage('events', updatedEvents);

    return updatedEvent;
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    saveToLocalStorage('events', updatedEvents);

    return true;
  };

  // Event registration
  const registerForEvent = async (eventId: string): Promise<boolean> => {
    if (!currentUser) return false;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return false;

    if (events[eventIndex].currentAttendees >= events[eventIndex].maxCapacity) {
      return false; // Event is at capacity
    }

    // Update event attendee count
    const updatedEvent = {
      ...events[eventIndex],
      currentAttendees: events[eventIndex].currentAttendees + 1
    };

    const updatedEvents = [...events];
    updatedEvents[eventIndex] = updatedEvent;
    setEvents(updatedEvents);
    saveToLocalStorage('events', updatedEvents);

    // Add to user's registered events
    const updatedRegistrations = [...registeredEventIds, eventId];
    setRegisteredEventIds(updatedRegistrations);
    saveToLocalStorage(`registrations_${currentUser.id}`, updatedRegistrations);

    return true;
  };

  const cancelRegistration = async (eventId: string): Promise<boolean> => {
    if (!currentUser) return false;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return false;

    // Update event attendee count
    const updatedEvent = {
      ...events[eventIndex],
      currentAttendees: Math.max(0, events[eventIndex].currentAttendees - 1)
    };

    const updatedEvents = [...events];
    updatedEvents[eventIndex] = updatedEvent;
    setEvents(updatedEvents);
    saveToLocalStorage('events', updatedEvents);

    // Remove from user's registered events
    const updatedRegistrations = registeredEventIds.filter(id => id !== eventId);
    setRegisteredEventIds(updatedRegistrations);
    saveToLocalStorage(`registrations_${currentUser.id}`, updatedRegistrations);

    return true;
  };

  // Bookmarks
  const bookmarkEvent = (eventId: string) => {
    if (!currentUser) return;

    const updatedBookmarks = [...bookmarkedEvents, eventId];
    setBookmarkedEvents(updatedBookmarks);
    saveToLocalStorage(`bookmarks_${currentUser.id}`, updatedBookmarks);
  };

  const removeBookmark = (eventId: string) => {
    if (!currentUser) return;

    const updatedBookmarks = bookmarkedEvents.filter(id => id !== eventId);
    setBookmarkedEvents(updatedBookmarks);
    saveToLocalStorage(`bookmarks_${currentUser.id}`, updatedBookmarks);
  };

  // Get event by ID
  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  // Filter events
  const filterEvents = (filters: EventFilters) => {
    return events.filter(event => {
      // Filter by category
      if (filters.category && event.category !== filters.category) {
        return false;
      }

      // Filter by tags (any match)
      if (filters.tags && filters.tags.length > 0) {
        if (!event.tags.some(tag => filters.tags?.includes(tag))) {
          return false;
        }
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(searchTerm);
        const matchesDescription = event.description.toLowerCase().includes(searchTerm);
        
        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }

      // Filter by start date
      if (filters.startDate && new Date(event.startDate) < new Date(filters.startDate)) {
        return false;
      }

      // Filter by end date
      if (filters.endDate && new Date(event.startDate) > new Date(filters.endDate)) {
        return false;
      }

      // Filter by price
      if (filters.price === 'free' && (event.price && event.price > 0)) {
        return false;
      }

      if (filters.price === 'paid' && (!event.price || event.price === 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort events
      if (filters.sortBy === 'date') {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      }
      
      if (filters.sortBy === 'popularity') {
        return b.currentAttendees - a.currentAttendees;
      }
      
      if (filters.sortBy === 'price') {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceA - priceB;
      }
      
      // Default sort by date
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  };

  const value = {
    events,
    featuredEvents,
    userEvents,
    registeredEvents,
    bookmarkedEvents,
    isLoading,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    cancelRegistration,
    bookmarkEvent,
    removeBookmark,
    getEventById,
    filterEvents
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
