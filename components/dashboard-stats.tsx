"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Total Clients",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "This Month's Bookings",
    value: "89",
    change: "+23%",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Revenue",
    value: "₱45,000",
    change: "+8%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "AI Chat Messages",
    value: "1,234",
    change: "+45%",
    changeType: "positive" as const,
    icon: MessageSquare,
  },
  {
    title: "Success Rate",
    value: "94%",
    change: "+2%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Avg Session Time",
    value: "52 min",
    change: "+5 min",
    changeType: "positive" as const,
    icon: Clock,
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="border-sage-100 hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-sage-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-sage-600 mt-1">
              <span className="text-green-600">{stat.change}</span> from last
              month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
