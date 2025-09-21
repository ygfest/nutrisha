# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nutrisha is a Next.js 15 application for a nutritionist/dietitian booking and consultation platform. The app provides appointment booking, admin management, and AI-powered nutrition chatbot functionality.

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint

# Note: TypeScript and ESLint errors are ignored during builds in next.config.mjs
```

## Architecture Overview

### Framework & Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom sage color theme
- **UI Components**: Radix UI + shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js v5 with credentials provider
- **State Management**: TanStack Query for server state
- **AI Integration**: OpenAI + Google Gemini APIs
- **Email**: EmailJS + Resend for notifications

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard pages
│   ├── book-appointment/  # Booking flow (hybrid SSR/CSR)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   └── [feature-components] # Feature-specific components
├── lib/                   # Utility libraries
│   ├── supabase.ts       # Database client
│   ├── auth.ts           # NextAuth configuration
│   ├── openai.ts         # OpenAI client
│   ├── gemini.ts         # Google Gemini client
│   └── types.ts          # TypeScript definitions
├── actions/               # Server Actions
├── hooks/                 # Custom React hooks
├── providers/             # React context providers
└── types/                # Global TypeScript types
```

### Key Architectural Patterns

#### Hybrid Rendering Strategy
The booking system uses a sophisticated hybrid approach:
- **Server Components**: Initial data loading, SEO content (app/book-appointment/page.tsx)
- **Client Components**: Interactive forms, real-time updates (booking-page-client.tsx)
- **Server Actions**: Simple data fetching (actions/booking-data.ts)
- **API Routes**: Complex operations, external integrations (app/api/*)

#### Data Fetching Patterns
- **TanStack Query**: Client-side state management with caching
- **Server Actions**: Direct database access for simple operations
- **API Routes**: Complex business logic and external service integration
- **Real-time availability**: Dynamic time slot fetching with automatic refresh

### Database Schema (Supabase)
Key tables:
- `Admin`: Admin user authentication
- `Bookings`: Appointment bookings with timezone handling
- `AppointmentTypes`: Service definitions
- Additional tables for clients and chat history

### Authentication Flow
- NextAuth.js v5 with credentials provider
- Bcrypt password hashing
- Session-based authentication for admin area
- Protected routes with middleware.ts

### Timezone Handling
- All times in Philippines timezone (Asia/Manila)
- Server-side timezone conversion using lib/timezone-utils.ts
- Proper "today" filtering for appointment availability

## Development Guidelines

### Path Aliases
Uses `@/*` alias pointing to root directory:
```typescript
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
```

### Component Patterns
- UI components follow shadcn/ui conventions
- Feature components in root `/components` directory
- Modals in `/components/modals/` subdirectory
- Email templates in `/components/email-templates/`

### Styling Conventions
- Tailwind CSS with custom `sage` color palette
- CSS variables for theme consistency
- Custom animations: fade-in, slide-up, accordion
- Responsive design with mobile-first approach

### Data Flow Best Practices
1. **Static Data**: Server Components with prefetching
2. **Interactive Data**: TanStack Query with optimistic updates
3. **Real-time Updates**: 5-minute stale time, 2-minute refetch interval
4. **Error Handling**: Proper loading states and error boundaries

### AI Integration
- Dual AI setup: OpenAI (primary) + Google Gemini (fallback)
- Chatbot component with nutrition-focused prompting
- Integration in `/components/ai-chatbot.tsx`

## Environment Setup

Required environment variables (see .env.local):
- Supabase credentials
- NextAuth secret and URL
- AI API keys (OpenAI, Google)
- Email service credentials
- Google Calendar/Meet integration

## Key Files for Understanding

1. **app/book-appointment/README.md** - Detailed booking architecture
2. **lib/supabase.ts** - Database configuration
3. **lib/auth.ts** - Authentication setup
4. **components/booking-calendar.tsx** - Core booking logic
5. **hooks/use-availability-query.ts** - Real-time availability hook

## Testing & Quality

- No specific test framework configured
- ESLint for code quality (errors ignored in builds)
- TypeScript strict mode for type safety
- Manual testing approach currently used