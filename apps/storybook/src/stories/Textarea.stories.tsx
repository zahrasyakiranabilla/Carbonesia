import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@repo/ui/components/textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "This is some pre-filled text content in the textarea.",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Enter your description here...",
    className: "min-h-[100px]",
  },
};

export const LargeTextarea: Story = {
  args: {
    placeholder: "Large textarea for longer content...",
    className: "min-h-[200px]",
  },
};

export const SmallTextarea: Story = {
  args: {
    placeholder: "Small textarea",
    className: "min-h-[60px]",
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="grid gap-4 w-full max-w-sm">
      <div className="grid gap-2">
        <label className="text-xs font-medium">Subject</label>
        <input
          type="text"
          placeholder="Email subject"
          className="rounded-md border border-input bg-input/20 px-2 py-1.5 text-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-xs font-medium">Message</label>
        <Textarea
          placeholder="Write your message here..."
          className="min-h-[120px]"
        />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid gap-4 w-full max-w-sm">
      <Textarea placeholder="Default textarea" />
      <Textarea defaultValue="With value" />
      <Textarea placeholder="Disabled textarea" disabled />
      <Textarea placeholder="Large textarea" className="min-h-[150px]" />
    </div>
  ),
};
