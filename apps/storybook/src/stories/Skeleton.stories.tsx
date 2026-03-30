import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@repo/ui/components/skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-40 h-4",
  },
};

export const Circle: Story = {
  args: {
    className: "size-12 rounded-full",
  },
};

export const Card: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-32 h-4" />
      </div>
    </div>
  ),
};

export const AvatarSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="w-20 h-3" />
        <Skeleton className="w-28 h-3" />
      </div>
    </div>
  ),
};

export const TextSkeleton: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-4" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="rounded-xl border p-4 space-y-4 w-full max-w-sm">
      <Skeleton className="w-full h-32 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-2/3 h-3" />
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="space-y-3 w-full max-w-md">
      <div className="flex gap-4">
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/4 h-4" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/4 h-4" />
        </div>
      ))}
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="grid gap-4 w-full max-w-sm">
      <div className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-3" />
        </div>
      </div>
      <Skeleton className="w-full h-24 rounded-lg" />
      <div className="grid gap-2">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-4/5 h-3" />
        <Skeleton className="w-3/5 h-3" />
      </div>
    </div>
  ),
};
