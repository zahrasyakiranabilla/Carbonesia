---
name: frontend-dev-guidelines
description: Frontend development guidelines for React/TypeScript applications. Modern patterns including Suspense, lazy loading, useSuspenseQuery, file organization with features directory, shadcn/ui components, Tailwind CSS styling, TanStack Router, performance optimization, TypeScript best practices, and kebab-case file naming convention. Use when creating components, pages, features, fetching data, styling, routing, or working with frontend code.
---

# Frontend Development Guidelines

## Purpose

Comprehensive guide for modern React development, emphasizing Suspense-based data fetching, lazy loading, proper file organization, and performance optimization.

## When to Use This Skill

- Creating new components or pages
- Building new features
- Fetching data with TanStack Query
- Setting up routing with TanStack Router
- Styling components with Tailwind CSS
- Using shadcn/ui components
- Performance optimization
- Organizing frontend code
- TypeScript best practices

---

## Quick Start

### New Component Checklist

Creating a component? Follow this checklist:

- [ ] Use `React.FC<Props>` pattern with TypeScript
- [ ] Lazy load if heavy component: `React.lazy(() => import())`
- [ ] Wrap in `<SuspenseLoader>` for loading states
- [ ] Use `useSuspenseQuery` for data fetching
- [ ] Import aliases: `@/`, `~types`, `~components`, `~features`
- [ ] Styles: Use Tailwind CSS utility classes
- [ ] Use `useCallback` for event handlers passed to children
- [ ] Default export at bottom
- [ ] No early returns with loading spinners
- [ ] Use `toast` from sonner for user notifications
- [ ] Forms: Use TanStack Form + Zod (see Form Conventions below)

### New Feature Checklist

Creating a feature? Set up this structure:

- [ ] Create `features/{feature-name}/` directory (use kebab-case for naming)
- [ ] Create subdirectories: `api/`, `components/`, `hooks/`, `helpers/`, `types/`
- [ ] Create API service file: `api/{feature-name}Api.ts` (kebab-case, e.g., `auth-api.ts`)
- [ ] Set up TypeScript types in `types/`
- [ ] Create route in `routes/{feature-name}/index.tsx`
- [ ] Lazy load feature components
- [ ] Use Suspense boundaries
- [ ] Export public API from feature `index.ts`
- [ ] Name all files in kebab-case (e.g., `login-page.tsx`, `use-auth.tsx`)

---

## Import Aliases Quick Reference

| Alias         | Resolves To      | Example                                                        |
| ------------- | ---------------- | -------------------------------------------------------------- |
| `@/`          | `src/`           | `import { fetcher } from '@/lib/fetcher'`                      |
| `~types`      | `src/types`      | `import type { User } from '~types/user'`                      |
| `~components` | `src/components` | `import { SuspenseLoader } from '~components/suspense-loader'` |
| `~features`   | `src/features`   | `import { authApi } from '~features/auth'`                     |

Defined in: [vite.config.ts](../../vite.config.ts) lines 180-185

### Import Path Rules

**NEVER use deep relative imports** (more than `../../`). Use path aliases instead:

```typescript
// ❌ BAD - Deep relative imports are hard to read and maintain

// ✅ GOOD - Use path aliases
import { Something } from "@/features/something"

import { Other } from "@/components/other"

import { Other } from "../../../../components/other"
import { Something } from "../../../features/something"
```

**Maximum allowed relative imports:**

- Same directory: `./component` ✓
- Parent directory: `../component` ✓
- Grandparent: `../../component` ✓ (acceptable but prefer alias)
- **Never use `../../../` or deeper** ✗ (always use `@/` alias)

---

## Common Imports Cheatsheet

```typescript
// React & Lazy Loading
import React, { useCallback, useMemo, useState } from "react"
// TanStack Query (Suspense)
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
// TanStack Router
import { createFileRoute } from "@tanstack/react-router"
// Project Components
import { SuspenseLoader } from "~components/suspense-loader"
// Types
import type { Post } from "~types/post"
import { toast } from "sonner"

// Hooks
import { useAuth } from "@/hooks/use-auth"
// shadcn/ui Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const Heavy = React.lazy(() => import("./heavy-component"))
```

**Note:** All files use kebab-case naming (e.g., `heavy-component.tsx`, `use-auth.tsx`)

---

### 📄 Pagination Types

Use global pagination types for all paginated list responses:

```typescript
import type { PaginatedFilters, PaginatedResponse } from "@/types"

// API response type
interface EmployeeListResponse extends PaginatedResponse<Employee> {}
// Results in: { data: Employee[], meta: PaginationMeta }

// Filter params with pagination
interface EmployeeFilters extends PaginatedFilters {
  role?: "admin" | "employee"
}
// Includes: page, limit, search
```

**Available Types:**

| Type                   | Purpose                                   | Location  |
| ---------------------- | ----------------------------------------- | --------- |
| `PaginationMeta`       | Metadata (page, limit, total, totalPages) | `@/types` |
| `PaginatedResponse<T>` | Generic wrapper for paginated data        | `@/types` |
| `PaginationParams`     | Basic page/limit params                   | `@/types` |
| `PaginatedFilters`     | Includes search + pagination              | `@/types` |

---

## Topic Guides

### 🎨 Component Patterns

**Modern React components use:**

- `React.FC<Props>` for type safety
- `React.lazy()` for code splitting
- `SuspenseLoader` for loading states
- Named const + default export pattern

**Key Concepts:**

- Lazy load heavy components (DataGrid, charts, editors)
- Always wrap lazy components in Suspense
- Use SuspenseLoader component (with fade animation)
- Component structure: Props → Hooks → Handlers → Render → Export

**[📖 Complete Guide: resources/component-patterns.md](resources/component-patterns.md)**

---

### 📊 Data Fetching

**PRIMARY PATTERN: useSuspenseQuery**

- Use with Suspense boundaries
- Cache-first strategy (check grid cache before API)
- Replaces `isLoading` checks
- Type-safe with generics

**API Service Layer:**

- Create `features/{feature}/api/{feature}Api.ts`
- Use `fetcher` utility or native `fetch`
- Centralized methods per feature
- Route format: `/form/route` (NOT `/api/form/route`)

**[📖 Complete Guide: resources/data-fetching.md](resources/data-fetching.md)**

---

### 📁 File Organization

**Naming Convention: Kebab-Case**

- All files and folders should use kebab-case naming
- Examples: `login-page.tsx`, `use-auth.tsx`, `auth-api.ts`, `my-feature/`
- Avoid: PascalCase (`LoginPage.tsx`), camelCase (`useAuth.tsx`), snake_case (`use_auth.tsx`)

**features/ vs components/:**

- `features/`: Domain-specific (posts, comments, auth)
- `components/`: Truly reusable (SuspenseLoader, CustomAppBar)

**Feature Subdirectories:**

```
features/
  my-feature/         # kebab-case folder name
    api/
      my-feature-api.ts    # kebab-case file name
    components/
      login-page.tsx       # kebab-case file name
    hooks/
      use-auth.tsx         # kebab-case file name
    helpers/
      auth-helpers.ts
    schemas/
      auth-schema.ts       # Zod schemas for validation
    types/
      index.ts
```

**[📖 Complete Guide: resources/file-organization.md](resources/file-organization.md)**

---

### 🎨 Styling

**Tailwind CSS:**

- Use Tailwind utility classes for all styling
- Use `cn()` utility for conditional classes
- Use CSS variables for theming (via shadcn)
- Use shadcn class variance authority (cva) for component variants

**Example:**

```typescript
<div className="flex p-4 gap-2">
  <Card className="w-full">
    <CardContent className="p-4">
      Content
    </CardContent>
  </Card>
</div>
```

**[📖 Complete Guide: resources/styling-guide.md](resources/styling-guide.md)**

---

### 🛣️ Routing

**TanStack Router - Folder-Based:**

- Directory: `routes/my-route/index.tsx` (kebab-case naming)
- Lazy load components
- Use `createFileRoute`
- Breadcrumb data in loader

**Example:**

```typescript
import { lazy } from "react"
import { createFileRoute } from "@tanstack/react-router"

const MyPage = lazy(() => import("@/features/my-feature/components/my-page"))

export const Route = createFileRoute("/my-route/")({
  component: MyPage,
  loader: () => ({ crumb: "My Route" }),
})
```

**[📖 Complete Guide: resources/routing-guide.md](resources/routing-guide.md)**

---

### ⏳ Loading & Error States

**CRITICAL RULE: No Early Returns**

```typescript
// ❌ NEVER - Causes layout shift
if (isLoading) {
    return <LoadingSpinner />;
}

// ✅ ALWAYS - Consistent layout
<SuspenseLoader>
    <Content />
</SuspenseLoader>
```

**Why:** Prevents Cumulative Layout Shift (CLS), better UX

**Error Handling:**

- Use `toast` from sonner for user feedback
- TanStack Query `onError` callbacks

**[📖 Complete Guide: resources/loading-and-error-states.md](resources/loading-and-error-states.md)**

---

### ⚡ Performance

**Optimization Patterns:**

- `useMemo`: Expensive computations (filter, sort, map)
- `useCallback`: Event handlers passed to children
- `React.memo`: Expensive components
- Debounced search (300-500ms)
- Memory leak prevention (cleanup in useEffect)

**[📖 Complete Guide: resources/performance.md](resources/performance.md)**

---

### 📘 TypeScript

**Standards:**

- Strict mode, no `any` type
- Explicit return types on functions
- Type imports: `import type { User } from '~types/user'`
- Component prop interfaces with JSDoc

**[📖 Complete Guide: resources/typescript-standards.md](resources/typescript-standards.md)**

---

### 🔧 Common Patterns

**Covered Topics:**

- TanStack Form with Zod validation (see below)
- DataGrid wrapper contracts
- Dialog component standards
- `useAuth` hook for current user
- Mutation patterns with cache invalidation

**[📖 Complete Guide: resources/common-patterns.md](resources/common-patterns.md)**

---

### 📝 Form Conventions (TanStack Form + Zod)

**REQUIRED: All forms must use TanStack Form with Zod validation**

This project uses `@tanstack/react-form` for form state management and `zod` for schema validation. All forms must follow these conventions.

#### 1. Zod Schema Location

Create a `schemas/` directory in your feature folder and define Zod schemas:

```
features/
  employee/
    schemas/
      employee-schema.ts   # Zod schemas for employee forms
    components/
      employee-form.tsx
```

#### 2. Zod Schema Pattern

```typescript
import * as z from "zod"

export const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
})

export type CreateEmployeeFormValues = z.infer<typeof createEmployeeSchema>
```

#### 3. TanStack Form Implementation

```tsx
/* eslint-disable react/no-children-prop */
"use client"

import { Button } from "@repo/ui/components/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { useForm } from "@tanstack/react-form"

import { createEmployeeSchema } from "../schemas/employee-schema"
import type { CreateEmployeeFormValues } from "../schemas/employee-schema"

export function EmployeeForm({ onSubmit }: EmployeeFormProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: createEmployeeSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value as CreateEmployeeFormValues)
    },
  })

  return (
    <form
      id="employee-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Nama Lengkap</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Masukkan nama lengkap"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="nama@email.com"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>

      <Button type="submit" form="employee-form">
        Submit
      </Button>
    </form>
  )
}
```

#### 4. Required Components

Always use these shadcn/ui components for forms:

| Component          | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `Field`            | Wraps form field with layout and error styling |
| `FieldLabel`       | Label for form inputs                          |
| `FieldError`       | Displays validation errors                     |
| `FieldGroup`       | Groups multiple fields                         |
| `FieldDescription` | Helper text below input                        |
| `Input`            | Text input component                           |
| `Textarea`         | Multi-line text input                          |
| `Select`           | Dropdown select                                |
| `Checkbox`         | Checkbox input                                 |
| `Switch`           | Toggle switch                                  |

#### 5. Form Validation Rules

- **Client-side validation**: Use Zod schema with `validators: { onSubmit: schema }`
- **Validation mode**: Triggers on submit by default
- **Error display**: Show errors only when field is touched (`isTouched`) and invalid (`!isValid`)
- **Accessibility**: Add `aria-invalid={isInvalid}` to all form inputs
- **Accessibility**: Add `data-invalid={isInvalid}` to `Field` component

#### 6. Field Pattern

```tsx
<form.Field
  name="fieldName"
  children={(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>Label Text</FieldLabel>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
        />
        <FieldDescription>Helper text here</FieldDescription>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    )
  }}
/>
```

#### 7. Select/Checkbox/Switch Pattern

For Select, Checkbox, and Switch components, use `onValueChange` instead of `onChange`:

```tsx
// Select
<Select
  name={field.name}
  value={field.state.value}
  onValueChange={field.handleChange}
>
  <SelectTrigger aria-invalid={isInvalid}>
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>...</SelectContent>
</Select>

// Checkbox
<Checkbox
  name={field.name}
  checked={field.state.value}
  onCheckedChange={field.handleChange}
  aria-invalid={isInvalid}
/>

// Switch
<Switch
  name={field.name}
  checked={field.state.value}
  onCheckedChange={field.handleChange}
  aria-invalid={isInvalid}
/>
```

#### 8. Array Fields (for multi-select checkboxes)

Use `mode="array"` for checkbox arrays:

```tsx
<form.Field
  name="notifications"
  mode="array"
  children={(field) => (
    <FieldGroup data-slot="checkbox-group">
      {options.map((option) => (
        <Field key={option.id} orientation="horizontal">
          <Checkbox
            checked={field.state.value.includes(option.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                field.pushValue(option.id)
              } else {
                const index = field.state.value.indexOf(option.id)
                if (index > -1) {
                  field.removeValue(index)
                }
              }
            }}
          />
          <FieldLabel>{option.label}</FieldLabel>
        </Field>
      ))}
    </FieldGroup>
  )}
/>
```

#### 9. Dependencies

These packages are already installed:

- `@tanstack/react-form` (in dashboard app)
- `zod` (in dashboard app and ui package)

#### 10. Why TanStack Form?

- **Headless**: Complete control over markup and styling
- **Zod integration**: Native schema validation
- **No re-renders**: Minimal unnecessary updates
- **Accessible**: Built-in ARIA support
- **Type-safe**: Full TypeScript support

---

### 📚 Complete Examples

**Full working examples:**

- Modern component with all patterns
- Complete feature structure
- API service layer
- Route with lazy loading
- Suspense + useSuspenseQuery
- Form with validation

**[📖 Complete Guide: resources/complete-examples.md](resources/complete-examples.md)**

---

## Navigation Guide

| Need to...             | Read this resource                                                   |
| ---------------------- | -------------------------------------------------------------------- |
| Create a component     | [component-patterns.md](resources/component-patterns.md)             |
| Fetch data             | [data-fetching.md](resources/data-fetching.md)                       |
| Organize files/folders | [file-organization.md](resources/file-organization.md)               |
| Style components       | [styling-guide.md](resources/styling-guide.md)                       |
| Set up routing         | [routing-guide.md](resources/routing-guide.md)                       |
| Handle loading/errors  | [loading-and-error-states.md](resources/loading-and-error-states.md) |
| Optimize performance   | [performance.md](resources/performance.md)                           |
| TypeScript types       | [typescript-standards.md](resources/typescript-standards.md)         |
| Build forms            | Form Conventions (above)                                             |
| Forms/Auth/DataGrid    | [common-patterns.md](resources/common-patterns.md)                   |
| See full examples      | [complete-examples.md](resources/complete-examples.md)               |

---

## Core Principles

1. **Lazy Load Everything Heavy**: Routes, DataGrid, charts, editors
2. **Suspense for Loading**: Use SuspenseLoader, not early returns
3. **useSuspenseQuery**: Primary data fetching pattern for new code
4. **Features are Organized**: api/, components/, hooks/, helpers/ subdirs
5. **Styles with Tailwind**: Use Tailwind utility classes
6. **Import Aliases**: Use @/, ~types, ~components, ~features
7. **No Early Returns**: Prevents layout shift
8. **toast**: For all user notifications (sonner)
9. **TanStack Form + Zod**: All forms must use TanStack Form with Zod validation

---

## Quick Reference: File Structure

```
src/
  features/
    my-feature/         # kebab-case naming
      api/
        my-feature-api.ts   # kebab-case naming
      components/
        my-component.tsx    # kebab-case naming
        sub-component.tsx
      hooks/
        use-my-hook.tsx     # kebab-case naming
        use-suspense-my-feature.tsx
      helpers/
        my-feature-helpers.ts
      types/
        index.ts
      index.ts              # Public exports

  components/
    suspense-loader/
      suspense-loader.tsx   # kebab-case naming
    custom-app-bar/
      custom-app-bar.tsx

  routes/
    my-route/
      index.tsx             # Route component
      create/
        index.tsx           # Nested route
```

---

## Modern Component Template (Quick Copy)

```typescript
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSuspenseQuery } from '@tanstack/react-query';
import { featureApi } from '../api/feature-api';
import { toast } from 'sonner';
import type { FeatureData } from '~types/feature';

interface MyComponentProps {
    id: number;
    onAction?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ id, onAction }) => {
    const [state, setState] = useState<string>('');

    const { data } = useSuspenseQuery({
        queryKey: ['feature', id],
        queryFn: () => featureApi.getFeature(id),
    });

    const handleAction = useCallback(() => {
        setState('updated');
        onAction?.();
    }, [onAction]);

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <h2>My Component</h2>
                </CardHeader>
                <CardContent>
                    {/* Content */}
                </CardContent>
            </Card>
        </div>
    );
};

export default MyComponent;
```

**Note:** File should be named `my-component.tsx` (kebab-case)

For complete examples, see [resources/complete-examples.md](resources/complete-examples.md)

---

## Related Skills

- **error-tracking**: Error tracking with Sentry (applies to frontend too)
- **backend-dev-guidelines**: Backend API patterns that frontend consumes

---

**Skill Status**: Modular structure with progressive loading for optimal context management
