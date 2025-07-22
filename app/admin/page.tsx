import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { BookingsTable } from "@/components/bookings-table";
import { RecentMessages } from "@/components/recent-messages";
import { QuickActions } from "@/components/quick-actions";
import { TodaysSchedule } from "@/components/todays-schedule";
import { WeeklyStats } from "@/components/weekly-stats";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { ClientsTable } from "./components/clients-table";

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
                <TodaysSchedule />

                {/* Performance Metrics */}
                <WeeklyStats />
              </div>
            </div>

            {/* Recent Messages */}
            <RecentMessages />
            <ClientsTable />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
