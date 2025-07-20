// Utility functions for Philippines timezone handling

export const PHILIPPINES_TIMEZONE = "Asia/Manila";

/**
 * Get current date and time in Philippines timezone
 */
export function getNowInManila(): Date {
  // Get the current time in Manila timezone
  const now = new Date();
  const manilaOffset = 8 * 60; // Manila is UTC+8
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const manilaTime = new Date(utc + manilaOffset * 60000);
  return manilaTime;
}

/**
 * Get today's date string in Philippines timezone (YYYY-MM-DD format)
 */
export function getTodayInManila(): string {
  return getNowInManila().toISOString().split("T")[0];
}

/**
 * Format a date to Philippines timezone
 */
export function formatDateInManila(
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleDateString("en-US", {
    timeZone: PHILIPPINES_TIMEZONE,
    ...options,
  });
}

/**
 * Format time to Philippines timezone
 */
export function formatTimeInManila(
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleTimeString("en-US", {
    timeZone: PHILIPPINES_TIMEZONE,
    ...options,
  });
}

/**
 * Check if a given date string is today in Philippines timezone
 */
export function isTodayInManila(dateString: string): boolean {
  const manilaNow = getNowInManila();
  const today = getTodayInManila();

  // Parse the input date string to get year, month, day
  const [year, month, day] = dateString.split("-").map(Number);

  // Compare with Manila time components
  const isToday =
    year === manilaNow.getFullYear() &&
    month === manilaNow.getMonth() + 1 &&
    day === manilaNow.getDate();

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === "development") {
    console.log(
      `Date comparison: ${dateString} (${year}-${month}-${day}) vs Manila today (${manilaNow.getFullYear()}-${manilaNow.getMonth() + 1}-${manilaNow.getDate()}) = ${isToday}`
    );
  }

  return isToday;
}
