"use client";

import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/actions/notifications";
import { useRouter } from "next/navigation";

function useNotificationsQuery() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      // getNotifications is a server action, so we need to call it via fetch
      const notifications = await getNotifications();
      return notifications;
    },
    refetchInterval: 1000 * 60 * 2, // 2 minutes
  });
}

export function AdminHeader() {
  const router = useRouter();
  const { data: notifications, isLoading, error } = useNotificationsQuery();
  const unreadCount = notifications?.filter((n: any) => !n.read)?.length ?? 0;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search clients, bookings..."
              className="pl-8 w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
            onClick={() => router.push("/book-appointment")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs ">
                  <span className="">
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 align-middle border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></span>
                    ) : (
                      unreadCount
                    )}
                  </span>
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {isLoading ? (
                <div className="flex justify-center items-center py-4">
                  <span className="inline-block w-6 h-6 border-2 border-t-transparent border-gray-400 border-solid rounded-full animate-spin"></span>
                </div>
              ) : error ? (
                <div className="text-center text-danger py-4">
                  Failed to load notifications
                </div>
              ) : notifications?.length === 0 ? (
                <div className="text-center text-muted py-4">
                  No notifications
                </div>
              ) : (
                (notifications ?? []).map((notification: any) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="d-flex flex-column align-items-start"
                  >
                    <div className="fw-medium">
                      {notification.title ||
                        notification.type ||
                        "Notification"}
                    </div>
                    <div className="text-muted-foreground small">
                      {notification.message ||
                        notification.content ||
                        notification.description ||
                        "No details"}
                    </div>
                    <div className="text-muted-foreground small mt-1">
                      {notification.created_at
                        ? new Date(notification.created_at).toLocaleString()
                        : ""}
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
