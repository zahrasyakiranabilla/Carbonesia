import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@repo/ui/components/select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "option1",
    children: (
      <>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </>
    ),
  },
};

export const WithPlaceholder: Story = {
  args: {
    children: (
      <>
        <SelectTrigger>
          <SelectValue placeholder="Choose a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectContent>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    defaultValue: "sm-option",
    children: (
      <>
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm-option">Small Option 1</SelectItem>
          <SelectItem value="sm-option2">Small Option 2</SelectItem>
        </SelectContent>
      </>
    ),
  },
};

export const WithGroups: Story = {
  args: {
    defaultValue: "react",
    children: (
      <>
        <SelectTrigger>
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frontend</SelectLabel>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Backend</SelectLabel>
            <SelectItem value="node">Node.js</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectGroup>
        </SelectContent>
      </>
    ),
  },
};

export const WithSeparator: Story = {
  args: {
    defaultValue: "profile",
    children: (
      <>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="profile">Profile</SelectItem>
          <SelectItem value="settings">Settings</SelectItem>
          <SelectSeparator />
          <SelectItem value="logout">Logout</SelectItem>
        </SelectContent>
      </>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Select defaultValue="sm">
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm">Small</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="default">
        <SelectTrigger size="default">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
