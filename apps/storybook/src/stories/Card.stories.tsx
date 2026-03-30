import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@repo/ui/components/card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content area.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithAction: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Action</CardTitle>
          <CardDescription>Click the action button</CardDescription>
          <CardAction>
            <button className="text-xs text-primary hover:underline">Action</button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Card content with an action button in the header.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
          <CardDescription>This card has a footer section</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here.</p>
        </CardContent>
        <CardFooter>
          <button className="text-xs text-muted-foreground">Footer action</button>
        </CardFooter>
      </>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>Compact version</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Smaller card for tight spaces.</p>
        </CardContent>
      </>
    ),
  },
};

export const FullExample: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Monthly overview</CardDescription>
          <CardAction>
            <span className="text-xs font-medium text-primary">+12%</span>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">Total visitors this month</p>
        </CardContent>
        <CardFooter className="border-t">
          <span className="text-xs text-muted-foreground">Updated 5 minutes ago</span>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="text-xs">• User logged in</li>
            <li className="text-xs">• Settings updated</li>
            <li className="text-xs">• Profile changed</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  ),
};