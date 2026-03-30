import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "@repo/ui/components/avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "default",
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    ),
  },
};

export const FallbackOnly: Story = {
  args: {
    size: "default",
    children: <AvatarFallback>JD</AvatarFallback>,
  },
};

export const WithBadge: Story = {
  args: {
    size: "default",
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        <AvatarBadge />
      </>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>DF</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const AvatarGroupExample: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar size="default">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};

export const AvatarGroupWithBadges: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar size="default">
        <AvatarFallback>A1</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>A2</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};
