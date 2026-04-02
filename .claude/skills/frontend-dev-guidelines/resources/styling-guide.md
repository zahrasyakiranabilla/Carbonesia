# Styling Guide

Modern styling patterns using Tailwind CSS and shadcn/ui components.

---

## Tailwind CSS Utilities

### Primary Styling Method

**Use Tailwind utility classes for all styling:**

```typescript
// ✅ PREFERRED - Tailwind classes
<div className="flex p-4 gap-2">
  <div className="flex-1">Content</div>
</div>

// ❌ AVOID - Inline styles
<div style={{ display: 'flex', padding: '1rem', gap: '0.5rem' }}>
  <div style={{ flex: 1 }}>Content</div>
</div>
```

### Common Tailwind Patterns

**Flexbox Layout:**
```typescript
<div className="flex items-center justify-between gap-2">
  <span>Title</span>
  <Button>Action</Button>
</div>
```

**Grid Layout:**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>
```

**Spacing:**
```typescript
// Padding
<div className="p-4">     {/* All sides: 1rem (16px) */}
<div className="px-4">    {/* Horizontal only */}
<div className="py-4">    {/* Vertical only */}
<div className="pt-4 pr-2 pl-4">  {/* Specific sides */}

// Margin
<div className="m-4">     {/* All sides */}
<div className="mx-4">    {/* Horizontal */}
<div className="my-4">    {/* Vertical */}
<div className="mt-4">    {/* Top margin */}
<div className="mb-2">    {/* Bottom margin */}
```

**Responsive Design:**
```typescript
<div className="
  w-full
  md:w-1/2
  lg:w-1/3
  p-2 md:p-4 lg:p-6
">
  Responsive content
</div>
```

---

## shadcn/ui Components

### Component Library

**shadcn/ui** provides pre-styled, accessible components:

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
```

### Button Variants

```typescript
// Default button
<Button>Click me</Button>

// Variants
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">  {/* Icon only */}
  <PlusIcon />
</Button>

// Disabled
<Button disabled>Disabled</Button>

// Loading state
<Button disabled>
  {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? 'Saving...' : 'Save'}
</Button>

// Rendering a Link or other element (use `render` instead of `asChild`)
<Button variant="ghost" render={<Link to="/email/new"><PencilIcon />Compose</Link>} />
```

### Card Pattern

```typescript
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

---

## cn() Utility

### Conditional Classes

**Use `cn()` (classnames) for conditional styling:**

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'flex p-4',
  isActive && 'bg-primary text-primary-foreground',
  className
)}>
  Content
</div>
```

### With Component Props

```typescript
interface MyComponentProps {
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export const MyComponent: React.FC<MyComponentProps> = ({
  className,
  variant = 'default'
}) => {
  return (
    <div className={cn(
      'flex p-4 rounded-lg',
      {
        'bg-white': variant === 'default',
        'bg-primary text-primary-foreground': variant === 'primary',
        'bg-secondary': variant === 'secondary',
      },
      className
    )}>
      Content
    </div>
  );
};
```

---

## Class Variance Authority (cva)

### Component Variants

**For reusable components with variants:**

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render a custom element inside the button.
   * Use this instead of `asChild` when you need to render a different element
   * (e.g., Link, a, etc.) while maintaining button styling.
   *
   * @example
   * ```tsx
   * <Button variant="ghost" render={<Link to="/email/new"><PencilIcon />Compose</Link>} />
   * ```
   */
  render?: ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

---

## Layout Patterns

### Container Layout

```typescript
<div className="container mx-auto px-4 py-8">
  {/* Centered content with max-width */}
</div>
```

### Page Layout

```typescript
<div className="flex min-h-screen">
  {/* Sidebar */}
  <aside className="w-64 border-r p-4">
    <Sidebar />
  </aside>

  {/* Main content */}
  <main className="flex-1 p-6">
    <MainContent />
  </main>
</div>
```

### Grid Layout

```typescript
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => (
    <Card key={item.id}>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>
```

### Flex Layout

```typescript
<div className="flex items-center justify-between gap-4">
  <h1 className="text-2xl font-bold">Title</h1>
  <div className="flex gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </div>
</div>
```

---

## Theming

### CSS Variables

**shadcn uses CSS variables for theming:**

```css
/* In globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

### Using Theme Colors

```typescript
<div className="bg-background text-foreground">
  <div className="bg-primary text-primary-foreground">
    Primary button
  </div>
  <div className="bg-secondary text-secondary-foreground">
    Secondary
  </div>
  <div className="text-muted-foreground">
    Muted text
  </div>
  <div className="text-destructive">
    Error text
  </div>
</div>
```

---

## Typography

### Headings

```typescript
<h1 className="text-4xl font-bold">Heading 1</h1>
<h2 className="text-3xl font-bold">Heading 2</h2>
<h3 className="text-2xl font-semibold">Heading 3</h3>
<h4 className="text-xl font-semibold">Heading 4</h4>
<p className="text-base">Regular text</p>
<small className="text-sm">Small text</small>
```

### Text Utilities

```typescript
<p className="text-sm text-muted-foreground">
  Secondary text
</p>
<p className="font-medium">Medium weight</p>
<p className="font-semibold">Semibold</p>
<p className="font-bold">Bold</p>
<p className="tracking-tight">Tight tracking</p>
<p className="leading-relaxed">Relaxed leading</p>
```

---

## What NOT to Use

### ❌ Avoid These Patterns

```typescript
// ❌ makeStyles (MUI pattern)
import { makeStyles } from '@mui/styles';

// ❌ styled-components
import { styled } from 'styled-components';

// ❌ sx prop (MUI)
<Box sx={{ p: 2 }}>

// ❌ Inline styles
<div style={{ padding: '1rem' }}>

// ❌ MUI Grid
<Grid container spacing={2}>
  <Grid xs={12}>
```

---

## Code Style Standards

### Class Order

**Use consistent class order for readability:**

1. Layout: `flex`, `grid`, `block`, `inline`
2. Spacing: `p-4`, `m-2`, `gap-4`
3. Sizing: `w-full`, `h-screen`, `min-h-screen`
4. Typography: `text-lg`, `font-bold`, `text-center`
5. Colors: `bg-primary`, `text-white`
6. Responsive: `md:flex`, `lg:w-1/2`
7. States: `hover:bg-primary`, `disabled:opacity-50`

```typescript
<div className="
  flex items-center gap-4
  p-4
  w-full
  text-lg font-bold
  bg-primary text-white
  md:p-6
  hover:bg-primary/90
">
  Content
</div>
```

### Quotes

**Use single quotes for strings:**

```typescript
// ✅ CORRECT
className="flex p-4"
import { Button } from '@/components/ui/button';

// ❌ WRONG
className="flex p-4"
import { Button } from "@/components/ui/button";
```

---

## Common Component Patterns

### Form Layout

```typescript
<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter email" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" />
  </div>
  <Button className="w-full">Submit</Button>
</div>
```

### Data Display

```typescript
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>User Info</CardTitle>
      <Badge>Active</Badge>
    </div>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Name:</span>
        <span>John Doe</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Email:</span>
        <span>john@example.com</span>
      </div>
    </div>
  </CardContent>
</Card>
```

### Loading Skeleton

```typescript
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </CardContent>
</Card>
```

---

## Summary

**Styling Checklist:**
- ✅ Use Tailwind utility classes for all styling
- ✅ Use shadcn/ui components
- ✅ Use `cn()` for conditional classes
- ✅ Use `cva` for component variants
- ✅ Use CSS variables for theming
- ✅ Consistent class order
- ✅ Single quotes
- ❌ No MUI, styled-components, or inline styles

**See Also:**
- [component-patterns.md](component-patterns.md) - Component structure
- [complete-examples.md](complete-examples.md) - Full styling examples
