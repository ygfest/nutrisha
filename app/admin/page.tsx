"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { BookingsTable } from "@/components/bookings-table";
import { RecentMessages } from "@/components/recent-messages";
import { QuickActions } from "@/components/quick-actions";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";

export default function AdminPage() {
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
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-sage-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            Sarah Johnson
                          </div>
                          <div className="text-sm text-gray-600">
                            Initial Consultation
                          </div>
                        </div>
                        <div className="text-sm font-medium text-sage-600">
                          10:00 AM
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            Michael Chen
                          </div>
                          <div className="text-sm text-gray-600">Follow-up</div>
                        </div>
                        <div className="text-sm font-medium text-yellow-600">
                          2:00 PM
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            Team Meeting
                          </div>
                          <div className="text-sm text-gray-600">
                            Weekly Review
                          </div>
                        </div>
                        <div className="text-sm font-medium text-blue-600">
                          4:00 PM
                        </div>
                      </div>
                    </div>
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
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Consultations
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">23</span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600">+15%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          New Clients
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">8</span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600">+33%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          AI Interactions
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">156</span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600">+45%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Cancellations
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">2</span>
                          <TrendingDown className="h-4 w-4 text-red-500" />
                          <span className="text-xs text-red-600">-50%</span>
                        </div>
                      </div>
                    </div>
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
