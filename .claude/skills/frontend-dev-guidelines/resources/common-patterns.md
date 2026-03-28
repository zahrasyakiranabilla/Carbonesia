# Common Patterns

Frequently used patterns for forms, authentication, DataGrid, dialogs, and other common UI elements.

---

## Authentication with useAuth

### Getting Current User

```typescript
import { useAuth } from '@/hooks/useAuth';

export const MyComponent: React.FC = () => {
    const { user } = useAuth();

    // Available properties:
    // - user.id: string
    // - user.email: string
    // - user.username: string
    // - user.roles: string[]

    return (
        <div>
            <p>Logged in as: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Roles: {user.roles.join(', ')}</p>
        </div>
    );
};
```

**NEVER make direct API calls for auth** - always use `useAuth` hook.

---

## Forms with React Hook Form

### Basic Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

// Zod schema for validation
const formSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    age: z.number().min(18, 'Must be 18 or older'),
});

type FormData = z.infer<typeof formSchema>;

export const MyForm: React.FC = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            age: 18,
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await api.submitForm(data);
            toast.success('Form submitted successfully');
        } catch (error) {
            toast.error('Failed to submit form');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
```

---

## Dialog Component Pattern

### Standard Dialog Structure

From BEST_PRACTICES.md - All dialogs should have:
- Icon in title
- Close button (X)
- Action buttons at bottom

```typescript
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface MyDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const MyDialog: React.FC<MyDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary" />
                        Dialog Title
                    </span>
                </DialogTitle>
            </DialogHeader>

            <DialogContent>
                {/* Content here */}
            </DialogContent>

            <DialogFooter>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={onConfirm}>
                    Confirm
                </Button>
            </DialogFooter>
        </Dialog>
    );
};
```

---

## DataGrid Wrapper Pattern

**Note:** This project uses MUI X DataGrid for complex data tables. For simple lists, prefer using shadcn/ui Table component with Tailwind CSS.

### Wrapper Component Contract

From BEST_PRACTICES.md - DataGrid wrappers should accept:

**Required Props:**
- `rows`: Data array
- `columns`: Column definitions
- Loading/error states

**Optional Props:**
- Toolbar components
- Custom actions
- Initial state

```typescript
import { DataGridPro } from '@mui/x-data-grid-pro';
import type { GridColDef } from '@mui/x-data-grid-pro';

interface DataGridWrapperProps {
    rows: any[];
    columns: GridColDef[];
    loading?: boolean;
    toolbar?: React.ReactNode;
    onRowClick?: (row: any) => void;
}

export const DataGridWrapper: React.FC<DataGridWrapperProps> = ({
    rows,
    columns,
    loading = false,
    toolbar,
    onRowClick,
}) => {
    return (
        <DataGridPro
            rows={rows}
            columns={columns}
            loading={loading}
            slots={{ toolbar: toolbar ? () => toolbar : undefined }}
            onRowClick={(params) => onRowClick?.(params.row)}
            // Standard configuration
            pagination
            pageSizeOptions={[25, 50, 100]}
            initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
            }}
        />
    );
};
```

### For Simple Lists - Use shadcn/ui Table

```typescript
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SimpleTableProps {
    data: any[];
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ data }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
```

---

## Mutation Patterns

### Update with Cache Invalidation

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUpdateEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            api.updateEntity(id, data),

        onSuccess: (result, variables) => {
            // Invalidate affected queries
            queryClient.invalidateQueries({ queryKey: ['entity', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['entities'] });

            toast.success('Entity updated');
        },

        onError: () => {
            toast.error('Failed to update entity');
        },
    });
};

// Usage
const updateEntity = useUpdateEntity();

const handleSave = () => {
    updateEntity.mutate({ id: 123, data: { name: 'New Name' } });
};
```

---

## State Management Patterns

### TanStack Query for Server State (PRIMARY)

Use TanStack Query for **all server data**:
- Fetching: useSuspenseQuery
- Mutations: useMutation
- Caching: Automatic
- Synchronization: Built-in

```typescript
// ✅ CORRECT - TanStack Query for server data
const { data: users } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: () => userApi.getUsers(),
});
```

### useState for UI State

Use `useState` for **local UI state only**:
- Form inputs (uncontrolled)
- Modal open/closed
- Selected tab
- Temporary UI flags

```typescript
// ✅ CORRECT - useState for UI state
const [modalOpen, setModalOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState(0);
```

### Zustand for Global Client State (Minimal)

Use Zustand only for **global client state**:
- Theme preference
- Sidebar collapsed state
- User preferences (not from server)

```typescript
import { create } from 'zustand';

interface AppState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const useAppState = create<AppState>((set) => ({
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
```

**Avoid prop drilling** - use context or Zustand instead.

---

## Summary

**Common Patterns:**
- ✅ useAuth hook for current user (id, email, roles, username)
- ✅ React Hook Form + Zod for forms
- ✅ Dialog with icon + close button
- ✅ DataGrid wrapper contracts
- ✅ Mutations with cache invalidation
- ✅ TanStack Query for server state
- ✅ useState for UI state
- ✅ Zustand for global client state (minimal)

**See Also:**
- [data-fetching.md](data-fetching.md) - TanStack Query patterns
- [component-patterns.md](component-patterns.md) - Component structure
- [loading-and-error-states.md](loading-and-error-states.md) - Error handling