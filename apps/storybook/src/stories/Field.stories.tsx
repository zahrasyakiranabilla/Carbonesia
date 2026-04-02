import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldContent,
  FieldSeparator,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Username</FieldLabel>
      <Input type="text" placeholder="Enter username" />
    </Field>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="Enter email" />
    </Field>
  ),
};

export const Responsive: Story = {
  args: {
    orientation: "responsive",
  },
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Phone Number</FieldLabel>
      <Input type="tel" placeholder="Enter phone number" />
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field>
      <FieldLabel>Password</FieldLabel>
      <FieldContent>
        <Input type="password" placeholder="Enter password" />
        <FieldDescription>
          Must be at least 8 characters long
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldContent>
        <Input type="email" placeholder="Enter email" aria-invalid />
        <FieldError>Invalid email address format</FieldError>
      </FieldContent>
    </Field>
  ),
};

export const WithMultipleErrors: Story = {
  render: () => (
    <Field>
      <FieldLabel>Password</FieldLabel>
      <FieldContent>
        <Input type="password" placeholder="Enter password" aria-invalid />
        <FieldError
          errors={[
            { message: "Password must be at least 8 characters" },
            { message: "Password must contain a number" },
            { message: "Password must contain a special character" },
          ]}
        />
      </FieldContent>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field>
      <FieldLabel>Read Only Field</FieldLabel>
      <Input type="text" defaultValue="Cannot edit this" disabled />
    </Field>
  ),
};

export const FieldGroup: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel>First Name</FieldLabel>
        <Input type="text" placeholder="Enter first name" />
      </Field>
      <Field>
        <FieldLabel>Last Name</FieldLabel>
        <Input type="text" placeholder="Enter last name" />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="Enter email" />
      </Field>
    </FieldGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel>Username</FieldLabel>
        <Input type="text" placeholder="Enter username" />
      </Field>
      <FieldSeparator>Account Settings</FieldSeparator>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="Enter email" />
      </Field>
    </FieldGroup>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <Input type="text" placeholder="Enter first name" />
        </Field>
        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <Input type="text" placeholder="Enter last name" />
        </Field>
      </FieldGroup>
      <FieldSeparator>Contact Information</FieldSeparator>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="Enter email" />
      </Field>
      <Field>
        <FieldLabel>Phone</FieldLabel>
        <Input type="tel" placeholder="Enter phone number" />
        <FieldDescription>We'll only use this for account verification</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <FieldContent>
          <Input type="password" placeholder="Enter password" />
          <FieldDescription>
            Must be at least 8 characters with a number and special character
          </FieldDescription>
          <FieldError />
        </FieldContent>
      </Field>
    </div>
  ),
};

export const AllOrientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-4">Vertical (default)</h4>
        <Field orientation="vertical">
          <FieldLabel>Username</FieldLabel>
          <Input type="text" placeholder="Enter username" />
        </Field>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Horizontal</h4>
        <Field orientation="horizontal">
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="Enter email" />
        </Field>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Responsive</h4>
        <Field orientation="responsive">
          <FieldLabel>Phone</FieldLabel>
          <Input type="tel" placeholder="Enter phone" />
        </Field>
      </div>
    </div>
  ),
};
