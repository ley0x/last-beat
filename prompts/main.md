## 🛠 Main Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + `tailwind-merge` + `class-variance-authority`
- **UI primitives**: Radix UI (`@radix-ui/react-*`)
- **State & data**:
  - React Query (`@tanstack/react-query`)
  - Jotai for lightweight global state
  - Zod for validation / type-safe typing
- **Forms**: React Hook Form + `@hookform/resolvers`
- **Icons**: Lucide React
- **Utilities**:
  - `clsx` for class composition
  - `slugify`, `uuid`
  - `sonner` for notifications
- **Theming**: `next-themes` (dark/light mode)

---

## 🚧 Architecture and Conventions

1. **App Router**
   - Folder organization:
     ```
     /src/app
            ├─ layout.tsx
            ├─ page.tsx
            ├─ stats/
            │   ├─ layout.tsx
            │   ├─ page.tsx
            │   ├─ loading.tsx
            │   └─ error.tsx
            └─ api/
                └─ lastfm/
                    └─ route.ts
     ```
   - **Server vs Client Components**
     - By default, files are Server Components (`.tsx`); add `"use client"` at the top of Client Components.
     - Example:
       ```ts
       // src/app/dashboard/page.tsx (Server)
       import { getRecentBeats } from "@/lib/api";
       
       export default async function DashboardPage() {
         const beats = await getRecentBeats();
         return <BeatList beats={beats} />;
       }
       ```
       ```tsx
       // src/app/dashboard/components/BeatList.tsx (Client)
       "use client";
       import { useQuery } from "@tanstack/react-query";
       import { BeatCard } from "./BeatCard";

       export function BeatList() {
         const { data, isLoading } = useQuery(["beats"], fetchBeats);
         if (isLoading) return <p>Loading…</p>;
         return (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {data.map(b => <BeatCard key={b.id} beat={b} />)}
           </div>
         );
       }
       ```
2. **API Routes**
   - `route.ts` file with `GET`, `POST`, etc. handlers.
   - Always type `Request` / `Response` and validate payloads with Zod.

---

## 🧹 Best Practices & Clean Code

- **Separation of Responsibilities**  
  - Each component does a single thing (Single Responsibility Principle).  
  - Prefer small, reusable components with well-typed props.
- **Strict Typing**  
  - Always type your functions, props, hook returns, etc.  
  - Use `z.infer<typeof schema>` to tie Zod schemas to TypeScript types.
- **Server & Client-side Validation**  
  - Use Zod in API routes and `@hookform/resolvers/zod` in forms.
- **Utility Classes**  
  - Use `cn(...classes)` (e.g. from `class-variance-authority` + `clsx`) to compose Tailwind classes.
- **Accessibility (a11y)**  
  - Always add `aria-*`, explicit labels, and roles when needed.  
  - Leverage Radix UI for built‑in a11y support.
- **Layout & Metadata Files**  
  - Export a `metadata` object in `layout.tsx` for SEO and dynamic page titles.
