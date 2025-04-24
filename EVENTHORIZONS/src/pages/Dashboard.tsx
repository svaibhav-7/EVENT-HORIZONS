
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, Clock, TrendingUp } from "lucide-react";

import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserEvents from "@/components/profile/UserEvents";

export default function Dashboard() {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading || !currentUser) {
    return (
      <MainLayout>
        <div className="container py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{getGreeting()}, {currentUser.name}</h1>
          <p className="text-muted-foreground mt-2">Welcome to your personalized dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Joined Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentUser.joinedEvents?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Events you've registered for
              </p>
            </CardContent>
          </Card>

          {currentUser.role === 'organizer' && (
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Created Events
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentUser.createdEvents?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  Events you've organized
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Upcoming Soon
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* This would be dynamically calculated in a real app */}
                {Math.floor(Math.random() * 3)}
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Events in the next 48 hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Recommended
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* This would be dynamically calculated in a real app */}
                {Math.floor(Math.random() * 5) + 3}
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Events that match your interests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate('/events')}>Browse Events</Button>
            <Button variant="outline" onClick={() => navigate('/profile')}>Edit Profile</Button>
            {currentUser.role === 'organizer' && (
              <Button variant="outline" onClick={() => navigate('/create-event')}>Create Event</Button>
            )}
          </div>
        </div>

        {/* Events Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Events</h2>
          <UserEvents userId={currentUser.id} userRole={currentUser.role} />
        </div>
      </div>
    </MainLayout>
  );
}
