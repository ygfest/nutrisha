# Next.js 13+ Production-Grade Best Practices Guide

*A comprehensive guide for building scalable, maintainable, and SEO-optimized Next.js applications using App Router (2024-2025)*

## Table of Contents

1. [Project Structure & Organization](#project-structure--organization)
2. [Architecture Patterns & Design Principles](#architecture-patterns--design-principles)
3. [Component Design & Patterns](#component-design--patterns)
4. [Server vs Client Components](#server-vs-client-components)
5. [SEO Optimization](#seo-optimization)
6. [Performance Optimization](#performance-optimization)
7. [State Management](#state-management)
8. [Development Workflow](#development-workflow)
9. [Production Considerations](#production-considerations)
10. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## Project Structure & Organization

### Recommended Folder Structure

```
src/
├── app/                          # App Router (Next.js 13+)
│   ├── (auth)/                   # Route groups (doesn't affect URL)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   └── users/
│   │       └── route.ts
│   ├── [slug]/                   # Dynamic routes
│   │   └── page.tsx
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Loading UI
│   ├── error.tsx                 # Error UI
│   ├── not-found.tsx            # 404 page
│   └── page.tsx                  # Home page
├── components/                   # Shared components
│   ├── ui/                       # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── index.ts
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── navigation.tsx
│   ├── sections/                 # Page sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   └── contact-section.tsx
│   ├── features/                 # Feature-specific components
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── profile/
│   └── shared/                   # Shared utility components
│       ├── loading-spinner.tsx
│       └── error-boundary.tsx
├── lib/                          # Utility functions & configurations
│   ├── utils.ts                  # General utilities
│   ├── validations.ts            # Zod schemas
│   ├── auth.ts                   # Authentication config
│   ├── database.ts               # Database client
│   └── constants.ts              # App constants
├── hooks/                        # Custom React hooks
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── use-media-query.ts
├── types/                        # TypeScript type definitions
│   ├── auth.ts
│   ├── api.ts
│   └── global.d.ts
├── providers/                    # Context providers
│   ├── auth-provider.tsx
│   ├── theme-provider.tsx
│   └── query-provider.tsx
├── styles/                       # Additional styles
│   ├── globals.css
│   └── components.css
└── actions/                      # Server Actions (Next.js 13+)
    ├── auth.ts
    └── user.ts
```

### Key Principles

1. **Keep App Directory Clean**: Only put routing-related files in `app/`
2. **Feature-Based Organization**: Group related components by feature, not by type
3. **Logical Separation**: Separate UI components from business logic
4. **Scalable Structure**: Avoid deep nesting (max 3-4 levels)

---

## Architecture Patterns & Design Principles

### Clean Architecture Implementation

#### Layer Separation

```typescript
// Domain Layer (types/)
export interface User {
  id: string;
  email: string;
  name: string;
}

// Infrastructure Layer (lib/)
export class ApiClient {
  async getUser(id: string): Promise<User> {
    // Implementation
  }
}

// Application Layer (hooks/)
export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => apiClient.getUser(id)
  });
}

// Presentation Layer (components/)
export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <UserCard user={user} />;
}
```

### SOLID Principles in React

#### 1. Single Responsibility Principle
```typescript
// ❌ Bad: Component doing too much
function UserDashboard() {
  // Authentication logic
  // Data fetching
  // UI rendering
  // Form handling
}

// ✅ Good: Separated concerns
function UserDashboard() {
  return (
    <DashboardLayout>
      <UserProfile />
      <UserStats />
      <UserActions />
    </DashboardLayout>
  );
}
```

#### 2. Open/Closed Principle
```typescript
// ✅ Extensible without modification
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      {...props}
    />
  );
}
```

#### 3. Dependency Inversion
```typescript
// ✅ Depend on abstractions
interface StorageService {
  set(key: string, value: string): void;
  get(key: string): string | null;
}

function useStorage(storageService: StorageService) {
  // Use abstraction, not concrete implementation
}
```

---

## Component Design & Patterns

### Component Hierarchy

```typescript
// 1. Base UI Components (Atomic)
export function Button() { /* ... */ }
export function Input() { /* ... */ }

// 2. Composite Components (Molecular)
export function SearchBar() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search..." />
      <Button>Search</Button>
    </div>
  );
}

// 3. Feature Components (Organisms)
export function UserSearchModule() {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useUserSearch(query);

  return (
    <div>
      <SearchBar onSearch={setQuery} />
      {isLoading ? <LoadingSpinner /> : <UserList users={data} />}
    </div>
  );
}

// 4. Page Components (Templates)
export function UsersPage() {
  return (
    <PageLayout>
      <PageHeader title="Users" />
      <UserSearchModule />
    </PageLayout>
  );
}
```

### Component Patterns

#### 1. Compound Components
```typescript
const Tabs = {
  Root: ({ children, ...props }) => <div {...props}>{children}</div>,
  List: ({ children, ...props }) => <div role="tablist" {...props}>{children}</div>,
  Trigger: ({ children, ...props }) => <button role="tab" {...props}>{children}</button>,
  Content: ({ children, ...props }) => <div role="tabpanel" {...props}>{children}</div>,
};

// Usage
<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger>Tab 1</Tabs.Trigger>
    <Tabs.Trigger>Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content>Content 1</Tabs.Content>
  <Tabs.Content>Content 2</Tabs.Content>
</Tabs.Root>
```

#### 2. Render Props / Children as Function
```typescript
function DataFetcher<T>({
  url,
  children
}: {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}) {
  const { data, isLoading, error } = useFetch<T>(url);
  return children(data, isLoading, error);
}

// Usage
<DataFetcher url="/api/users">
  {(users, loading, error) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;
    return <UserList users={users} />;
  }}
</DataFetcher>
```

#### 3. Higher-Order Components (HOCs)
```typescript
function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <LoadingSpinner />;
    if (!user) return <LoginForm />;

    return <Component {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

---

## Server vs Client Components

### When to Use Server Components (Default)

```typescript
// ✅ Server Component - For SEO, static content, data fetching
export default async function BlogPost({ params }: { params: { slug: string } }) {
  // Fetch data on server
  const post = await getBlogPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Interactive parts as client components */}
      <LikeButton postId={post.id} />
      <CommentSection postId={post.id} />
    </article>
  );
}
```

### When to Use Client Components

```typescript
"use client";

// ✅ Client Component - For interactivity, hooks, browser APIs
export function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleLike = async () => {
    setLiked(!liked);
    setCount(prev => liked ? prev - 1 : prev + 1);
    // Optimistic update
    await likePost(postId);
  };

  return (
    <button onClick={handleLike} className={liked ? 'text-red-500' : 'text-gray-500'}>
      ❤️ {count}
    </button>
  );
}
```

### Mixed Component Strategy

```typescript
// Server Component (SEO-friendly)
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div>
      {/* Static, SEO-important content */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <ProductImages images={product.images} />

      {/* Interactive client components */}
      <AddToCartButton productId={product.id} />
      <ProductReviews productId={product.id} />
    </div>
  );
}
```

---

## SEO Optimization

### Metadata API (App Router)

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: 'article',
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
    alternates: {
      canonical: `https://yourdomain.com/blog/${params.slug}`,
    },
  };
}
```

### Structured Data

```typescript
// components/structured-data.tsx
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// Usage in page
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.featuredImage,
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <article>{/* content */}</article>
    </>
  );
}
```

### SEO Best Practices

1. **Server-Side Rendering**: Use Server Components for SEO-critical content
2. **Metadata Management**: Implement dynamic metadata generation
3. **Core Web Vitals**: Optimize LCP, FID, and CLS
4. **Image Optimization**: Use Next.js Image component
5. **Structured Data**: Implement JSON-LD for rich snippets

---

## Performance Optimization

### Code Splitting

```typescript
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('../components/HeavyComponent'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false // Client-side only if needed
  }
);

// Conditional loading
const AdminPanel = dynamic(
  () => import('../components/AdminPanel'),
  { ssr: false }
);

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {user?.isAdmin && <AdminPanel />}
    </div>
  );
}
```

### Memoization Strategies

```typescript
import { memo, useMemo, useCallback } from 'react';

// Component memoization
const ExpensiveComponent = memo(function ExpensiveComponent({
  data,
  onAction
}: {
  data: ComplexData[];
  onAction: (id: string) => void;
}) {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item),
    }));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <Item
          key={item.id}
          data={item}
          onClick={onAction}
        />
      ))}
    </div>
  );
});

// Parent component
export function DataList() {
  const [data, setData] = useState<ComplexData[]>([]);

  const handleAction = useCallback((id: string) => {
    // Handle action
  }, []);

  return <ExpensiveComponent data={data} onAction={handleAction} />;
}
```

### Image Optimization

```typescript
import Image from 'next/image';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        priority={product.featured} // For above-the-fold images
        placeholder="blur" // With blurDataURL
        blurDataURL="data:image/jpeg;base64,..." // Generate blur placeholder
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}
```

---

## State Management

### Server State vs Client State

```typescript
// Server State - Use TanStack Query
function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Client State - Use useState/useReducer
function useShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => [...prev, { id: product.id, quantity: 1 }]);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  return { items, addItem, removeItem };
}
```

### Global State Management

```typescript
// Context for shared state
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Form State Management

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUser(data);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name')}
        placeholder="Name"
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register('email')}
        type="email"
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

---

## Development Workflow

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint & Prettier Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### Git Hooks with Husky

```json
// package.json
{
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run type-check
```

---

## Production Considerations

### Environment Configuration

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  API_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

### Error Handling

```typescript
// lib/error-handler.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
```

### Monitoring & Analytics

```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // Track with your analytics service
    window.gtag?.('event', eventName, properties);
  }
}

// Usage
function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = () => {
    addToCart(product);
    trackEvent('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
    });
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

---

## Anti-Patterns to Avoid

### ❌ Don't Do These

1. **Massive Component Files**
```typescript
// ❌ 500+ lines in a single component
function Dashboard() {
  // Hundreds of lines of JSX and logic
}
```

2. **Props Drilling**
```typescript
// ❌ Passing props through multiple levels
function App() {
  const user = useUser();
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />;
}

function Navigation({ user }) {
  return <UserMenu user={user} />;
}
```

3. **Mixed Concerns in Components**
```typescript
// ❌ API calls, business logic, and UI in one component
function UserProfile() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser);
  }, []);

  const calculateAge = (birthDate) => {
    // Complex calculation logic
  };

  return (
    <div>
      {/* Lots of JSX */}
    </div>
  );
}
```

4. **Inefficient Re-renders**
```typescript
// ❌ Creating objects/functions in render
function ParentComponent() {
  return (
    <ChildComponent
      config={{ setting: 'value' }} // New object every render
      onClick={() => {}} // New function every render
    />
  );
}
```

### ✅ Better Approaches

1. **Modular Components**
```typescript
// ✅ Break down into smaller, focused components
function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts />
      <DashboardActions />
    </DashboardLayout>
  );
}
```

2. **Context for Shared State**
```typescript
// ✅ Use Context to avoid props drilling
const UserContext = createContext();

function App() {
  const user = useUser();
  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}

function UserMenu() {
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}
```

3. **Separation of Concerns**
```typescript
// ✅ Separate data fetching, business logic, and UI
function useUserProfile(userId: string) {
  return useQuery(['user', userId], () => fetchUser(userId));
}

function useAgeCalculation(birthDate: string) {
  return useMemo(() => calculateAge(birthDate), [birthDate]);
}

function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useUserProfile(userId);
  const age = useAgeCalculation(user?.birthDate);

  if (isLoading) return <UserProfileSkeleton />;

  return <UserProfileCard user={user} age={age} />;
}
```

---

## Conclusion

This guide provides a comprehensive foundation for building production-grade Next.js applications. Remember:

- **Start simple**: Don't over-engineer from the beginning
- **Iterate gradually**: Introduce patterns as your application grows
- **Measure performance**: Use tools like Lighthouse and Web Vitals
- **Prioritize maintainability**: Write code that your future self will thank you for
- **Stay updated**: Next.js evolves rapidly, keep up with the latest best practices

For the most current information, always refer to the [official Next.js documentation](https://nextjs.org/docs) and follow the Next.js team's recommendations.

*Last updated: January 2025*