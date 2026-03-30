import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "tab1",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          Content for Tab 1. This is the first tab's content area.
        </TabsContent>
        <TabsContent value="tab2">
          Content for Tab 2. This is the second tab's content area.
        </TabsContent>
        <TabsContent value="tab3">
          Content for Tab 3. This is the third tab's content area.
        </TabsContent>
      </>
    ),
  },
};

export const LineVariant: Story = {
  args: {
    defaultValue: "overview",
    children: (
      <>
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          Overview content showing the main dashboard view.
        </TabsContent>
        <TabsContent value="analytics">
          Analytics content with charts and metrics.
        </TabsContent>
        <TabsContent value="reports">
          Reports content for downloadable data.
        </TabsContent>
      </>
    ),
  },
};

export const VerticalOrientation: Story = {
  args: {
    defaultValue: "account",
    orientation: "vertical",
    children: (
      <>
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Account settings content. Manage your profile information.
        </TabsContent>
        <TabsContent value="password">
          Password settings content. Change your password here.
        </TabsContent>
        <TabsContent value="notifications">
          Notification settings content. Configure your alerts.
        </TabsContent>
      </>
    ),
  },
};

export const DisabledTab: Story = {
  args: {
    defaultValue: "active",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
          <TabsTrigger value="another">Another</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          Active tab content. The disabled tab cannot be selected.
        </TabsContent>
        <TabsContent value="disabled">
          This content is not accessible when disabled.
        </TabsContent>
        <TabsContent value="another">
          Another tab's content area.
        </TabsContent>
      </>
    ),
  },
};

export const SettingsTabs: Story = {
  args: {
    defaultValue: "general",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <div className="grid gap-4">
            <h3 className="text-sm font-medium">General Settings</h3>
            <p className="text-xs text-muted-foreground">
              Manage your general account settings and preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="privacy">
          <div className="grid gap-4">
            <h3 className="text-sm font-medium">Privacy Settings</h3>
            <p className="text-xs text-muted-foreground">
              Control your privacy and data sharing preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="billing">
          <div className="grid gap-4">
            <h3 className="text-sm font-medium">Billing Settings</h3>
            <p className="text-xs text-muted-foreground">
              Manage your subscription and payment methods.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="team">
          <div className="grid gap-4">
            <h3 className="text-sm font-medium">Team Settings</h3>
            <p className="text-xs text-muted-foreground">
              Manage team members and collaboration settings.
            </p>
          </div>
        </TabsContent>
      </>
    ),
  },
};
