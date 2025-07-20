"use client";

import type * as React from "react";
import { logout } from "@/actions/auth";
import {
  BarChart3,
  Calendar,
  Users,
  MessageSquare,
  BookOpen,
  Settings,
  Apple,
  ChevronDown,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  {
    title: "Dashboard",
    url: "#dashboard",
    icon: BarChart3,
  },
  {
    title: "Bookings",
    url: "#bookings",
    icon: Calendar,
  },
  {
    title: "Clients",
    url: "#clients",
    icon: Users,
  },
  {
    title: "Messages",
    url: "#messages",
    icon: MessageSquare,
  },
  {
    title: "Meal Plans",
    url: "#meal-plans",
    icon: BookOpen,
  },
  {
    title: "Settings",
    url: "#settings",
    icon: Settings,
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center space-x-3 px-2 py-4">
          <div className="h-10 w-10 bg-gradient-to-br from-sage-400 via-sage-500 to-sage-600 rounded-xl flex items-center justify-center shadow-lg">
            <Apple className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-sage-700 to-sage-500 bg-clip-text text-transparent">
              Admin Panel
            </span>
            <p className="text-xs text-sage-600">MissNutrition.Krisha</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/images/nutritionist-avatar.png"
                      alt="Krisha"
                    />
                    <AvatarFallback>K</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Krisha</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
