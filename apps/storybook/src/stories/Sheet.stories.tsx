import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/components/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@repo/ui/components/sheet";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <SheetTrigger render={<Button variant="outline">Open Sheet</Button>} />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <input id="name" defaultValue="Pedro Duarte" className="rounded-md border px-2 py-1" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="username">Username</label>
              <input id="username" defaultValue="@peduarte" className="rounded-md border px-2 py-1" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose render={<Button variant="outline">Cancel</Button>} />
            <Button>Save changes</Button>
          </SheetFooter>
        </SheetContent>
      </>
    ),
  },
};

export const RightSide: Story = {
  args: {
    children: (
      <>
        <SheetTrigger render={<Button>Right Sheet</Button>} />
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Panel</SheetTitle>
            <SheetDescription>
              This sheet slides in from the right side.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-xs text-muted-foreground">
              Right side sheet content goes here.
            </p>
          </div>
        </SheetContent>
      </>
    ),
  },
};

export const LeftSide: Story = {
  args: {
    children: (
      <>
        <SheetTrigger render={<Button variant="secondary">Left Sheet</Button>} />
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Panel</SheetTitle>
            <SheetDescription>
              This sheet slides in from the left side.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-xs text-muted-foreground">
              Left side sheet content goes here.
            </p>
          </div>
        </SheetContent>
      </>
    ),
  },
};

export const TopSide: Story = {
  args: {
    children: (
      <>
        <SheetTrigger render={<Button variant="outline">Top Sheet</Button>} />
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Panel</SheetTitle>
            <SheetDescription>
              This sheet slides in from the top.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-xs text-muted-foreground">
              Top side sheet content goes here.
            </p>
          </div>
          <SheetFooter>
            <SheetClose render={<Button size="sm">Close</Button>} />
          </SheetFooter>
        </SheetContent>
      </>
    ),
  },
};

export const BottomSide: Story = {
  args: {
    children: (
      <>
        <SheetTrigger render={<Button variant="ghost">Bottom Sheet</Button>} />
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Panel</SheetTitle>
            <SheetDescription>
              This sheet slides in from the bottom.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-xs text-muted-foreground">
              Bottom side sheet content goes here.
            </p>
          </div>
          <SheetFooter>
            <Button>Confirm</Button>
            <SheetClose render={<Button variant="outline">Cancel</Button>} />
          </SheetFooter>
        </SheetContent>
      </>
    ),
  },
};

export const WithoutCloseButton: Story = {
  args: {
    children: (
      <>
        <SheetTrigger render={<Button>No Close Button</Button>} />
        <SheetContent showCloseButton={false} side="right">
          <SheetHeader>
            <SheetTitle>Custom Sheet</SheetTitle>
            <SheetDescription>
              This sheet has no close button in the header.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-auto">
            <SheetClose render={<Button>Close</Button>} />
          </SheetFooter>
        </SheetContent>
      </>
    ),
  },
};
