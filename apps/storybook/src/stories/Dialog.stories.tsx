import { Button } from "@repo/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <DialogTrigger
          render={<Button variant="outline">Open Dialog</Button>}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="rounded-md border px-2 py-1"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="rounded-md border px-2 py-1"
              />
            </div>
          </div>
          <DialogFooter showCloseButton>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </>
    ),
  },
}

export const SimpleDialog: Story = {
  args: {
    children: (
      <>
        <DialogTrigger render={<Button>Show Dialog</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button variant="destructive">Delete account</Button>
          </DialogFooter>
        </DialogContent>
      </>
    ),
  },
}

export const WithoutCloseButton: Story = {
  args: {
    children: (
      <>
        <DialogTrigger render={<Button variant="secondary">Open</Button>} />
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Custom Dialog</DialogTitle>
            <DialogDescription>
              This dialog has no close button in the header.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button variant="outline">Cancel</Button>
            <Button>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </>
    ),
  },
}

export const FormDialog: Story = {
  args: {
    children: (
      <>
        <DialogTrigger
          render={<Button variant="outline">Create Project</Button>}
        />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Add a new project to your workspace. Click create when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="project-name">Project Name</label>
              <input
                id="project-name"
                placeholder="Enter project name"
                className="rounded-md border px-2 py-1"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="project-desc">Description</label>
              <textarea
                id="project-desc"
                placeholder="Enter description"
                className="rounded-md border px-2 py-1"
              />
            </div>
          </div>
          <DialogFooter showCloseButton>
            <Button>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </>
    ),
  },
}
