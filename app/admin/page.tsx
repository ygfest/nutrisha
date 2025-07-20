"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { BookingsTable } from "@/components/bookings-table";
import { RecentMessages } from "@/components/recent-messages";
import { QuickActions } from "@/components/quick-actions";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar, Clock } from "lucide-react";
import {
  getDashboardStats,
  getWeeklyStats,
  getTodaysBookings,
} from "@/actions/dashboard";
import type { Booking } from "@/lib/types";

export default function AdminPage() {
  const [todaysBookings, setTodaysBookings] = useState<Booking[]>([]);
  const [weeklyStats, setWeeklyStats] = useState({
    consultations: 0,
    newClients: 0,
    aiInteractions: 0,
    cancellations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookings, stats] = await Promise.all([
          getTodaysBookings(),
          getWeeklyStats(),
        ]);
        setTodaysBookings(bookings);
        setWeeklyStats(stats);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getBookingColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "initial consultation":
        return "bg-sage-50 border-sage-200";
      case "follow-up":
        return "bg-yellow-50 border-yellow-200";
      case "meal planning":
        return "bg-blue-50 border-blue-200";
      case "sports nutrition":
        return "bg-green-50 border-green-200";
      case "health assessment":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getBookingTextColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "initial consultation":
        return "text-sage-600";
      case "follow-up":
        return "text-yellow-600";
      case "meal planning":
        return "text-blue-600";
      case "sports nutrition":
        return "text-green-600";
      case "health assessment":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/30 to-white">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />

          <main className="flex-1 space-y-6 p-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, Krisha!
                </h1>
                <p className="text-gray-600 mt-1">
                  Here's what's happening with your nutrition practice today.
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-sage-500 to-sage-600 text-white px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Badge>
            </div>

            {/* Dashboard Stats */}
            <DashboardStats />

            {/* Quick Actions */}
            <QuickActions />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bookings Table - Takes 2 columns */}
              <div className="lg:col-span-2">
                <BookingsTable />
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Today's Schedule */}
                <Card className="border-sage-100">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-sage-600" />
                      <span>Today's Schedule</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                          <div key={index} className="animate-pulse">
                            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                              <div className="space-y-2 flex-1">
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              </div>
                              <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : todaysBookings.length === 0 ? (
                      <div className="text-center py-6">
                        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">
                          No appointments today
                        </p>
                        <p className="text-gray-400 text-sm">
                          Enjoy your free day!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {todaysBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${getBookingColor(
                              booking.type
                            )}`}
                          >
                            <div>
                              <div className="font-medium text-gray-900">
                                {booking.client?.name || "Unknown Client"}
                              </div>
                              <div className="text-sm text-gray-600">
                                {booking.type}
                              </div>
                            </div>
                            <div
                              className={`text-sm font-medium ${getBookingTextColor(
                                booking.type
                              )}`}
                            >
                              {formatTime(booking.time)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="border-sage-100">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      This Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div
                            key={index}
                            className="animate-pulse flex items-center justify-between"
                          >
                            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Consultations
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {weeklyStats.consultations}
                            </span>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-green-600">+15%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            New Clients
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {weeklyStats.newClients}
                            </span>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-green-600">+33%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            AI Interactions
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {weeklyStats.aiInteractions}
                            </span>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-green-600">+45%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Cancellations
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {weeklyStats.cancellations}
                            </span>
                            {weeklyStats.cancellations === 0 ? (
                              <>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-xs text-green-600">
                                  Perfect!
                                </span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="h-4 w-4 text-red-500" />
                                <span className="text-xs text-red-600">
                                  -50%
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Messages */}
            <RecentMessages />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
