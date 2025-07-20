# Booking Page Architecture

## Overview

This booking page follows Next.js + TanStack Query best practices by utilizing React Server Components for initial data loading and Client Components only where interactivity is needed.

## Architecture

### 📄 `page.tsx` (Server Component)

- **Purpose**: Server-side data prefetching and hydration setup
- **Responsibilities**:
  - Creates QueryClient for the request
  - Prefetches static data (appointment types, time slots)
  - Sets up HydrationBoundary for client-side hydration
  - Provides loading skeleton

### 🎯 `booking-page-client.tsx` (Client Component)

- **Purpose**: Interactive booking flow
- **Responsibilities**:
  - Multi-step booking form logic
  - User interactions and state management
  - TanStack Query mutations for booking submission
  - Real-time validation and error handling

### 🔄 Data Flow

```
1. Server Component (page.tsx)
   ↓ Prefetches static data (appointment types)
   ↓ Creates QueryClient
   ↓ Sets up HydrationBoundary

2. Client Component (booking-page-client.tsx)
   ↓ Receives hydrated data
   ↓ Handles user interactions
   ↓ Uses TanStack Query for mutations

3. BookingCalendar Component
   ↓ Uses useAvailabilityQuery hook
   ↓ Fetches real-time availability from database
   ↓ Updates automatically when date changes

4. Server Actions (/actions/booking-data.ts)
   ↓ Provides server-side data fetching
   ↓ Dynamic availability checking

5. API Routes (/api/availability, /api/bookings)
   ↓ Real-time availability data
   ↓ Booking submissions and complex operations
```

## Benefits

### ✅ **Server Components Benefits**

- **Better SEO**: Content rendered on server
- **Faster Initial Load**: Pre-rendered HTML
- **Reduced Bundle Size**: Server code doesn't ship to client
- **Direct Database Access**: No API layer needed for reads

### ✅ **TanStack Query Benefits**

- **Optimistic Updates**: Better UX during mutations
- **Automatic Retries**: Network error resilience
- **Loading States**: Built-in pending/error states
- **Caching**: Efficient data management

### ✅ **Hybrid Architecture Benefits**

- **Best of Both Worlds**: SSR performance + client interactivity
- **Progressive Enhancement**: Works without JavaScript
- **Optimal Performance**: Server renders static, client handles dynamic

## When to Use What

### Use Server Components for:

- ✅ Initial data loading
- ✅ Static content rendering
- ✅ SEO-critical content
- ✅ Database queries

### Use Client Components for:

- ✅ User interactions
- ✅ Form submissions
- ✅ Real-time updates
- ✅ Browser APIs

### Use Server Actions for:

- ✅ Simple data fetching
- ✅ Form mutations
- ✅ Database operations
- ✅ Server-side logic

### Use API Routes for:

- ✅ Complex operations
- ✅ External integrations
- ✅ Webhooks
- ✅ Third-party APIs

## Performance Optimizations

1. **Prefetching**: Static data loaded on server
2. **Hydration**: Seamless client takeover
3. **Real-time Availability**: Dynamic time slot fetching from database
4. **Smart Caching**: 5-minute stale time for availability data
5. **Auto-refresh**: Availability updates every 2 minutes
6. **Bundle Splitting**: Only interactive code on client
7. **Streaming**: Progressive loading with Suspense

## Real-time Availability Features

### ✅ **Database-driven Time Slots**

- Fetches actual availability from Supabase
- Considers existing bookings and their durations
- Automatically filters out past time slots for today
- Includes 30-minute booking buffer

### ✅ **Smart Query Management**

- Uses TanStack Query for efficient data fetching
- Automatic retry logic for network failures
- Background refetching to keep data fresh
- Proper error handling and loading states

### ✅ **Philippines Timezone Support**

- All times displayed in Philippines time (Asia/Manila)
- Server-side timezone handling for accurate availability
- Proper handling of "today" filtering in Manila time

## Best Practices Followed

1. **Separation of Concerns**: Server vs Client responsibilities
2. **Progressive Enhancement**: Works without JavaScript
3. **Type Safety**: Full TypeScript support
4. **Error Boundaries**: Graceful error handling
5. **Loading States**: Better user experience
6. **Accessibility**: Proper focus management and ARIA labels
