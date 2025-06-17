# Cursor Instructions for Last Beat

## Code Generation Guidelines

### Component Creation

When creating components, always:

- Use TypeScript with proper interface definitions
- Follow shadcn/ui patterns and styling
- Include className prop for customization
- Use the `cn()` utility for conditional classes
- Implement proper accessibility attributes
- Add JSDoc comments for complex components
- Never use React.FC for components but prefer functional components with typing arguments directly

### Data Fetching Strategy

- **READ operations**: Always use TanStack Query with proper query keys
- **MUTATIONS**: Use Next.js Server Actions with proper validation
- **Client state**: Use Jotai atoms for global state
- **Form state**: Use React Hook Form with Zod validation

### Error Handling

- Implement proper error boundaries for components
- Use TanStack Query's error handling capabilities
- Provide meaningful error messages to users
- Log errors appropriately for debugging

### Performance Optimization

- Use React.memo for expensive components
- Implement proper loading states
- Use dynamic imports for code splitting
- Optimize images with Next.js Image component

## File Organization

### Component Structure

```txt
components/
├── ui/           # shadcn/ui components
├── forms/        # Form-specific components
├── layout/       # Layout components
└── features/     # Feature-specific components
```

### Business Logic Structure

```txt
src/
├── services/              # Service layer abstractions
├── hooks/                 # Custom React hooks
├── lib/                   # Internal library code
│   ├── store.ts           # Jotai atoms and stores
│   ├── schemas.ts         # Zod validation schemas
│   ├── types.ts           # TypeScript type definitions
└───└── utils.ts           # Utility functions
```

## Coding Patterns

### Component Pattern

```typescript
type ComponentProps = {
  className?: string
  // Other props
}

export function Component({ className, ...props }: ComponentProps) {
  return (
    <div className={cn('default-styles', className)}>
      {/* Component content */}
    </div>
  )
}
```

### Hook Pattern

```typescript
export function useCustomHook() {
  // Hook implementation
  return {
    // Return object with named properties
  }
}
```

### Schema Pattern

```typescript
export const schemaName = z.object({
  // Schema definition
})

export type SchemaType = z.infer<typeof schemaName>
```

### API Pattern

```typescript
export async function fetchData(params: ParamsType) {
  // API implementation with proper error handling
}
```

### Server Action Pattern

```typescript
'use server'

export async function serverAction(data: FormData) {
  // Validation and mutation logic
  // Always revalidate relevant paths
}
```

## Import Organization

### Import Order

1. React and Next.js imports
2. Third-party library imports
3. Internal component imports
4. Internal utility imports
5. Type imports (using `import type`)

### Example

```typescript
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { cn } from '@lib/utils'
import type { User } from '@lib/types'
```

## Best Practices

### TypeScript

- Use strict type checking
- Prefer interfaces over types for object shapes
- Use union types for specific value sets
- Implement proper generic constraints
- Use const assertions where appropriate

### Styling

- Use Tailwind utility classes
- Follow the design system defined by shadcn/ui
- Use CSS variables for theming
- Implement responsive design with Tailwind breakpoints
- Use the `cn()` utility for conditional styling

### State Management

- Keep state as local as possible
- Use Jotai for global client state
- Use TanStack Query for server state
- Implement proper loading and error states
- Use optimistic updates where appropriate

### Forms

- Always validate with Zod schemas
- Use React Hook Form for form state
- Implement proper error handling
- Use Server Actions for form submissions
- Provide clear validation messages

## Testing Considerations

### Component Testing

- Test component rendering
- Test user interactions
- Test accessibility features
- Mock external dependencies
- Use proper TypeScript types in tests

### Hook Testing

- Test hook behavior in isolation
- Test edge cases and error states
- Mock dependencies appropriately
- Verify proper cleanup

## Security Guidelines

### Input Validation

- Always validate inputs with Zod schemas
- Sanitize user-generated content
- Use proper TypeScript types for type safety
- Implement rate limiting where appropriate

### Authentication & Authorization

- Prepare for Better Auth integration
- Implement proper session management
- Use secure cookie settings
- Validate permissions on server side

## Performance Guidelines

### Code Splitting

- Use dynamic imports for large components
- Implement route-based code splitting
- Use React.lazy for component-level splitting
- Optimize bundle sizes with webpack analysis

### Caching

- Use TanStack Query caching effectively
- Implement proper cache invalidation
- Use Next.js caching strategies
- Optimize database queries (future: Drizzle)

## Accessibility Guidelines

### WCAG Compliance

- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation works
- Provide alternative text for images
- Use proper color contrast ratios

### Screen Reader Support

- Use proper heading hierarchy
- Implement skip links
- Provide descriptive labels
- Use landmarks appropriately
