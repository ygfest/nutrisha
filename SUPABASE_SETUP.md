# Supabase Setup Guide

## Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ipjecstoycigqpgiosax.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwamVjc3RveWNpZ3FwZ2lvc2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MDcwOTcsImV4cCI6MjA2NDE4MzA5N30.Nu17vAQW7SddllbFB0GY2KyrST0wHjTFt9kJe6wL9Wk
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Auth.js v5 Configuration
AUTH_SECRET=5KyzXKirEaMludehl2Kh6X1LT7FGzVx0UNWBkpwcseE=
```

## Getting the Service Role Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your "nutrisha" project
3. Go to Settings → API
4. Copy the "service_role" key (this is different from the anon key)
5. Add it to your `.env.local` file as `SUPABASE_SERVICE_ROLE_KEY`

## Database Setup

✅ Admin table has been created with the following structure:

- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## Authentication System

✅ **Auth.js v5 Authentication Implemented:**

- Auth.js v5 (NextAuth.js v5) with credentials provider
- Full Next.js 15 compatibility
- Protected admin routes with middleware
- Login page at `/admin/login`
- Automatic redirects for unauthenticated users
- Secure logout functionality
- No SessionProvider needed (server-side sessions)

## Test Credentials

Use these credentials to log in:

- **Email:** `admin@nutrisha.com`
- **Password:** `admin123`

## Creating Additional Admin Users

To create more admin users, use the `/api/create-admin` endpoint:

```bash
curl -X POST http://localhost:3000/api/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-secure-password"}'
```

**⚠️ Important:** Remove the `/api/create-admin` route in production for security.

## Access Control

- **Public Routes:** `/`, `/book-appointment`, etc.
- **Protected Routes:** `/admin/*` (requires authentication)
- **Login Page:** `/admin/login` (redirects to `/admin` if already logged in)

## Migration Completed

✅ Removed Prisma dependencies  
✅ Set up Supabase client with TypeScript types  
✅ Created Admin table in database  
✅ Implemented Auth.js v5 authentication  
✅ Added middleware for route protection  
✅ Created admin login page  
✅ Added logout functionality  
✅ Fixed Next.js 15 compatibility issues

The MCP Supabase server can now interact with your database, and the admin panel is properly secured with Auth.js v5 authentication that works seamlessly with Next.js 15.
