import { NextResponse } from "next/server";
import {
  getNowInManila,
  getTodayInManila,
  isTodayInManila,
} from "@/lib/timezone-utils";

export async function GET() {
  const now = new Date();
  const manilaNow = getNowInManila();
  const todayInManila = getTodayInManila();

  // Test with July 21, 2025
  const testDate = "2025-07-21";
  const isTestDateToday = isTodayInManila(testDate);

  return NextResponse.json({
    currentTime: {
      local: now.toISOString(),
      manila: manilaNow.toISOString(),
    },
    todayInManila,
    testDate,
    isTestDateToday,
    debug: {
      localDate: now.toDateString(),
      manilaDate: manilaNow.toDateString(),
      localHours: now.getHours(),
      manilaHours: manilaNow.getHours(),
    },
  });
}
