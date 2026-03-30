import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@repo/ui/components/label";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email address</Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="rounded-md border border-input bg-input/20 px-2 py-1.5 text-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="required-field">
        Required Field <span className="text-destructive">*</span>
      </Label>
      <input
        id="required-field"
        placeholder="This field is required"
        className="rounded-md border border-input bg-input/20 px-2 py-1.5 text-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
      />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <input
        id="terms"
        type="checkbox"
        className="size-4 rounded border border-input"
      />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <input
        id="disabled-checkbox"
        type="checkbox"
        disabled
        className="size-4 rounded border border-input"
      />
      <Label htmlFor="disabled-checkbox">Disabled option</Label>
    </div>
  ),
};

export const FormLabels: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <input
          id="username"
          placeholder="Enter username"
          className="rounded-md border border-input bg-input/20 px-2 py-1.5 text-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          className="rounded-md border border-input bg-input/20 px-2 py-1.5 text-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        />
      </div>
      <div className="flex items-center gap-2">
        <input id="remember" type="checkbox" className="size-4 rounded border border-input" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
    </div>
  ),
};
