import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/components/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@repo/ui/components/popover";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger render={<Button variant="outline">Open Popover</Button>} />
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Popover Title</PopoverTitle>
            <PopoverDescription>
              This is the popover description text.
            </PopoverDescription>
          </PopoverHeader>
          <div className="grid gap-2">
            <p className="text-xs text-muted-foreground">Popover content here.</p>
          </div>
        </PopoverContent>
      </>
    ),
  },
};

export const Simple: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger render={<Button>Click me</Button>} />
        <PopoverContent className="w-40">
          <p className="text-xs">Simple popover content without header.</p>
        </PopoverContent>
      </>
    ),
  },
};

export const WithForm: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger render={<Button variant="outline">Settings</Button>} />
        <PopoverContent className="w-64">
          <PopoverHeader>
            <PopoverTitle>Quick Settings</PopoverTitle>
            <PopoverDescription>
              Adjust your preferences here.
            </PopoverDescription>
          </PopoverHeader>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs">Notifications</span>
              <input type="checkbox" className="size-4 rounded border" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Auto-save</span>
              <input type="checkbox" defaultChecked className="size-4 rounded border" />
            </div>
            <Button size="sm" className="mt-2">
              Apply Changes
            </Button>
          </div>
        </PopoverContent>
      </>
    ),
  },
};

export const PositionedPopover: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger render={<Button variant="secondary">Top Position</Button>} />
        <PopoverContent side="top" align="start">
          <PopoverTitle>Popover on Top</PopoverTitle>
          <p className="text-xs text-muted-foreground">
            This popover appears above the trigger.
          </p>
        </PopoverContent>
      </>
    ),
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger render={<Button variant="outline">Share</Button>} />
        <PopoverContent className="w-48">
          <PopoverHeader>
            <PopoverTitle>Share Options</PopoverTitle>
          </PopoverHeader>
          <div className="grid gap-1">
            <Button variant="ghost" size="sm">Copy Link</Button>
            <Button variant="ghost" size="sm">Email</Button>
            <Button variant="ghost" size="sm">Social Media</Button>
          </div>
        </PopoverContent>
      </>
    ),
  },
};
