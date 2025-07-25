"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getWeeklyStats } from "@/actions/dashboard";

export function WeeklyStats() {
  const { data: weeklyStats, isLoading } = useQuery({
    queryKey: ["weekly-stats"],
    queryFn: getWeeklyStats,
    staleTime: 1000 * 60 * 5,
    //refetchOnWindowFocus: false,
    refetchOnMount: false,
    //refetchOnReconnect: false,
    //retry: false,
  });

  // Percentage change compared to last week (positive => up, negative => down)
  const consultationsChangePercent =
    weeklyStats?.consultationsChangePercent ?? 0;
  const consultationsTrendUp = consultationsChangePercent >= 0;

  return (
    <Card className="border-sage-100">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">
          This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
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
              <span className="text-sm text-gray-600">Consultations</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  {weeklyStats?.consultations || 0}
                </span>
                {consultationsTrendUp ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-xs ${consultationsTrendUp ? "text-green-600" : "text-red-600"}`}
                >
                  {consultationsTrendUp ? "+" : ""}
                  {Math.abs(consultationsChangePercent).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">New Clients</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  {weeklyStats?.newClients || 0}
                </span>
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-600">+33%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Interactions</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  {weeklyStats?.aiInteractions || 0}
                </span>
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-600">+45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cancellations</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  {weeklyStats?.cancellations || 0}
                </span>
                {weeklyStats?.cancellations === 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600">Perfect!</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-red-600">-50%</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
