import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@repo/ui/components/separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-8",
  },
};

export const HorizontalWithContent: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section 1</h4>
        <p className="text-xs text-muted-foreground">
          Content for the first section.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section 2</h4>
        <p className="text-xs text-muted-foreground">
          Content for the second section.
        </p>
      </div>
    </div>
  ),
};

export const VerticalWithContent: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-xs">Left</span>
      <Separator orientation="vertical" />
      <span className="text-xs">Right</span>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="rounded-xl border p-4 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">Total</span>
        <span className="text-xs">$99.00</span>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Subtotal</span>
        <span className="text-xs text-muted-foreground">$89.00</span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-muted-foreground">Tax</span>
        <span className="text-xs text-muted-foreground">$10.00</span>
      </div>
    </div>
  ),
};

export const MultipleSeparators: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <p className="text-xs">First paragraph of content.</p>
      <Separator />
      <p className="text-xs">Second paragraph of content.</p>
      <Separator />
      <p className="text-xs">Third paragraph of content.</p>
    </div>
  ),
};
