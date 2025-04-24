
import React, { useState } from "react";
import { useEvents, EventFilters } from "@/contexts/EventContext";
import MainLayout from "@/components/layout/MainLayout";
import EventCard from "@/components/events/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Calendar, 
  ArrowUpDown,
  Check
} from "lucide-react";

const Events = () => {
  const { events, filterEvents } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [sortBy, setSortBy] = useState<"date" | "popularity" | "price">("date");
  
  const categories = [...new Set(events.map(event => event.category))];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const applyFilters = () => {
    const filters: EventFilters = {
      search: searchTerm,
      category: selectedCategory || undefined,
      price: priceFilter,
      sortBy
    };
    
    return filterEvents(filters);
  };
  
  const filteredEvents = applyFilters();
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Discover Events</h1>
        
        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Search */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </div>
          
          {/* Sort Options */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setSortBy("date")}
            >
              <Calendar className="mr-1 h-4 w-4" />
              Date
              {sortBy === "date" && <Check className="ml-1 h-3 w-3" />}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setSortBy("popularity")}
            >
              <ArrowUpDown className="mr-1 h-4 w-4" />
              Popular
              {sortBy === "popularity" && <Check className="ml-1 h-3 w-3" />}
            </Button>
          </div>
        </div>
        
        {/* Filters and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedCategory("");
                      setPriceFilter("all");
                    }}
                  >
                    Reset
                  </Button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Filter className="h-4 w-4 mr-1" /> Categories
                  </h3>
                  <div className="space-y-1">
                    <Button 
                      variant={selectedCategory === "" ? "default" : "ghost"} 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory("")}
                    >
                      All Categories
                      {selectedCategory === "" && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                    
                    {categories.map(category => (
                      <Button 
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                        {selectedCategory === category && <Check className="ml-auto h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Price */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Price</h3>
                  <div className="space-y-1">
                    <Button 
                      variant={priceFilter === "all" ? "default" : "ghost"} 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setPriceFilter("all")}
                    >
                      All
                      {priceFilter === "all" && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                    <Button 
                      variant={priceFilter === "free" ? "default" : "ghost"} 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setPriceFilter("free")}
                    >
                      Free
                      {priceFilter === "free" && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                    <Button 
                      variant={priceFilter === "paid" ? "default" : "ghost"} 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setPriceFilter("paid")}
                    >
                      Paid
                      {priceFilter === "paid" && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Events Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
              </h2>
            </div>
            
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-muted/40 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setPriceFilter("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
