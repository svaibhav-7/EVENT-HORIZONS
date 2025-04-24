import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/contexts/EventContext";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Tag, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const { currentUser } = useAuth();
  const { createEvent } = useEvents();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [duration, setDuration] = useState("60");
  const [maxCapacity, setMaxCapacity] = useState("100");
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) {
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!date) {
        toast({
          title: "Error",
          description: "Please select a valid date",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Combine date and time
      const eventDateTime = new Date(date);
      const [hours, minutes] = time.split(":").map(Number);
      eventDateTime.setHours(hours, minutes);
      
      const formattedTags = tags.split(",").map(tag => tag.trim());
      
      const newEvent = await createEvent({
        title,
        description,
        category,
        tags: formattedTags,
        startDate: eventDateTime.toISOString(),
        duration: parseInt(duration),
        maxCapacity: parseInt(maxCapacity),
        price: 0, // Free by default
        isFeatured: false
      });
      
      toast({
        title: "Success!",
        description: "Your event has been created successfully."
      });
      
      // Auto-redirect to host conference page for immediate start
      navigate(`/host-conference/${newEvent.id}`);
      
    } catch (error) {
      toast({
        title: "Error creating event",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Create a New Event</h1>
        <p className="text-muted-foreground mb-8">Set up your virtual event in minutes and start connecting with your audience</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Details */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Event Title *
                      </label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter event title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description *
                      </label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your event"
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-1">
                          Category *
                        </label>
                        <Select value={category} onValueChange={setCategory} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Health">Health</SelectItem>
                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                            <SelectItem value="Networking">Networking</SelectItem>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Conference">Conference</SelectItem>
                            <SelectItem value="Webinar">Webinar</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label htmlFor="tags" className="block text-sm font-medium mb-1">
                          Tags (comma separated)
                        </label>
                        <div className="flex">
                          <Tag className="mr-2 h-4 w-4 opacity-50 self-center" />
                          <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. coding, webinar, react"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Date & Time */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Date & Time</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Date *
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium mb-1">
                          Time *
                        </label>
                        <div className="flex">
                          <Clock className="mr-2 h-4 w-4 opacity-50 self-center" />
                          <Input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="duration" className="block text-sm font-medium mb-1">
                          Duration (minutes) *
                        </label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="90">1.5 hours</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="180">3 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label htmlFor="maxCapacity" className="block text-sm font-medium mb-1">
                          Max Capacity *
                        </label>
                        <div className="flex">
                          <Users className="mr-2 h-4 w-4 opacity-50 self-center" />
                          <Input
                            id="maxCapacity"
                            type="number"
                            min="1"
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => navigate("/events")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create & Start Event"}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Info Panel */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Tips for a successful event</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Choose a clear, descriptive title</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Add detailed description to attract attendees</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Select relevant tags to improve discoverability</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Set a realistic duration for your content</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You'll be able to start your event immediately after creation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateEvent;