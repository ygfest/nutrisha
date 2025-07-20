"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Clock,
} from "lucide-react";
import { getDashboardStats } from "@/actions/dashboard";
import type { DashboardStats } from "@/lib/types";

interface StatItem {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<any>;
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const calculateChange = (
    current: number,
    previous: number
  ): { change: string; changeType: "positive" | "negative" } => {
    if (previous === 0) {
      return {
        change: current > 0 ? "+100%" : "0%",
        changeType: current > 0 ? "positive" : "negative",
      };
    }

    const percentage = Math.round(((current - previous) / previous) * 100);
    return {
      change: `${percentage >= 0 ? "+" : ""}${percentage}%`,
      changeType: percentage >= 0 ? "positive" : "negative",
    };
  };

  const formatCurrency = (amount: number): string => {
    return `₱${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="border-sage-100 animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-sage-100">
          <CardContent className="p-6">
            <p className="text-center text-gray-500">
              Failed to load dashboard statistics
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statItems: StatItem[] = [
    {
      title: "Total Clients",
      value: stats.total_clients.toString(),
      ...calculateChange(stats.total_clients, stats.previous_total_clients),
      icon: Users,
    },
    {
      title: "This Month's Bookings",
      value: stats.monthly_bookings.toString(),
      ...calculateChange(
        stats.monthly_bookings,
        stats.previous_monthly_bookings
      ),
      icon: Calendar,
    },
    {
      title: "Revenue",
      value: formatCurrency(stats.monthly_revenue),
      ...calculateChange(stats.monthly_revenue, stats.previous_monthly_revenue),
      icon: DollarSign,
    },
    {
      title: "AI Chat Messages",
      value: stats.ai_chat_messages.toString(),
      ...calculateChange(
        stats.ai_chat_messages,
        stats.previous_ai_chat_messages
      ),
      icon: MessageSquare,
    },
    {
      title: "Success Rate",
      value: `${stats.success_rate}%`,
      ...calculateChange(stats.success_rate, stats.previous_success_rate),
      icon: TrendingUp,
    },
    {
      title: "Avg Session Time",
      value: `${stats.avg_session_time} min`,
      ...calculateChange(
        stats.avg_session_time,
        stats.previous_avg_session_time
      ),
      icon: Clock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statItems.map((stat) => (
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
              <span
                className={
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {stat.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
