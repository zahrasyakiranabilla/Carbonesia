import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, TooltipProvider } from "@repo/ui/components/tooltip";
import { Button } from "@repo/ui/components/button";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button variant="outline">Hover me</Button>,
  },
};

export const Top: Story = {
  args: {
    content: "Tooltip on top",
    side: "top",
    children: <Button>Top Tooltip</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Tooltip on bottom",
    side: "bottom",
    children: <Button variant="secondary">Bottom Tooltip</Button>,
  },
};

export const Left: Story = {
  args: {
    content: "Tooltip on left",
    side: "left",
    children: <Button variant="outline">Left Tooltip</Button>,
  },
};

export const Right: Story = {
  args: {
    content: "Tooltip on right",
    side: "right",
    children: <Button variant="ghost">Right Tooltip</Button>,
  },
};

export const AlignedStart: Story = {
  args: {
    content: "Start aligned tooltip",
    side: "bottom",
    align: "start",
    children: <Button>Start Aligned</Button>,
  },
};

export const AlignedEnd: Story = {
  args: {
    content: "End aligned tooltip",
    side: "bottom",
    align: "end",
    children: <Button>End Aligned</Button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div className="grid gap-1">
        <p className="text-xs font-medium">Rich Tooltip</p>
        <p className="text-xs">Tooltip with additional description</p>
      </div>
    ),
    children: <Button variant="outline">Rich Tooltip</Button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4 justify-center">
        <Tooltip content="Top tooltip" side="top">
          <Button size="icon">T</Button>
        </Tooltip>
        <Tooltip content="Bottom tooltip" side="bottom">
          <Button size="icon">B</Button>
        </Tooltip>
        <Tooltip content="Left tooltip" side="left">
          <Button size="icon">L</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <Button size="icon">R</Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const WithDelay: Story = {
  args: {
    content: "Tooltip with custom delay",
    side: "top",
    children: <Button>Delayed Tooltip</Button>,
  },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={500}>
        <Story />
      </TooltipProvider>
    ),
  ],
};
